<?php

namespace App\Http\Controllers;

use App\AccountMovement;
use App\Taxpayer;
use App\Cycle;
use Illuminate\Http\Request;
use App\Http\Resources\GeneralResource;
use Spatie\QueryBuilder\QueryBuilder;
use Carbon\Carbon;

class AccountMovementController extends Controller
{
    public function index(Taxpayer $taxPayer, Cycle $cycle)
    {
        $query = AccountMovement::orderBy('date', 'desc')
                 ->with('chart:name,code')
                 ->with('transaction:id,number,comment');

        return GeneralResource::collection(
            QueryBuilder::for($query)
                ->allowedIncludes('chart')
                ->allowedFilters('chart.name')
                ->paginate(50)
        );
        // return GeneralResource::collection(
        //     AccountMovement::orderBy('date', 'desc')
        //         ->with('chart:name,code')
        //         ->with('transaction:id,number,comment')
        //         ->paginate(50)
        // );
    }

    public function store(Request $request, Taxpayer $taxPayer, Cycle $cycle)
    {
        
        if ($request->type != 2) {
            $accountMovement = AccountMovement::firstOrNew(['id' => $request->id]);
            $accountMovement->taxpayer_id = $taxPayer->id;
            $accountMovement->chart_id = $request->chart_id;
            $accountMovement->date =  Carbon::now();
            $accountMovement->debit = $request->debit ?? 0;
            $accountMovement->credit = $request->credit ?? 0;
            $accountMovement->currency = $request->currency;
            $accountMovement->rate = $request->rate ?? 1;
            $accountMovement->comment = $request->comment;
            $accountMovement->save();
        } else {
            $fromAccountMovement = AccountMovement::where('id', $request->fromId)->first() ?? new AccountMovement();
            $fromAccountMovement->taxpayer_id = $taxPayer->id;
            $fromAccountMovement->chart_id = $request->from_chart_id;
            $fromAccountMovement->date =  Carbon::now();
            $fromAccountMovement->debit = $request->debit ?? 0;
            $fromAccountMovement->currency = $request->from_currency;
            $fromAccountMovement->rate = $request->from_rate ?? 1;
            $fromAccountMovement->comment = $request->comment;
            $fromAccountMovement->save();

            $toAccountMovement = AccountMovement::where('id', $request->toId)->first() ?? new AccountMovement();
            $toAccountMovement->taxpayer_id = $taxPayer->id;
            $toAccountMovement->chart_id = $request->to_chart_id;
            $toAccountMovement->date =  Carbon::now();
            $toAccountMovement->credit = $request->credit ?? 0;
            $toAccountMovement->currency = $request->to_currency;
            $toAccountMovement->rate = $request->ro_rate ?? 1;
            $toAccountMovement->comment = $request->comment;
            $toAccountMovement->save();
         }

        return response()->json('Ok', 200);
    }

    public function show(Taxpayer $taxPayer, Cycle $cycle, $movement)
    {
        return new GeneralResource(
            AccountMovement::with('chart')
                ->with('transaction:id,number,comment')
                ->where('id', $movement)
                //->select('id','chart_id as from_chart_id','taxpayer_id','journal_id','partner_id','transaction_id','currency as from_currency','rate as from_rate','date','debit','credit')
                ->first()
        );
       
    }


