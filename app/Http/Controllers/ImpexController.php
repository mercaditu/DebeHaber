<?php

namespace App\Http\Controllers;

use App\Taxpayer;
use App\Cycle;
use App\Impex;
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
        //$impex = Impex::
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
