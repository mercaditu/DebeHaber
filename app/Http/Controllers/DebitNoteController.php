<?php

namespace App\Http\Controllers;

use App\Taxpayer;
use App\Cycle;
use App\Transaction;
use App\AccountMovement;
use App\Http\Resources\GeneralResource;
use Illuminate\Http\Request;
use DB;

class DebitNoteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Taxpayer $taxPayer, Cycle $cycle)
    {
        return GeneralResource::collection(
            Transaction::MyDebitNotes()
                ->with('details')
                ->whereBetween('date', [$cycle->start_date, $cycle->end_date])
                ->orderBy('date', 'desc')
                ->paginate(50)
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Taxpayer $taxPayer, Cycle $cycle)
    {
        $request->type = 1;
        $request->sub_type = 2; (new TransactionController())->store($request, $taxPayer);
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
            Transaction::MyDebitNotes()->with('supplier:name,taxid,id')
                ->where('id', $transactionId)
                ->with('details')
                ->first()
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function destroy(Taxpayer $taxPayer, Cycle $cycle, $transactionId)
    {
        try {
            //TODO: Run Tests to make sure it deletes all journals related to transaction
            AccountMovement::where('transaction_id', $transactionId)->delete();
            //JournalTransaction::where('transaction_id',$transactionId)->delete();
            Transaction::where('id', $transactionId)->delete();

            return response()->json('Ok', 200);
        } catch (\Exception $e) {
            return response()->json($e, 500);
        }
    }

    public function generate_Journals($startDate, $endDate, $taxPayer, $cycle)
    {
        \DB::connection()->disableQueryLog();

      $journal = \App\Journal::where('cycle_id' , $cycle->id)
            ->where('date' , $endDate->format('Y-m-d'))
            ->where('is_automatic' , 1)
            ->where('module_id' , 2)
            ->with('details')->first()?? new \App\Journal();   

        //Clean up details by placing 0. this will allow cleaner updates and know what to delete.
        foreach ($journal->details()->get() as $detail) {
            $detail->credit = 0;
            $detail->debit = 0;
            $detail->save();
        }

        $comment = __('accounting.DebitNoteComment', ['startDate' => $startDate->toDateString(), 'endDate' => $endDate->toDateString()]);
        $journal->cycle_id = $cycle->id; //TODO: Change this for specific cycle that is in range with transactions
        $journal->date = $endDate;
        $journal->comment = $comment;
        $journal->is_automatic = 1;
        $journal->module_id = 2;
        $journal->save();

        $ChartController = new ChartController();

        //1st Query: Sales Transactions done in Credit. Must affect customer credit account.
        $listOfDebitNotes = Transaction::MyDebitNotesForJournals($startDate, $endDate, $taxPayer->id)
            ->join('transaction_details', 'transactions.id', '=', 'transaction_details.transaction_id')
            ->groupBy('rate', 'partner_taxid')
            ->select(
                DB::raw('max(rate) as rate'),
                DB::raw('max(partner_taxid) as partner_taxid'),
                DB::raw('max(partner_taxid) as partner_name'),
                DB::raw('sum(transaction_details.value) as total')
            )
            ->get();

        //run code for credit purchase (insert detail into journal)
        foreach ($listOfDebitNotes as $row) {
            $supplierChartID = $ChartController->createIfNotExists_AccountsPayable($taxPayer, $cycle, $row->partner_taxid, $row->partner_name)->id;

            $detail = $journal->details()->firstOrNew(['chart_id' => $supplierChartID]);
            $detail->credit += $row->total * $row->rate;
            $detail->chart_id = $supplierChartID;
            $journal->details()->save($detail);
        }

        //one detail query, to avoid being heavy for db. Group by fx rate, vat, and item type.
        $detailAccounts = Transaction::MyDebitNotesForJournals($startDate, $endDate, $taxPayer->id)
            ->join('transaction_details', 'transactions.id', '=', 'transaction_details.transaction_id')
            ->join('charts', 'charts.id', '=', 'transaction_details.chart_vat_id')
            ->groupBy('rate', 'transaction_details.chart_id', 'transaction_details.chart_vat_id')
            ->select(
                DB::raw('max(rate) as rate'),
                DB::raw('max(charts.coefficient) as coefficient'),
                DB::raw('max(transaction_details.chart_vat_id) as chart_vat_id'),
                DB::raw('max(transaction_details.chart_id) as chart_id'),
                DB::raw('sum(transaction_details.value) as total')
            )
            ->get();

        foreach ($detailAccounts as $row) {
            $coefficient = $row->coefficient ?? 0;
            $vatValue = $row->total - ($row->total / (1 + $coefficient));

            $detail = $journal->details()->firstOrNew(['chart_id' =>  $row->chart_id]);
            $detail->debit += ($row->total - $vatValue) * $row->rate;
            $detail->chart_id = $row->chart_id;
            $journal->details()->save($detail);

            if ($coefficient > 0) {
                $vatDetail = $journal->details()->firstOrNew(['chart_id' =>  $row->chart_vat_id]);
                $vatDetail->debit += $vatValue * $row->rate;
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

        Transaction::whereIn('id', $listOfDebitNotes->pluck('id'))
            ->update(['journal_id' => $journal->id]);
    }
}
