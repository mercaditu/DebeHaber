<?php

namespace App\Http\Controllers;

use App\Taxpayer;
use App\Cycle;
use App\Impex;
use App\ImpexExpense;
use App\Transaction;
use App\Http\Resources\GeneralResource;
use Illuminate\Http\Request;
use DB;

class ImpexController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Taxpayer $taxPayer, Cycle $cycle)
    {
        return GeneralResource::collection(
            Impex::with('transactions')
                ->with('expenses')
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
    public function store(Request $request)
    {
        $impex = Impex::firstOrNew(['id', $request->id]);
        $impex->comment =  $request->comment;
        $impex->code =  $request->code;
        $impex->date =  $request->date;
        $impex->save();

        //Store Transactions through foreach.
        foreach ($request->transactions as $transaction) {
            $transaction->impex_id = $impex->id;
            $transaction->save();
        }

        //Store Expenses through foreach
        foreach ($request->expenses as $expense) {
            $expense = exExpense::firstOrNew(['id', $expense->id]);
            $expense->chart_id = $expense->chart_id['id'];
            $expense->transaction_detail_id = $expense->transaction_detail_id['id'];
            $expense->currency = $expense->currency;
            $expense->rate = $expense->rate;
            $expense->save();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Impex  $impex
     * @return \Illuminate\Http\Response
     */
    public function show(Taxpayer $taxPayer, Cycle $cycle, $impex)
    {
        return new GeneralResource(
            Impex::where('id', $impex)
                ->with('transactions')
                ->with('expenses')
                ->first()
        );
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
}
