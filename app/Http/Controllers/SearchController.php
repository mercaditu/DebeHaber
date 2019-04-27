<?php

namespace App\Http\Controllers;

use App\Taxpayer;
use App\Cycle;
use App\Transaction;
use App\Chart;
use App\Http\Resources\GeneralResource;
use App\Http\Resources\ModelResource;
use DB;

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

    public function searchPurchaseTransactions(TaxPayer $taxPayer, $cycle, $q)
    {
        $taxPayerID = $taxPayer->id ?? $taxPayer;

        return GeneralResource::collection(
            Transaction::where('type', 1)
                ->where('taxpayer_id', $taxPayer->id)
                ->where('number', 'like', '%' . $q . '%')
                ->join('transaction_details', 'transactions.id', '=', 'transaction_details.transaction_id')
                ->select(
                    DB::raw('max(partner_name) as partner'),
                    DB::raw('max(number) as number'),
                    DB::raw('sum(transaction_details.value) as total')
                )
                ->paginate(50)


        );
    }

    public function searchTaxPayers($taxPayer, $cycle, $q)
    {
        return GeneralResource::collection(Taxpayer::search($q)->paginate(25));
    }

    public function searchChartsName(TaxPayer $taxPayer, Cycle $cycle, $q)
    {
        $chart = Chart::My($taxPayer, $cycle)->selectRaw('max(name) as name,max(code) as code,max(id) as id')
            ->whereNull('parent_id')
            ->where('name', 'LIKE', '%' . $q . '%')
            ->groupBy('code')
            ->get();
        return $chart;
    }

    public function searchChartsCode(TaxPayer $taxPayer, Cycle $cycle, $q)
    {
        $chart = Chart::My($taxPayer, $cycle)->selectRaw('max(name) as name,max(code) as code,max(id) as id')
            ->whereNull('parent_id')
            ->where('code', 'LIKE', '%' . $q . '%')
            ->groupBy('code')
            ->get();
        return $chart;
    }

    public function searchPartnerName($taxPayer, $cycle, $q)
    {
        $transaction = Transaction::selectRaw('max(partner_name) as name,max(partner_taxid) as taxid,max(taxpayer_id) as taxpayer_id')
            ->where('partner_name', 'LIKE', '%' . $q . '%')
            ->with('taxpayer')
            ->groupBy('partner_taxid')
            ->get();
        return $transaction;
    }
    public function searchPartnerTaxid($taxPayer, $cycle, $q)
    {
        $transaction = Transaction::selectRaw('max(partner_name) as name,max(partner_taxid) as taxid,max(taxpayer_id) as taxpayer_id')
            ->where('partner_taxid', 'LIKE', '%' . $q . '%')
            ->with('taxpayer')
            ->groupBy('partner_taxid')
            ->get();
        return $transaction;
    }
}
