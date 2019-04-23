<?php

namespace App\Http\Controllers\API;

use App\Taxpayer;
use App\Cycle;
use App\Impex;
use App\ImpexExpense;
use App\Transaction;
use App\TransactionDetail;
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
				if ($groupedRow->first()['Type']== 1) {
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
		$impex->partner_name = ($data['Type']== 1 ) ? $data['SupplierName'] : $data['CustomerName'];
		$impex->partner_taxid = ($data['Type'] == 1) ? $data['SupplierTaxID'] : $data['CustomerTaxID'];
		$impex->taxpayer_id = $taxPayer->id;
		$impex->code = $data['Number'] ?? '';
		$impex->comment = $data['comment'] ?? '';
		$impex->is_import = $data['IsImpex'] ?? true;

		$impex->type = substr($data['Incoterm'], 0, 4);
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
			$invoice = $this->processInvoice($invoice, $impex, $taxPayer, $cycle);
			$data['Invoices'][$i] = $invoice;
			$i = $i + 1;
		}

		//Assign expenses . . .
		$expenses = collect($data['Expenses']);
		foreach ($expenses as $expense) {
			$chartId = $this->checkChart($expense['Type'], $expense['Name'], $taxPayer, $cycle, 1);

			$impexExpense = ImpexExpense::where('chart_id', $chartId)
				->where('impex_id', $impex->id)
				->first() ?? new ImpexExpense();

			if ($chartId > 0) {
				$impexExpense->impex_id = $impex->id;
				$impexExpense->chart_id = $chartId;
				$impexExpense->value += $expense['Value'];
				$impexExpense->currency = $expense['CurrencyCode'];
				$impexExpense->rate = $expense['CurrencyRate'];
				try {
					$impexExpense->save();
				} catch (\Exception $e) {
					dd($e);
				}
			}
		}

		return $data;
	}

	public function processInvoice($data, Impex $impex, Taxpayer $taxPayer, Cycle $cycle)
	{
		$transactionType = $data['Type'];
		$transactionSubType = $data['SubType'];

		$transaction = Transaction::where('number', $data['Number'])
			->where('type', $transactionType)
			->where('sub_type', $transactionSubType)
			->where('impex_id', $impex->id)
			->where('taxpayer_id', $taxPayer->id)
			->first() ?? new Transaction();

		$transaction->type = $transactionType;
		$transaction->sub_type = $transactionSubType;
		$transaction->taxpayer_id = $taxPayer->id;
		$transaction->impex_id = $impex->id;
		$transaction->partner_name = ($transactionType == 1) ? $data['SupplierName'] : $data['CustomerName'];
		$transaction->partner_taxid = ($transactionType == 1) ? $data['SupplierTaxID'] : $data['CustomerTaxID'];

		//TODO, this is not enough. Remove Cycle, and exchange that for Invoice Date. Since this will tell you better the exchange rate for that day.
		$transaction->currency = $data['CurrencyCode'] ?? $taxPayer->currency;

		if ($data['CurrencyRate'] ==  '' || $data['CurrencyRate'] == 0) {
			$transaction->rate = $this->checkCurrencyRate($data['CurrencyCode'], $taxPayer, $data['Date']) ?? 1;
		} else {
			$transaction->rate = $data['CurrencyRate'];
		}

		$transaction->payment_condition = $data['PaymentCondition'];
		$transaction->date = $this->convert_date($data['Date']);
		$transaction->number = $data['Number'];
		$transaction->code = $data['Code'] != '' ? $data['Code'] : null;
		$transaction->code_expiry = $data['CodeExpiry'] != '' ? $this->convert_date($data['CodeExpiry'])  : null;
		$transaction->comment = $data['Comment'];
		$transaction->save();

		//Process details of the invoice.
		$this->processDetail(
			collect($data['Details']),
			$transaction,
			$taxPayer,
			$cycle
		);

		$data['cloud_id'] = $transaction->id;
		return $data;
	}

	public function processDetail($details, Transaction $transaction, Taxpayer $taxPayer, Cycle $cycle)
	{
		//???
		$totalDiscount = $details->where('Value', '<', 0)->sum('Value');
		$totalValue = $details->where('Value', '>', 0)->sum('Value') != 0 ?
			$details->where('Value', '>', 0)->sum('Value') : 1;

		//TODO to reduce data stored, group by VAT and Chart Type.
		//If 5 rows can be converted into 1 row it is better for our system's health and reduce server load.
		foreach ($details->groupBy('VATPercentage') as $groupedRowsByVat) {
			foreach ($groupedRowsByVat->groupBy('Type') as $groupedRowsByType) {

				if ($groupedRowsByType[0]['Value'] > 0) {
					//Code for Row Level Discounts in certain transactions
					$discountOnRow = 0;
					if ($totalDiscount > 0) {
						$percentage = $details->sum('value') / $totalValue;
						$discountOnRow = $percentage * $totalDiscount;
					}

					$chart_id = $this->checkChart($groupedRowsByType[0]['Type'], $groupedRowsByType[0]['Name'], $taxPayer, $cycle, $transaction->type);

					$detail = TransactionDetail::where('chart_id', $chart_id)->where('transaction_id', $transaction->id)->first() ?? new TransactionDetail();

					$detail->transaction_id = $transaction->id;
					$detail->chart_id = $chart_id;

					if (isset($groupedRowsByType[0]['VATPercentage'])) {
						if (($transaction->type == 1 && $transaction->sub_type == 1) || ($transaction->type == 2 && $transaction->sub_type == 2)) {
							$detail->chart_vat_id = $this->checkCreditVAT($groupedRowsByType[0]['VATPercentage'], $taxPayer, $cycle);
						} elseif (($transaction->type == 2 && $transaction->sub_type == 1) || ($transaction->type == 1 && $transaction->sub_type == 2)) {
							$detail->chart_vat_id = $this->checkDebitVAT($groupedRowsByType[0]['VATPercentage'], $taxPayer, $cycle);
						}
					}

					$detail->value = $groupedRowsByType->sum('Value') - $discountOnRow;

					$detail->save();
				}
			}
		}
	}
}
