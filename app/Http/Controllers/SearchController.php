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

    public function searchPurchaseTransactions(TaxPayer $taxPayer, Cycle $cycle, $query)
    {
        $taxPayerID = $taxPayer->id ?? $taxPayer;

        return GeneralResource::collection(
            Transaction::where('type', 1)
                ->where('transactions.sub_type', 1)
                ->where('taxpayer_id', $taxPayerID)
                ->whereHas('details.chart', function ($q) {
                    $q->where('type', 1)
                        ->where('sub_type', 8);
                })
                ->where(function ($q) use ($query) {
                    $q->where('number', 'like', '%' . $query . '%')
                        ->orWhere('partner_name', 'like', '%' . $query . '%')
                        ->orWhere('partner_taxid', 'like', '%' . $query . '%');
                })
                ->join('transaction_details', 'transactions.id', '=', 'transaction_details.transaction_id')
                ->select(
                    'transactions.date',
                    'transactions.partner_name',
                    'transactions.currency',
                    'transactions.rate',
                    'transactions.number',
                    'transactions.id',
                    'transaction_details.chart_id',
                    'transaction_details.value'
                )
                ->orderBy('transactions.date', 'desc')
                ->paginate(25)
        );
    }

    public function searchExpenses(TaxPayer $taxPayer, $cycle, $query)
    {
        $taxPayerID = $taxPayer->id ?? $taxPayer;

        return GeneralResource::collection(
            Transaction::join('transaction_details', 'transactions.id', '=', 'transaction_details.transaction_id')
                ->join('charts', 'charts.id', '=', 'transaction_details.chart_id')
                ->where(function ($q) use ($query) {
                    $q->where('transactions.number', 'like', '%' . $query . '%')
                        ->orWhere('transactions.partner_name', 'like', '%' . $query . '%')
                        ->orWhere('charts.name', 'like', '%' . $query . '%');
                })
                ->where('transactions.taxpayer_id', $taxPayerID)
                ->where('transactions.type', 1)
                ->where('transactions.sub_type', 1)
                ->select(
                    'transactions.date',
                    'transactions.partner_name',
                    'transactions.currency',
                    'transactions.rate',
                    'transactions.number',
                    'transaction_details.id',
                    'transaction_details.chart_id',
                    'charts.name as chart',
                    'transaction_details.value as value'
                )
                ->orderBy('transactions.date', 'desc')
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
