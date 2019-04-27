<?php

namespace App\Http\Controllers;

use App\AccountMovement;
use App\Taxpayer;
use App\Cycle;
use App\Transaction;
use App\Http\Resources\GeneralResource;
use Illuminate\Http\Request;
use DB;

class PurchaseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Taxpayer $taxPayer, Cycle $cycle)
    {
        //TODO improve query using sum of deatils instead of inner join.
        return GeneralResource::collection(
            Transaction::MyPurchases()
                ->with([
                    'details:id,cost,value,transaction_id,chart_id,chart_vat_id',
                    'details.chart:id,name,code,type,sub_type',
                    'details.vat:id,name'
                ])
                ->whereBetween('date', [$cycle->start_date, $cycle->end_date])
                ->orderBy('date', 'desc')
                ->paginate(50)
        );
    }

    public function getLastPurchase($partner_taxid)
    {
        $transaction = Transaction::MyPurchases()
            ->where('partner_taxid', $partner_taxid)
            ->with('details')
            ->last();

        return response()->json($transaction, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Taxpayer $taxPayer, $cycle)
    {
        $request->type = 1;
        $request->sub_type = 1;
        (new TransactionController())->store($request, $taxPayer);
        return response()->json('Ok', 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function show(Taxpayer $taxPayer, Cycle $cycle, $transactionId)
    {
        return new GeneralResource(
            Transaction::MyPurchases()
                ->where('id', $transactionId)
                ->with([
                    'details:id,cost,value,transaction_id,chart_id,chart_vat_id',
                    'details.chart:id,name,code,type,sub_type',
                    'details.vat:id,name'
                ])
                ->first()
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function destroy(Taxpayer $taxPayer, Cycle $cycle, $transactionID)
    {
        try {
            //TODO: Run Tests to make sure it deletes all journals related to transaction
            AccountMovement::where('transaction_id', $transactionID)->delete();
            //JournalTransaction::where('transaction_id',$transactionID)->delete();
            Transaction::where('id', $transactionID)->delete();

            return response()->json('ok', 200);
        } catch (\Exception $e) {
            return response()->json($e, 500);
        }
    }

    /**
     * Remove the specified resource from storage (Force Delete).
     *
     * @param  \App\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function destroyForce(Taxpayer $taxPayer, Cycle $cycle, $transactionId)
    {
        try {
            //TODO: Run Tests to make sure it deletes all journals related to transaction
            AccountMovement::where('transaction_id', $transactionId)->forceDelete();
            //JournalTransaction::where('transaction_id',$transactionId)->delete();
            Transaction::where('id', $transactionId)->forceDelete();

            return response()->json('Ok', 200);
        } catch (\Exception $e) {
            return response()->json($e, 500);
        }
    }

    /*
    Purchase code to generate journals.
    */
    public function generate_Journals($startDate, $endDate, $taxPayer, $cycle)
    {
        \DB::connection()->disableQueryLog();

        $journal = \App\Journal::where('cycle_id', $cycle->id)
            ->where('date', $endDate->format('Y-m-d'))
            ->where('is_automatic', 1)
            ->where('module_id', 1)
            ->with('details')->first() ?? new \App\Journal();

        //Clean up details by placing 0. this will allow cleaner updates and know what to delete.
        foreach ($journal->details()->get() as $detail) {
            $detail->credit = 0;
            $detail->debit = 0;
            $detail->save();
        }
        $purchaseQuery = Transaction::MyPurchasesForJournals($startDate, $endDate, $taxPayer->id)
            ->join('transaction_details', 'transactions.id', '=', 'transaction_details.transaction_id')
            ->groupBy('rate');

        $comment = __('accounting.PurchaseBookComment', ['startDate' => $startDate->toDateString(), 'endDate' => $endDate->toDateString()]);
        $journal->cycle_id = $cycle->id; //TODO: Change this for specific cycle that is in range with transactions
        $journal->date = $endDate;
        $journal->comment = $comment;
        $journal->is_automatic = 1;
        $journal->module_id = 1;
        $journal->save();

        $chartController = new ChartController();

        //Sales Transactionsd done in cash. Must affect direct cash account.
        $cashPurchases = Transaction::MyPurchasesForJournals($startDate, $endDate, $taxPayer->id)
            ->join('transaction_details', 'transactions.id', '=', 'transaction_details.transaction_id')
            ->groupBy('rate')
            ->where('payment_condition', '=', 0)
            ->select(
                DB::raw('max(rate) as rate'),
                DB::raw('max(chart_account_id) as chart_account_id'),
                DB::raw('sum(transaction_details.value) as total')
            )
            ->get();

        //run code for cash purchase (insert detail into journal)
        foreach ($cashPurchases as $row) {
            // search if chart exists, or else create it. we don't want an error causing all transactions not to be accounted.
            $accountChartID = $row->chart_account_id ?? $chartController->createIfNotExists_CashAccounts($taxPayer, $cycle, $row->chart_account_id)->id;

            $detail = $journal->details()->firstOrNew(['chart_id' => $accountChartID]);
            $detail->debit += $row->total * $row->rate;
            $detail->chart_id = $accountChartID;
            $journal->details()->save($detail);
            //$journal->load('details');
        }

        //2nd Query: Sales Transactions done in Credit. Must affect customer credit account.
        $creditPurchases = Transaction::MyPurchasesForJournals($startDate, $endDate, $taxPayer->id)
            ->join('transaction_details', 'transactions.id', '=', 'transaction_details.transaction_id')
            ->groupBy('rate')
            ->groupBy('partner_taxid')
            ->where('payment_condition', '>', 0)
            ->select(
                DB::raw('max(rate) as rate'),
                DB::raw('max(partner_taxid) as partner_taxid'),
                DB::raw('max(partner_name) as partner_name'),
                DB::raw('sum(transaction_details.value) as total')
            )
            ->get();

        //run code for credit purchase (insert detail into journal)
        foreach ($creditPurchases as $row) {
            $supplierChartID = $chartController->createIfNotExists_AccountsPayable($taxPayer, $cycle, $row->partner_taxid, $row->partner_name)->id;

            $detail = $journal->details()->firstOrNew(['chart_id' => $supplierChartID]);
            $detail->debit += $row->total * $row->rate;
            $detail->chart_id = $supplierChartID;
            $journal->details()->save($detail);
        }

        //one detail query, to avoid being heavy for db. Group by fx rate, vat, and item type.
        $detailAccounts = Transaction::MyPurchasesForJournals($startDate, $endDate, $taxPayer->id)
            ->join('transaction_details', 'transactions.id', '=', 'transaction_details.transaction_id')
            ->leftJoin('charts', 'charts.id', '=', 'transaction_details.chart_vat_id')
            ->groupBy('rate', 'transaction_details.chart_id', 'transaction_details.chart_vat_id')
            ->select(
                DB::raw('max(rate) as rate'),
                DB::raw('max(charts.coefficient) as coefficient'),
                DB::raw('max(transaction_details.chart_vat_id) as chart_vat_id'),
                DB::raw('max(transaction_details.chart_id) as chart_id'),
                DB::raw('sum(transaction_details.value) as total')
            )
            ->get();

        //run code for vat
        //run code for credit sales (insert detail into journal)
        foreach ($detailAccounts as $row) {
            $coefficient = $row->coefficient ?? 0;
            $vatValue = $row->total - ($row->total / (1 + $coefficient));

            $detail = $journal->details()->firstOrNew(['chart_id' =>  $row->chart_id]);
            $detail->credit += ($row->total - $vatValue) * $row->rate;
            $detail->chart_id = $row->chart_id;
            $journal->details()->save($detail);

            if ($coefficient > 0) {
                $vatDetail = $journal->details()->firstOrNew(['chart_id' =>  $row->chart_vat_id]);
                $vatDetail->credit += $vatValue * $row->rate;
                $vatDetail->chart_id = $row->chart_vat_id;
                $journal->details()->save($vatDetail);
            }
        }

        //delete where credit and debit == 0. This will clean up old charts that were used, but not in new.
        $journal->details()
            ->where('debit', 0)
            ->where('credit', 0)
            ->delete();

        $journal->save();

        $purchaseQuery->update(['journal_id' => $journal->id]);
    }
}
