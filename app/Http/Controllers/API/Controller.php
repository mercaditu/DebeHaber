<?php

namespace App\Http\Controllers\API;

use App\Currency;
use App\CurrencyRate;
use App\Taxpayer;
use App\Chart;
use App\Cycle;
use App\ChartVersion;
use App\Http\Controllers\ChartController;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Auth;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function checkCycle(Taxpayer $taxPayer, $firstDate)
    {

        $version = ChartVersion::where('country', $taxPayer->country)
        ->orWhere('taxpayer_id', $taxPayer->id)
        ->first();

        if (!isset($version)) {
            $version = new ChartVersion();
            $version->taxpayer_id = $taxPayer->id;
            $version->name = 'Version Automatica';
            $version->save();
        }

        $cycle = new Cycle();
        $cycle->chart_version_id = $version->id;
        $cycle->year = $firstDate->year;
        $cycle->start_date = new Carbon('first day of January ' . $firstDate->year);
        $cycle->end_date = new Carbon('last day of December ' . $firstDate->year);
        $cycle->taxpayer_id = $taxPayer->id;
        $cycle->save();

        return $cycle;
    }

    public function checkServer(Request $request)
    {
        return response()->json('Ready to rock ... your accounting data', 200);
    }

    public function checkAPI(Request $request)
    {
        if (Auth::user() != null) {
            return response()->json(Auth::user()->name, 200);
        } else {
            return response()->json('Forbidden Access', 403);
        }
    }

    public function checkTaxPayer($taxID, $name)
    {
        $cleanTaxID = strtok($taxID, '-');
        $cleanDV = substr($taxID, -1);

        if (is_numeric($cleanTaxID)) {
            $taxPayer = Taxpayer::where('taxid', $cleanTaxID)->first();
        } else {
            $taxPayer = Taxpayer::where('taxid', '88888801')->first();
        }

        if (!isset($taxPayer)) {
            $taxPayer = new taxpayer();
            $taxPayer->name = $name ?? 'No Name';

            if ($cleanTaxID == false) {
                $taxPayer->taxid = 88888801;
                $taxPayer->code = null;
            } else {
                $taxPayer->taxid = $cleanTaxID ?? 88888801;
                $taxPayer->code = is_numeric($cleanDV) ? $cleanDV : null;
            }

            $taxPayer->alias = substr($name, 0, 29) . '...';;
            $taxPayer->save();
        }

        return $taxPayer;
    }

    public function checkCurrency($currencyCode, Taxpayer $taxPayer)
    {
        //Check if Chart Exists
        if ($currencyCode != '') {
            $currency = Currency::where('code', $currencyCode)
            ->where('country', $taxPayer->country)
            ->first();

            //TODO, add validation to make sure currencyCode is stanard ISO code. If not, return null

            if ($currency == null) {
                $currency = new Currency();
                $currency->country = $taxPayer->country;
                $currency->code = $currencyCode;
                $currency->name = $currencyCode;
                $currency->save();
            }

            return $currency->code;
        }

        return null;
    }

    public function checkCurrencyRate($currencyCode, Taxpayer $taxPayer, $date)
    {
        //Add If to check if Currency is same as Taxpayer Currency.
        //In this case, automatically return 1.
        $currencyRate = CurrencyRate::whereDate('date', $this->convert_date($date))
        ->whereHas('currency', function($q) use ($currencyCode, $taxPayer) {
            $q->where('code', $currencyCode)
            ->where('country', $taxPayer->country);
        })
        ->where(function ($q) use ($taxPayer) {
            $q->whereNull('taxpayer_id')
            ->orWhere('taxpayer_id', $taxPayer->id);
        })
        ->orderBy('taxpayer_id', 'ASC')
        ->first();

        if (isset($currencyRate)) {
            return $currencyRate->rate;
        }

        //Go to API for Rate

        return null;
    }

    public function checkChart($costCenter, $name, Taxpayer $taxPayer, Cycle $cycle, $type)
    {
        $chartController = new ChartController();
        //Check if Chart Exists
        if (isset($costCenter)) {
            $chart = null;
            //Type 1 = Service
            if ($costCenter == 1) {
                if ($type == 2) {
                    //Sales
                    $chart = $chartController->createIfNotExists_Incomes($taxPayer, $cycle, $costCenter->Name);
                } else {
                    //Purchase
                    $chart = $chartController->createIfNotExists_Expenses($taxPayer, $cycle, $costCenter->Name ?? '');
                }
            }
            //Type 2 = Products
            elseif ($costCenter == 2) {
                if ($type == 2) {
                    //Sales
                    $chart = $chartController->createIfNotExists_IncomeFromInventory($taxPayer, $cycle, $costCenter->Name ?? '');
                } else {
                    //Purchase
                    $chart = $chartController->createIfNotExists_Inventory($taxPayer, $cycle, $costCenter->Name ?? '');
                }
            }
            //Type 3 = FixedAsset
            elseif ($costCenter == 3) {
                $chart = Chart::My($taxPayer, $cycle)
                ->where('type', 1)
                ->where('sub_type', 9)
                ->where('is_accountable', true)
                ->where('name', $costCenter->Name)
                ->first();

                if (!isset($chart)) {
                    //if not, create specific.
                    $chart = new Chart();
                    $chart->taxpayer_id = $taxPayer->id;
                    $chart->chart_version_id = $cycle->chart_version_id;
                    $chart->type = 1;
                    $chart->sub_type = 9;
                    $chart->is_accountable = true;
                    $chart->name = $costCenter->Name ?? __('enum.FixedAssets');
                    $chart->code = '###';
                    $chart->save();
                }
            }

            return $chart->id;
        }

        return null;
    }

    public function checkDebitVAT($coefficient, Taxpayer $taxPayer, Cycle $cycle)
    {

        //Check if Chart Exists
        if ($coefficient != '' || $coefficient == 0) {

            $chart = Chart::My($taxPayer, $cycle)
            ->VATDebitAccounts()
            ->where('coefficient', $coefficient / 100)
            ->first();

            if ($chart == null) {
                $chart = new Chart();
                $chart->chart_version_id = $cycle->chart_version_id;
                $chart->country = $taxPayer->country;
                $chart->taxpayer_id = $taxPayer->id;
                $chart->is_accountable = true;
                $chart->type = 2;
                $chart->sub_type = 3;
                $chart->coefficient = $coefficient / 100;

                $chart->code = '###';

                $chart->name = 'Vat Debit ' . $coefficient;
                $chart->level = 1;

                $chart->save();
            }

            return $chart->id;
        }

        return null;
    }

    public function checkCreditVAT($coefficient, Taxpayer $taxPayer, Cycle $cycle)
    {
        //Check if Chart Exists
        if ($coefficient != '' || $coefficient == 0) {
            $chart = Chart::My($taxPayer, $cycle)
            ->VATCreditAccounts()
            ->where('coefficient', $coefficient / 100)
            ->first();

            if ($chart == null) {
                $chart = new Chart();
                $chart->chart_version_id = $cycle->chart_version_id;
                $chart->country = $taxPayer->country;
                $chart->taxpayer_id = $taxPayer->id;
                $chart->is_accountable = true;
                $chart->type = 2;
                $chart->sub_type = 3;
                $chart->coefficient = $coefficient / 100;

                $chart->code = '###';

                $chart->name = 'Vat Credit ' . $coefficient;
                $chart->level = 1;

                $chart->save();
            }

            return $chart->id;
        }

        return null;
    }

    public function checkChartAccount($name, Taxpayer $taxPayer, Cycle $cycle)
    {
        //Check if Chart Exists
        if ($name != '') {
            //TODO Wrong, you need to specify taxpayerID or else you risk bringing other accounts not belonging to taxpayer.
            //I have done this already.
            $chart = Chart::My($taxPayer, $cycle)
            ->MoneyAccounts()
            ->where('name', $name)
            ->orWhereHas('aliases', function ($subQ) use ($name) {
                $subQ->where('name', 'like', '%' . $name . '%');
            })
            ->first();

            if ($chart == null) {
                $chart = new Chart();
                $chart->chart_version_id = $cycle->chart_version_id;
                $chart->country = $taxPayer->country;
                $chart->taxpayer_id = $taxPayer->id;
                $chart->is_accountable = true;
                $chart->type = 1;
                $chart->sub_type = 3;

                $chart->code = '###';
                $chart->name = $name;
                $chart->save();
            }

            return $chart->id;
        }

        return null;
    }

    public function convert_date($date)
    {
        return Carbon::parse($date)->format('Y-m-d');
    }
}
