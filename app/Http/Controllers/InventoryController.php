<?php

namespace App\Http\Controllers;

use App\Taxpayer;
use App\Cycle;
use App\Chart;
use App\Inventory;
use App\Transaction;
use App\Journal;
use App\JournalDetail;
use Spatie\QueryBuilder\QueryBuilder;
use App\Http\Resources\GeneralResource;
use Illuminate\Http\Request;
use DB;

class InventoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Taxpayer $taxPayer, Cycle $cycle)
    {
        $query = Inventory::whereDate('start_date', $cycle->start_date)
            ->whereDate('end_date', $cycle->end_date)
            ->orderBy('date', 'desc');

        return GeneralResource::collection(
            QueryBuilder::for($query)
                ->allowedIncludes('chart')
                ->allowedFilters('chart.name')
                ->paginate(50)
        );
    }

    //TODO calcualte without VAT.
    public function calcSales(Request $request, Taxpayer $taxPayer, Cycle $cycle)
    {
        $transaction = Transaction::MySales()
            ->leftJoin('transaction_details as td', 'td.transaction_id', 'transactions.id')
            ->where('td.chart_id', $request->chart_id)
            ->whereBetween('date', [$request->start_date, $request->end_date])
            ->groupBy('td.chart_id')
            ->select(
                DB::raw('sum(td.value * transactions.rate) as sales'),
                DB::raw('sum(td.cost * transactions.rate) as cost_value'),
                DB::raw('avg(td.cost / td.value) as margin')
            )
            ->first();

        return response()->json($transaction != null ? $transaction->sales : 0);
    }

    //TODO pass start date to calculate sales at beging of inventory range
    public function calc_invenotryValue(Request $request, Taxpayer $taxPayer, Cycle $cycle)
    {
        $journals = Journal::leftJoin('journal_details as jd', 'jd.journal_id', 'journals.id')
            ->where('journals.cycle_id', $cycle->id)
            ->where('jd.chart_id', $request->chart_sales_id)
            ->whereBetween('date', [$request->start_date, $request->end_date])
            ->groupBy('jd.chart_id')
            ->select(DB::raw('sum(jd.credit) - sum(jd.debit) as inventory_value'))
            ->first();
        return response()->json($journals != null ? $journals->inventory_value : 0);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Taxpayer $taxPayer, Cycle $cycle)
    {
        if ($request->id == 0) {
            $inventory = new Inventory();
        } else {
            $inventory = Inventory::where('id', $request->id)->first();
        }

        $journal = Journal::firstOrNew(['id' => $request->id]);
        $journal->comment = $request->comment;
        $journal->cycle_id = $cycle->id;
        $journal->date = $request->end_date;
        $journal->save();

        $detailSales = JournalDetail::firstOrNew(['journal_id' => $journal->id, 'chart_id' => $request->chart_sales_id]);
        $detailSales->journal_id = $journal->id;
        $detailSales->credit = $request->discount_value;
        $detailSales->save();

        $detailInventory = JournalDetail::firstOrNew(['journal_id' => $journal->id, 'chart_id' => $request->chart_id]);
        $detailInventory->journal_id = $journal->id;
        $detailInventory->debit = $request->discount_value;
        $detailInventory->save();

        //clean up unnecesary details.
        //foreach

        $inventory->journal_id = $journal->id;

        $inventory->taxpayer_id = $taxPayer->id;
        $inventory->chart_id = $request->chart_id;
        $inventory->chart_sales_id = $request->chart_sales_id;

        $inventory->start_date = $request->start_date;
        $inventory->end_date = $request->end_date;
        $inventory->sales_value = $request->sales_value ?? 0;
        $inventory->inventory_value = $request->inventory_value;
        $inventory->discount_value = $request->discount_value;

        $inventory->comments = $request->comment;
        $inventory->save();

        return response()->json('ok', 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Inventory  $transaction
     * @return \Illuminate\Http\Response
     */
    public function show(Taxpayer $taxPayer, Cycle $cycle, $inventoryId)
    {
        return new GeneralResource(
            Inventory::where('id', $inventoryId)
                ->first()
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Inventory  $inventory
     * @return \Illuminate\Http\Response
     */
    public function destroy(Inventory $inventory)
    {
        //
    }
}
