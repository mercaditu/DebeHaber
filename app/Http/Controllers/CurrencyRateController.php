<?php

namespace App\Http\Controllers;

use App\Taxpayer;
use App\TaxpayerSetting;
use App\Cycle;
use App\Currency;
use App\CurrencyRate;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Swap\Laravel\Facades\Swap;
use App\Http\Resources\GeneralResource;
use DB;

class CurrencyRateController extends Controller
{
    /**
    * Display a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */
    public function index(Taxpayer $taxPayer, Cycle $cycle)
    {
        return GeneralResource::collection(
            CurrencyRate::with('currency')
            ->orderBy('date', 'desc')
            ->paginate(50)
        );
    }

    /**
    * Gets the rates for a specific currency by Date. If rate doesn't exist,
    * then it will search on the internet and create the rate for future use.
    *
    * @return \Illuminate\Http\Response
    */
    public function get_ratesByCurrency(TaxPayer $taxPayer, $currencycode, $date)
    {
        $date = Carbon::parse($date) ?? Carbon::now();

        $currencyRate = CurrencyRate::
        whereHas('currency', function ($q) use ($taxPayer,$currencycode) {
                $q->where('country', '=', $taxPayer->country)
                    ->where('code', $currencycode);
            })
        ->whereDay('date', '=', $date->day)
        ->whereMonth('date', '=', $date->month)
        ->whereYear('date', '=', $date->year)
        ->first();

        if (isset($currencyRate))
        {
            return response()->json($currencyRate);
        }
        else
        {
            //swap fx
            $currency=Currency::where('code', $currencycode)->first();
            $currCode = $currency->code;
            $currCompanyCode = Taxpayer::where('id', $taxPayer->id)->select('currency')->first()->currency;

            //check that CompanyCode, CurrencyCode, and that both aren't the same.
            if ($currCompanyCode != null && $currCode != null && $currCompanyCode != $currCode)
            {
                //$str = 'USD/EUR';
                $str = $currCode . '/' . $currCompanyCode;
             
                $rate =1;// Swap::historical($str, Carbon::parse($date));

                $currencyRate = new CurrencyRate();
                $currencyRate->date = $date;
                $currencyRate->currency_id = $currency->id;
                $currencyRate->buy_rate =1; //$rate->getValue();
                $currencyRate->sell_rate =1;// $rate->getValue();
                $currencyRate->save();

                return response()->json($currencyRate);
            }
        }

        //Create object, but do not store data.
        $currencyRate = new CurrencyRate();
        $currencyRate->date = $date;
        $currencyRate->currency_id = $currencycode;
        $currencyRate->buy_rate = 1;
        $currencyRate->sell_rate = 1;

        return response()->json($currencyRate);
    }

    /**
    * Store a newly created resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
    public function store(Request $request, Taxpayer $taxPayer, $cycle)
    {
        $currencyrate = $request->id == 0 ? $currencyrate = new CurrencyRate() : CurrencyRate::where('id', $request->id)->first();
        $currencyrate->currency_id = $request->currency_id;
        $currencyrate->buy_rate = $request->buy_rate;
        $currencyrate->sell_rate = $request->sell_rate;
        $currencyrate->save();

        return response()->json('Ok', 200);
    }

    public function show($taxPayer, $cycle, $rateId)
    {
        return new GeneralResource(
            CurrencyRate::with('currency')
            ->where('id', $rateId)
            ->first()
        );
    }

    /**
    * Remove the specified resource from storage.
    *
    * @param  \App\CurrencyRate  $currencyRate
    * @return \Illuminate\Http\Response
    */
    public function destroy(CurrencyRate $currencyRate)
    {
        //
    }
}
