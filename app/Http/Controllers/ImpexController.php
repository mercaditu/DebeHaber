<?php

namespace App\Http\Controllers;

use App\Transaction;
use App\Taxpayer;
use App\Cycle;
use App\Impex;
use App\ImpexExpense;
use App\Http\Resources\GeneralResource;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Http\Request;

class ImpexController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Taxpayer $taxPayer, Cycle $cycle)
    {
        $query = Impex::with('transactions')
                ->with('expenses')
                ->whereBetween('date', [$cycle->start_date, $cycle->end_date])
                ->orderBy('date', 'desc');

        return GeneralResource::collection(
            QueryBuilder::for($query)
                ->allowedIncludes('transactions')
                ->allowedIncludes('expenses')
                ->allowedFilters('partner_name', 'partner_taxid', 'code')
                ->paginate(50)
        );


        // return GeneralResource::collection(
        //     Impex::with('transactions')
        //         ->with('expenses')
        //         ->whereBetween('date', [$cycle->start_date, $cycle->end_date])
        //         ->orderBy('date', 'desc')
        //         ->paginate(50)
        // );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request,Taxpayer $taxPayer)
    {
        $impex = Impex::firstOrNew(['id' => $request->id]);
        $impex->taxpayer_id =  $taxPayer->id;
        $impex->comment =  $request->comment;
        $impex->code =  $request->code;
        $impex->date =  $request->date;
        $impex->save();

        //Store Transactions through foreach. Save ImpexId into transactions for Reference
        foreach ($request->transactions as $trans) {
            $transaction = Transaction::where('id', $trans['id'])->first();
            if(isset($transaction))
            {
                $transaction->impex_id = $impex->id;
                $transaction->save();
            }
        }

        //Store Expenses through foreach.
        foreach ($request->expenses as $data) {
            $expense = ImpexExpense::firstOrNew(['id' => $data['chart_id']]);
            $expense->impex_id =  $impex->id;
            $expense->chart_id = $data['chart_id'];
            $expense->transaction_detail_id = $data['transaction_detail_id'];
            $expense->currency = $data['currency'];
            $expense->rate = $data['rate'];
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
