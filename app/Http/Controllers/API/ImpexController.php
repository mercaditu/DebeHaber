<?php

namespace App\Http\Controllers\API;

use App\Taxpayer;
use App\Cycle;
use App\Impex;
use App\ImpexExpense;
use Illuminate\Http\Request;
use Carbon\Carbon;

class ImpexController extends Controller
{
	public function start(Request $request)
	{
		$impexData = array();
		$cycle = null;

		$chunkedData = $request;

		if (isset($chunkedData)) {
			$data = collect($chunkedData);
			$groupData = $data->groupBy(function ($q) {
				return Carbon::parse($q["Date"])->format('Y');
			});

			//groupby function group by year.
			foreach ($groupData as $groupedRow) {
				if ($groupedRow->first()['Type'] == 1) {
					$taxPayer = $this->checkTaxPayer($groupedRow->first()['CustomerTaxID'], $groupedRow->first()['CustomerName']);
				} else {
					$taxPayer = $this->checkTaxPayer($groupedRow->first()['SupplierTaxID'], $groupedRow->first()['SupplierName']);
				}

				//check and create cycle
				$firstDate = Carbon::parse($groupedRow->first()["Date"]);
				$cycle = Cycle::My($taxPayer, $firstDate)->first();
				if (!isset($cycle)) {
					$cycle = $this->checkCycle($taxPayer, $firstDate);
				}

				$i = 0;

				foreach ($groupedRow as $data) {
					try {
						$data = $this->processImpex($data, $taxPayer, $cycle);
						$data["Message"] = "Success";
						$impexData[$i] = $data;
						$i = $i + 1;
					} catch (\Exception $e) {
						$data["Message"] = "Error loading Impex: " . $e;
						$impexData[$i] = $data;
						//Log::error($e);
					}
				}
			}
		}

		return response()->json($impexData);
	}

	public function processImpex($data, Taxpayer $taxPayer, Cycle $cycle)
	{
		$impex = Impex::where('code', $data['Number'])
			->where('taxpayer_id', $taxPayer->id)
			->first() ?? new Impex();

		$impex->date = $this->convert_date($data['Date']);
		$impex->partner_name = ($data['Type'] == 1) ? $data['SupplierName'] : $data['CustomerName'];
		$impex->partner_taxid = ($data['Type'] == 1) ? $data['SupplierTaxID'] : $data['CustomerTaxID'];
		$impex->taxpayer_id = $taxPayer->id;
		$impex->code = $data['Number'] ?? '';
		$impex->comment = $data['Comment'] ?? '';
		$impex->is_import = $data['IsImport'] ?? true;

		$impex->type = $data['Type'];
		$impex->currency = $this->checkCurrency($data['CurrencyCode'], $taxPayer);

		if ($data['CurrencyRate'] ==  '' | $data['CurrencyRate'] == 0) {
			$impex->rate = $this->checkCurrencyRate($impex->currency, $taxPayer, $data['Date']) ?? 1;
		} else {
			$impex->rate = $data['CurrencyRate'];
		}

		$impex->save();


		//Assign invoices . . .
		$i = 0;
		$invoices = collect($data['Invoices']);
		foreach ($invoices as $invoice) {

			$controller = new TransactionController();
			$invoice = $controller->processTransaction($invoice, $taxPayer, $cycle, $impex->id);
			$invoice = $data['Invoices'][$i] = $data;
			$i += 1;
		}

		//Assign expenses . . .
		$expenses = collect($data['Expenses']);
		foreach ($expenses as $expense) {

			$chartId = $this->checkChart($expense['Type'], $expense['Name'], $taxPayer, $cycle, 1);

			if ($chartId > 0) {

				$impexExpense = ImpexExpense::where('chart_id', $chartId)
					->where('impex_id', $impex->id)
					->first() ?? new ImpexExpense();

				$impexExpense->impex_id = $impex->id;
				$impexExpense->chart_id = $chartId;
				$impexExpense->value += $expense['Value'];
				$impexExpense->currency = $expense['CurrencyCode'];
				$impexExpense->rate = $expense['CurrencyRate'];

				try {
					$impexExpense->save();
				} catch (\Exception $e) {
					Log::error($e);
				}
			}
		}

		return $data;
	}
}
