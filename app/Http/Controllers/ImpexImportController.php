<?php

namespace App\Http\Controllers;

use App\Taxpayer;
use App\Cycle;
use App\Impex;
use Illuminate\Http\Request;

class ImpexImportController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Taxpayer $taxPayer, Cycle $cycle)
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Impex  $impex
     * @return \Illuminate\Http\Response
     */
    public function show(Impex $impex)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Impex  $impex
     * @return \Illuminate\Http\Response
     */
    public function edit(Impex $impex)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Impex  $impex
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Impex $impex)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Impex  $impex
     * @return \Illuminate\Http\Response
     */
    public function destroy(Impex $impex)
    {
        //
    }

    public function generate_Journals($startDate, $endDate, $taxPayer, $cycle)
    {
        \DB::connection()->disableQueryLog();

        $journal = \App\Journal::where('cycle_id', $cycle->id)
            ->where('date', $endDate->format('Y-m-d'))
            ->where('is_automatic', 1)
            ->where('module_id', 5)
            ->with('details')->first() ?? new \App\Journal();

        //Clean up details by placing 0. this will allow cleaner updates and know what to delete.
        foreach ($journal->details()->get() as $detail) {
            $detail->credit = 0;
            $detail->debit = 0;
            $detail->save();
        }

        //search impex
        $impexQuery = Impex::where('taxpayer_id', $taxPayer->id)->pluck('id');

        $comment = __('accounting.ImpexComment', ['startDate' => $startDate->toDateString(), 'endDate' => $endDate->toDateString()]);
        $journal->cycle_id = $cycle->id; //TODO: Change this for specific cycle that is in range with transactions
        $journal->date = $endDate;
        $journal->comment = $comment;
        $journal->is_automatic = 1;
        $journal->module_id = 5;
        $journal->save();

        //Sales Transactionsd done in cash. Must affect direct cash account.
        $itemsQuery = Transaction::MyPurchasesForJournals($startDate, $endDate, $taxPayer->id)
            ->join('transaction_details', 'transactions.id', '=', 'transaction_details.transaction_id')
            ->join('charts', 'charts.id', '=', 'transaction_details.chart_id')
            ->groupBy('transaction_details.chart_id')
            ->whereIn('transactions.impex_id', $impexQuery)
            ->where('transactions.type', 1)
            ->where('transactions.sub_type', 8)
            ->select(
                DB::raw('sum(transaction_details.value * transactions.rate) as value'),
                DB::raw('max(transaction_details.chart_id) as chart_id'),
                DB::raw('max(charts.name) as name')
            )
            ->get();

        $expenseFromPurchaseQuery = Transaction::MyPurchasesForJournals($startDate, $endDate, $taxPayer->id)
            ->join('transaction_details', 'transactions.id', '=', 'transaction_details.transaction_id')
            ->join('charts', 'charts.id', '=', 'transaction_details.chart_id')
            ->groupBy('transaction_details.chart_id')
            ->whereIn('transactions.impex_id', $impexQuery)
            ->whereNot('transactions.type', 1)
            ->whereNot('transactions.sub_type', 8)
            ->select(
                DB::raw('sum(transaction_details.value * transactions.rate) as total'),
                DB::raw('max(transaction_details.chart_id) as chart_id'),
                DB::raw('max(charts.name) as name')
            );


        $expense = ImpexExpense::whereIn('impex_expenses.impex_id', $impexQuery)
            ->join('transaction_details', 'impex_expenses.transaction_detail_id', '=', 'transaction_details.id')
            ->join('transaction_details', 'transactions.id', '=', 'transaction_details.transaction_id')
            ->join('charts', 'charts.id', '=', 'impex_expenses.chart_id')
            ->groupBy('transaction_details.chart_id')
            ->where('payment_condition', '=', 0)
            ->select(
                DB::raw('sum(impex_expenses.value * impex_expenses.rate) as total'),
                DB::raw('max(impex_expenses.chart_id) as chart_id'),
                DB::raw('max(charts.name) as name')
            );

        $expenseQuery = $expenseFromPurchaseQuery->union($expense)->get();

        //run code for cash sales (insert detail into journal)
        $totalTransaction = $itemsQuery->sum('total');

        foreach ($itemsQuery as $itemsRow) {
            //get percentage of item of total item purchase. This will divide the expenses for each item purchased.
            $percentageTransaction = $itemsRow / ($totalTransaction ?? 1);

            foreach ($expenseQuery as $expenseRow) {
                //1st detail = increase item value
                $detail = $journal->details()->firstOrNew(['chart_id' => $itemsRow->chart_id]);
                $detail->credit += ($expenseRow->total * $percentageTransaction);
                $detail->chart_id = $itemsRow->chart_id;
                $journal->details()->save($detail);

                //2nd detail = decrease expense value
                $detail = $journal->details()->firstOrNew(['chart_id' => $expenseRow->chart_id]);
                $detail->debit += ($expenseRow->total * $percentageTransaction);
                $detail->chart_id = $expenseRow->chart_id;
                $journal->details()->save($detail);
            }
        }

        //delete where credit and debit == 0. This will clean up old charts that were used, but not in new.
        $journal->details()
            ->where('debit', 0)
            ->where('credit', 0)
            ->delete();

        $journal->save();

        $impexQuery->update(['journal_id' => $journal->id]);
    }
}
