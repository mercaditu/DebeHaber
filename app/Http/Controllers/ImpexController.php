<?php

namespace App\Http\Controllers;

use App\Taxpayer;
use App\Cycle;
use App\Impex;
use App\ImpexExpense;
use App\Transaction;
use App\Http\Resources\GeneralResource;
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
       $impex = Impex::where('id',$request->id)->with('expenses')->first();
       $transaction = Transaction::where('number',$request->details[0]['number'])->with('details')->first();
       $impex->save();
       foreach ($request->expenses as $expense) {
        $detail=$transaction->details()->where('chart_id',$expense['chart_id'])->first();
        if($detail != null )
        {
            $impexExpense= ImpexExpense::where('id', $expense['id'])->first();
            $impexExpense->chart_id = $detail->chart_id;
            $impexExpense->transaction_detail_id = $detail->id;
            $impexExpense->value = $detail->value;
            $impexExpense->currency = $transaction->currency;
            $impexExpense->rate = $transaction->rate;
            $impexExpense->save();
        }
        else{
            $impexExpense= ImpexExpense::where('id', $expense['id'])->first();
            $impexExpense->chart_id = $expense['chart_id'];
            $impexExpense->transaction_detail_id = null;
            $impexExpense->value = $expense['value'];
            $impexExpense->currency = $expense['currency'];
            $impexExpense->rate = $expense['rate'];
            $impexExpense->save();
        }
        
       }

    }

    /**
    * Display the specified resource.
    *
    * @param  \App\Impex  $impex
    * @return \Illuminate\Http\Response
    */
    public function show(Taxpayer $taxPayer, Cycle $cycle,$impex)
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
