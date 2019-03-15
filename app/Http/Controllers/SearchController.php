<?php

namespace App\Http\Controllers;

use App\Taxpayer;
use App\Cycle;
use App\Transaction;
use App\Chart;
use Illuminate\Http\Request;
use App\Http\Resources\ModelResource;

class SearchController extends Controller
{
    public function searchPurchases($taxPayer, $cycle, $q)
    {
        $results = Transaction::search($q)
            ->where('customer_id', $taxPayer->id)
            ->where('type', 2)
            ->paginate(25);

        return ModelResource::collection($results->load('supplier'));
    }

    public function searchDebits($taxPayer, $cycle, $q)
    {
        $results = Transaction::search($q)
            ->where('customer_id', $taxPayer->id)
            ->where('type', 3)
            ->paginate(25);

        return ModelResource::collection($results->load('supplier'));
    }

    public function searchSales($taxPayer, $cycle, $q)
    {
        $results = Transaction::search($q)
            ->where('supplier_id', $taxPayer->id)
            ->where('type', 4)
            ->paginate(25);

        return ModelResource::collection($results->load('customer'));
    }

    public function searchCredits($taxPayer, $cycle, $q)
    {
        $results = Transaction::search($q)
            ->where('supplier_id', $taxPayer->id)
            ->where('type', 4)
            ->paginate(25);

        return ModelResource::collection($results->load('customer'));
    }

    public function searchTransactions($taxPayer, $cycle, $q)
    {
        $taxPayerID = $taxPayer->id ?? $taxPayer;

        return GeneralResource::collection(
            Transaction::where(function ($query) use ($taxPayer, $q) {
                $query
                    ->where(function ($subQuery) use ($taxPayer, $q) {
                        $subQuery->whereIn('type', [4, 5])
                            ->where('supplier_id', $taxPayer->id)
                            ->where('number', 'like', '%' . $q . '%')
                            ->where('code', 'like', '%' . $q . '%')
                            ->whereHas('customer', function ($subSubQuery) use ($q) {
                                $subSubQuery->where('name', 'like', '%' . $q . '%')
                                    ->where('taxid', 'like', '%' . $q . '%');
                            });
                    })
                    ->orWhere(function ($subQuery) use ($taxPayer, $q) {
                        $subQuery->whereIn('type', [1, 2, 3])
                            ->where('customer_id', $$taxPayer->id)
                            ->where(function ($subSubQuery) use ($q) {
                                $subSubQuery->where('number', 'like', '%' . $q . '%')
                                    ->orWhere('code', 'like', '%' . $q . '%');
                            })
                            ->whereHas('supplier', function ($subSubQuery) use ($q) {
                                $subSubQuery->where('name', 'like', '%' . $q . '%')
                                    ->where('taxid', 'like', '%' . $q . '%');
                            });
                    });
            })
                ->with('details')
                ->with('customer')
                ->with('supplier')
        );
    }

    public function searchTaxPayers($taxPayer, $cycle, $q)
    {
        return GeneralResource::collection(Taxpayer::search($q)->paginate(25));
    }

    public function searchChartsName(TaxPayer $taxPayer,Cycle $cycle, $q)
    {
       $chart = Chart::My($taxPayer,$cycle)->selectRaw('max(name) as name,max(code) as code,max(id) as id')
                      ->whereNull('parent_id')
                      ->where('name', 'LIKE', '%'.$q.'%')
                      ->groupBy('code')
                      ->get();  
                return $chart;
    }

    public function searchChartsCode(TaxPayer $taxPayer,Cycle $cycle, $q)
    {
        $chart = Chart::My($taxPayer,$cycle)->selectRaw('max(name) as name,max(code) as code,max(id) as id')
                      ->whereNull('parent_id')
                      ->where('code', 'LIKE', '%'.$q.'%')
                      ->groupBy('code')
                      ->get();  
                return $chart;
    }

    public function searchPartnerName($taxPayer, $cycle, $q)
    {
       $transaction = Transaction::selectRaw('max(partner_name) as name,max(partner_taxid) as taxid,max(taxpayer_id) as taxpayer_id')
                      ->where('partner_name', 'LIKE', '%'.$q.'%')
                      ->with('taxpayer')  
                      ->groupBy('partner_taxid')
                      ->get();  
                return $transaction;
    }
    public function searchPartnerTaxid($taxPayer, $cycle, $q)
    {
       $transaction = Transaction::selectRaw('max(partner_name) as name,max(partner_taxid) as taxid,max(taxpayer_id) as taxpayer_id')
                      ->where('partner_taxid', 'LIKE', '%'.$q.'%')
                      ->with('taxpayer')  
                      ->groupBy('partner_taxid')
                      ->get();  
                return $transaction;
    }
}