    public function generate_Journals($startDate, $endDate, $taxPayer, $cycle)
    {
        \DB::connection()->disableQueryLog();

         $journal = \App\Journal::where('cycle_id' , $cycle->id)
            ->where('date' , $endDate->format('Y-m-d'))
            ->where('is_automatic' , 1)
            ->where('module_id' , 7)
            ->with('details')->first()?? new \App\Journal();   

        //Clean up details by placing 0. this will allow cleaner updates and know what to delete.
        foreach ($journal->details()->get() as $detail) {
            $detail->credit = 0;
            $detail->debit = 0;
            $detail->save();
        }

        $queryAccountMovements = AccountMovement::My($startDate, $endDate, $taxPayer->id);

        $comment = __('accounting.AccountComment', ['startDate' => $startDate->toDateString(), 'endDate' => $endDate->toDateString()]);

        $journal->cycle_id = $cycle->id;
        $journal->date = $endDate;
        $journal->comment = $comment;
        $journal->is_automatic = 1;
        $journal->module_id = 7;
        $journal->save();
        
        $chartController = new ChartController();

        //1st Query: Movements related to Credit Sales. Cash Sales are ignored.
        $listOfReceivables = AccountMovement::My($startDate, $endDate, $taxPayer->id)
            ->whereHas('transaction', function ($q) use ($taxPayer) {
                $q->where('taxpayer_id', '=', $taxPayer->id)
                    ->where('payment_condition', '>', 0)
                    ->where('type',2);
            })
            ->with('transaction')
            ->get();

        foreach ($listOfReceivables as $row) {
            $value = $row->credit * $row->rate;

            if ($value == 0) {
                continue;
            }

            //First clean Accounts Receivables with localized currency value.
            $partnerChartID = $chartController->createIfNotExists_AccountsReceivables($taxPayer, $cycle, $row->transaction->partner_taxid, $row->transaction->partner_name)->id;
            $detail = $journal->details()->firstOrNew(['chart_id' => $partnerChartID]);
            $detail->debit += $value;
            $detail->chart_id = $partnerChartID;
            $journal->details()->save($detail);

            //Second clean Accounts with same localized currency value.
            $detail = $journal->details()->firstOrNew(['chart_id' => $row->chart_id]);
            $detail->credit += $value;
            $detail->chart_id = $row->chart_id;
            $journal->details()->save($detail);

            //Third, Verify Transaction Currency Rate vs Payment Currency Rate to calculate profit or loss by exchange rate differences
            $invoiceRate = $row->transaction->rate;
            $paymentRate = $row->rate;
            $rateDifference = abs($invoiceRate - $paymentRate);

            if ($paymentRate > $invoiceRate) //Gain by Exchange Rante Difference
                {
                    $detail = new \App\JournalDetail();
                    $detail->credit = $row->credit * $rateDifference;
                    $detail->debit = 0;
                    $detail->chart_id = $chartController->createIfNotExists_IncomeFromFX($taxPayer, $cycle)->id;
                    $journal->details()->save($detail);
                } else if ($paymentRate < $invoiceRate) //Loss by Exchange Rante Difference
                {
                    $detail = new \App\JournalDetail();
                    $detail->credit = 0;
                    $detail->debit = $row->credit * $rateDifference;
                    $detail->chart_id = $chartController->createIfNotExists_ExpenseFromFX($taxPayer, $cycle)->id;
                    $journal->details()->save($detail);
                }
        }

        //2nd Query: Movements related to Credit Purchases. Cash Purchases are ignored.
        $listOfPayables = AccountMovement::My($startDate, $endDate, $taxPayer->id)
            ->whereHas('transaction', function ($q) use ($taxPayer) {
                $q->where('taxpayer_id', '=', $taxPayer->id)
                    ->where('payment_condition', '>', 0)
                    ->where('type',1);
            })
            ->with('transaction')
            ->get();
           
        //run code for credit purchase (insert detail into journal)
        foreach ($listOfPayables as $row) {
            $value = $row->debit * $row->rate;

            if ($value == 0) {
                continue;
            }

            //First clean Accounts Receivables with localized currency value.
            $partnerChartID = $chartController->createIfNotExists_AccountsPayable($taxPayer, $cycle, $row->transaction->supplier_id, $row->transaction->partner_name)->id;
            $detail = $journal->details()->firstOrNew(['chart_id' => $partnerChartID]);
            $detail->credit += $value;
            $detail->chart_id = $partnerChartID;
            $journal->details()->save($detail);

            //Second clean Accounts with same localized currency value.
            $detail = $journal->details()->firstOrNew(['chart_id' => $row->chart_id]);
            $detail->debit += $value;
            $detail->chart_id = $row->chart_id;
            $journal->details()->save($detail);

            //Third, Verify Transaction Currency Rate vs Payment Currency Rate to calculate profit or loss by exchange rate differences
            $invoiceRate = $row->transaction->rate;
            $paymentRate = $row->rate;
            $rateDifference = abs($invoiceRate - $paymentRate);

            if ($paymentRate < $invoiceRate) //Gain by Exchange Rante Difference
                {
                    $detail = new \App\JournalDetail();
                    $detail->credit = $row->credit * $rateDifference;
                    $detail->debit = 0;
                    $detail->chart_id = $chartController->createIfNotExists_IncomeFromFX($taxPayer, $cycle)->id;
                    $journal->details()->save($detail);
                } else if ($paymentRate > $invoiceRate) //Loss by Exchange Rante Difference
                {
                    $detail = new \App\JournalDetail();
                    $detail->credit = 0;
                    $detail->debit = $row->credit * $rateDifference;
                    $detail->chart_id = $chartController->createIfNotExists_ExpenseFromFX($taxPayer, $cycle)->id;
                    $journal->details()->save($detail);
                }
        }
        
        //3rd Query: Movements that have no transactions. Example bank transfers and deposits
        $listOfMovements = AccountMovement::My($startDate, $endDate, $taxPayer->id)
            ->doesntHave('transaction')
            ->get();

        //run code for credit purchase (insert detail into journal)
        foreach ($listOfMovements->groupBy('chart_id') as $groupedRow) {
            //Create the account
            $detail = $journal->details()->where('chart_id', $groupedRow->first()->chart_id)->first() ?? new \App\JournalDetail();
            $detail->chart_id = $groupedRow->first()->chart_id;

            foreach ($groupedRow->groupBy('rate') as $groupedByRate) {
                $detail->credit += $groupedByRate->sum('credit') * $groupedRow->first()->rate;
                $detail->debit += $groupedByRate->sum('debit') * $groupedRow->first()->rate;
            }

            if ($detail->credit > 0 || $detail->debit > 0) {
                $journal->details()->save($detail);
            }
        }
    
        if ($journal->details()->count() == 0) {
            $journal->details()->delete();
            $journal->delete();
        }

        AccountMovement::whereIn('id', $queryAccountMovements->pluck('id'))
            ->update(['journal_id' => $journal->id]);
    }

    public function destroy(Taxpayer $taxPayer, Cycle $cycle, $ID)
    {
        try {
            //TODO: Run Tests to make sure it deletes all journals related to transaction
            AccountMovement::where('id', $ID)->forceDelete();
            return response()->json('Ok', 200);
        } catch (\Exception $e) {
            return response()->json($e, 500);
        }
    }
}
