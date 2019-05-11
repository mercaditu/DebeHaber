<?php

namespace App\Http\Controllers;

use App\Taxpayer;
use App\Cycle;
use App\Inventory;
use App\Journal;
use App\JournalDetail;
use Spatie\QueryBuilder\QueryBuilder;
use App\Http\Resources\GeneralResource;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($taxPayer, Cycle $cycle)
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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Taxpayer $taxPayer, Cycle $cycle)
    {
        $inventory = Inventory::firstOrNew(['id' => $request->id]);

        $journal = Journal::firstOrNew(['id' => $request->journal_id]);
        $journal->comment = $request->comment;
        $journal->cycle_id = $cycle->id;
        $journal->date = $request->end_date;
        $journal->save();

        $detailSales = JournalDetail::firstOrNew(['journal_id' => $journal->id, 'chart_id' => $request->chart_expense['id']]);
        $detailSales->chart_id = $request->chart_expense['id'];
        $detailSales->journal_id = $journal->id;
        $detailSales->credit = $request->discount_value;
        $detailSales->save();

        $detailInventory = JournalDetail::firstOrNew(['journal_id' => $journal->id, 'chart_id' => $request->chart_income_id]);
        $detailInventory->chart_id = $request->chart_income_id;
        $detailInventory->journal_id = $journal->id;
        $detailInventory->debit = $request->discount_value;
        $detailInventory->save();

        //clean up unnecesary details.
        //foreach

        $inventory->journal_id = $journal->id;

        $inventory->taxpayer_id = $taxPayer->id;
        $inventory->chart_id = $request->chart_id;
        $inventory->chart_income_id = $request->chart_income_id;
        $inventory->chart_expense_id = $request->chart_expense['id'];

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
    public function show($taxPayer, $cycle, $inventoryId)
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
