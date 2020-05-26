<?php

namespace App\Http\Controllers\API;

ini_set('memory_limit', '3000M');
ini_set('max_execution_time', '0');
use App\Taxpayer;
use App\Cycle;
use App\Transaction;
use App\TransactionDetail;
use Illuminate\Http\Request;
use Carbon\Carbon;

class TransactionController extends Controller
{
	public function start(Request $request)
	{
		$transactionData = array();
		$cycle = null;
		$taxPayer  = null;
		$chunkedData = $request;

		if (isset($chunkedData)) {
			$data = collect($chunkedData);
			$groupData = $data->groupBy(function ($q) {
				return Carbon::parse($q["Date"])->format('Y');
			});

			//groupby function group by year.
			foreach ($groupData as $groupedRow) {

				if ($groupedRow->first()['Type'] == 2) {
					$taxPayer = $this->checkTaxPayer($groupedRow->first()['SupplierTaxID'], $groupedRow->first()['SupplierName']);
				} else if ($groupedRow->first()['Type'] == 1) {
					$taxPayer = $this->checkTaxPayer($groupedRow->first()['CustomerTaxID'], $groupedRow->first()['CustomerName']);
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

						$data = $this->processTransaction($data, $taxPayer, $cycle);
						$data["Message"] = "Success";
						$transactionData[$i] = $data;
						$i = $i + 1;
					} catch (\Exception $e) {
						$data["Message"] = "Error loading transaction: " . $e;
						$transactionData[$i] = $data;
					}
				}
			}
		}

		return response()->json($transactionData);
	}

	public function processTransaction($data, Taxpayer $taxPayer, Cycle $cycle, $impexId = null)
	{
		$transactionType = $data['Type'];
		$transactionSubType = $data['SubType'];

		$transaction = Transaction::where('number', $data['Number'])
			->where(function ($query) use ($transactionType, $transactionSubType) {
				return $query->where('type', $transactionType)
					->where('sub_type', $transactionSubType);
			})
			->where('taxpayer_id', $taxPayer->id)
			->where('impex_id', $impexId)
			->whereDate('date', $this->convert_date($data['Date']))
			->first() ?? new Transaction();

		$transaction->type = $transactionType;
		$transaction->sub_type = $transactionSubType;
		$transaction->taxpayer_id = $taxPayer->id;
		$transaction->impex_id = $impexId;

		$transaction->partner_name = ($transactionType == 1) ? $data['SupplierName'] : $data['CustomerName'];
		$transaction->partner_taxid = ($transactionType == 1) ? $data['SupplierTaxID'] : $data['CustomerTaxID'];

		//TODO, this is not enough. Remove Cycle, and exchange that for Invoice Date. Since this will tell you better the exchange rate for that day.
		$transaction->currency = $data['CurrencyCode'] ?? $taxPayer->currency;

		if ($data['CurrencyRate'] ==  '') {
			// $currency_id = $this->checkCurrency($data['CurrencyCode'], $taxPayer);
			$transaction->rate = $this->checkCurrencyRate($transaction->currency, $taxPayer, $data['Date']) ?? 1;
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
						$percentage = $details->sum('Value') / $totalValue;
						$discountOnRow = $percentage * $totalDiscount;
					}

					$chart_id = $this->checkChart($groupedRowsByType[0]['Type'], $groupedRowsByType[0]['Name'], $taxPayer, $cycle, $transaction->type);

					$detail = TransactionDetail::where('chart_id', $chart_id)->where('transaction_id', $transaction->id)->first() ?? new TransactionDetail();

					$detail->transaction_id = $transaction->id;
					$detail->chart_id = $chart_id;
					$detail->value = $groupedRowsByType->sum('Value') - $discountOnRow;

					$detail->cost = $groupedRowsByType[0]['Cost'] *  $transaction->rate;

					//This prevents 0% or null references from searching and/or creating false accounts.
					if (isset($groupedRowsByType[0]['VATPercentage']) && $groupedRowsByType[0]['VATPercentage'] > 0) {
						if (($transaction->type == 1 && $transaction->sub_type == 1) || ($transaction->type == 2 && $transaction->sub_type == 2)) {
							$detail->chart_vat_id = $this->checkCreditVAT($groupedRowsByType[0]['VATPercentage'], $taxPayer, $cycle);
						} elseif (($transaction->type == 2 && $transaction->sub_type == 1) || ($transaction->type == 1 && $transaction->sub_type == 2)) {
							$detail->chart_vat_id = $this->checkDebitVAT($groupedRowsByType[0]['VATPercentage'], $taxPayer, $cycle);
						}
					}

					$detail->save();
				}
			}
		}
	}

	/**
	 * Generates one journal for all sales in date range.
	 */
	public function generate_Journals($startDate, $endDate, $taxPayer, $cycle)
	{
		\DB::connection()->disableQueryLog();

		$journal = \App\Journal()->firstOrNew([
			'cycle_id' => $cycle->id,
			'date' => $endDate,
			'is_automatic' => 1,
			'module' => 1
		])->with('details');

		//Clean up details by placing 0. this will allow cleaner updates and know what to delete.
		foreach ($journal->details() as $detail) {
			$detail->credit = 0;
			$detail->debit = 0;
		}

		$comment = __('accounting.SalesBookComment', ['startDate' => $startDate->toDateString(), 'endDate' => $endDate->toDateString()]);
		$journal->cycle_id = $cycle->id; //TODO: Change this for specific cycle that is in range with transactions
		$journal->date = $endDate;
		$journal->comment = $comment;
		$journal->is_automatic = 1;
		$journal->save();

		$chartController = new ChartController();

		//Sales Transactionsd done in cash. Must affect direct cash account.
		$salesInCash = Transaction::MySalesForJournals($startDate, $endDate, $taxPayer->id)
			->join('transaction_details', 'transactions.id', '=', 'transaction_details.transaction_id')
			->groupBy('rate', 'chart_account_id')
			->where('payment_condition', '=', 0)
			->select(
				DB::raw('max(rate) as rate'),
				DB::raw('max(chart_account_id) as chart_account_id'),
				DB::raw('sum(transaction_details.value) as total')
			)
			->get();

		//run code for cash sales (insert detail into journal)
		foreach ($salesInCash as $row) {
			// search if chart exists, or else create it. we don't want an error causing all transactions not to be accounted.
			$accountChartID = $row->chart_account_id ?? $chartController->createIfNotExists_CashAccounts($taxPayer, $cycle, $row->chart_account_id)->id;

			$detail = $journal->details()->firstOrNew(['chart_id' => $accountChartID]);
			$detail->credit += $row->total * $row->rate;
			$detail->chart_id = $accountChartID;
			$journal->details()->add($detail);
		}

		//2nd Query: Sales Transactions done in Credit. Must affect customer credit account.
		$creditSales = Transaction::MySalesForJournals($startDate, $endDate, $taxPayer->id)
			->join('transaction_details', 'transactions.id', '=', 'transaction_details.transaction_id')
			->groupBy('rate')
			->groupBy('partner_taxid')
			->where('payment_condition', '>', 0)
			->select(
				DB::raw('max(rate) as rate'),
				DB::raw('max(partner_taxid) as partner_taxid'),
				DB::raw('sum(transaction_details.value) as total')
			)
			->get();


		//run code for credit sales (insert detail into journal)
		foreach ($creditSales as $row) {
			$customerChartID = $chartController->createIfNotExists_AccountsReceivables($taxPayer, $cycle, $row->partner_taxid, $row->partner_name)->id;

			$detail = $journal->details()->firstOrNew(['chart_id' => $customerChartID]);
			$detail->credit += $row->total * $row->rate;
			$detail->chart_id = $customerChartID;
			$journal->details()->add($detail);
		}

		//one detail query, to avoid being heavy for db. Group by fx rate, vat, and item type.
		$detailAccounts = Transaction::MySalesForJournals($startDate, $endDate, $taxPayer->id)
			->join('transaction_details', 'transactions.id', '=', 'transaction_details.transaction_id')
			->leftJoin('charts', 'charts.id', '=', 'transaction_details.chart_vat_id')
			->groupBy('rate', 'transaction_details.chart_id', 'transaction_details.chart_vat_id')
			->select(
				DB::raw('max(rate) as rate'),
				DB::raw('max(charts.coefficient) as coefficient'),
				DB::raw('max(transaction_details.chart_vat_id) as chart_vat_id'),
				DB::raw('max(transaction_details.chart_id) as chart_id'),
				DB::raw('sum(transaction_details.value) as total')
			)
			->get();

		//run code for credit sales (insert detail into journal)
		foreach ($detailAccounts as $row) {
			$coefficient = $row->coefficient ?? 0;
			$detail = $journal->details()->firstOrNew(['chart_id' =>  $row->chart_id]);
			$detail->debit += ($row->total - ($row->total / (1 + $coefficient))) * $row->rate;
			$detail->chart_id = $row->chart_id;
			$journal->details()->add($detail);

			if ($row->coefficient > 0) {
				$vatDetail = $journal->details()->firstOrNew(['chart_id' =>  $row->chart_id]);
				$vatDetail->debit += ($row->total / (1 + $row->coefficient)) * $row->rate;
				$vatDetail->chart_id = $row->chart_vat_id;
				$journal->details()->add($vatDetail);
			}
		}

		//delete where credit and debit == 0. This will clean up old charts that were used, but not in new.
		$journal->details()->where('debit', 0)->where('credit', 0)->delete();
		$journal->save();
	}



	public function upload_transaction(Request $request,Taxpayer $taxPayer, Cycle $cycle)
	{
		$transactions = [];
		$Jsondata=collect($request);
		for ($i=0; $i < count($Jsondata[0]['data']) ; $i++)
		{
			$transaction = new Transaction();
			$transaction->taxpayer_id = $taxPayer->id;
			array_push($transactions, $transaction);
		}

	   foreach(collect($request) as $row)
	   {

		  for ($i=0; $i <count($row['data']) ; $i++)
		  {
			$transactions[$i][$row['column']] = $row['data'][$i];
		  }

	   }

	   foreach ($transactions as $transaction) {
		$transaction->save();
	   }
	   return response()->json($transactions[0]);

	}

	public function uploadErpNext_sales(Request $request,Taxpayer $taxPayer, Cycle $cycle)
	{
		$transactions = [];
		$Jsondata=collect($request);



		foreach ($Jsondata as $data) {
			$transaction = Transaction::where('number', $data['name'])
			->where(function ($query)  {
				return $query->where('type', 2)
					->where('sub_type', 1);
			})
			->where('taxpayer_id', $taxPayer->id)
			->whereDate('date', $this->convert_date($data['transaction_date']))
			->first() ?? new Transaction();

			$transaction->type = 2;
			$transaction->sub_type = 1;
			$transaction->taxpayer_id = $taxPayer->id;

			$transaction->partner_name = $data['customer_name'];
			//$transaction->partner_taxid = $data['CustomerTaxID'];

			//TODO, this is not enough. Remove Cycle, and exchange that for Invoice Date. Since this will tell you better the exchange rate for that day.
			$transaction->currency = $data['currency'] ?? $taxPayer->currency;

			if ($data['CurrencyRate'] ==  '') {
				// $currency_id = $this->checkCurrency($data['CurrencyCode'], $taxPayer);
				$transaction->rate = $this->checkCurrencyRate($transaction->currency, $taxPayer, $data['Date']) ?? 1;
			} else {
				$transaction->rate = $data['conversion_rate'];
			}


			$transaction->date = $this->convert_date($data['transaction_date']);
			$transaction->number = $data['name'];
			$transaction->code = $data['Code'] != '' ? $data['Code'] : null;
			$transaction->code_expiry = $data['CodeExpiry'] != '' ? $this->convert_date($data['CodeExpiry'])  : null;
			$transaction->comment = $data['Comment'] ?? '';
			$transaction->save();

			 foreach ($data['items'] as $item) {
				 $type=0;
				 if ($item['is_stock_item'] == 1) {
					 $type=2;
				 }
				 elseif ($item['is_fixed_asset'] == 0) {
					$type=1;
				 }
				 else {
					$type=3;
				 }
				$chart_id = $this->checkChart($type, $item['item_name'], $taxPayer, $cycle,2);
				$detail = TransactionDetail::where('chart_id', $chart_id)->where('transaction_id', $transaction->id)->first() ?? new TransactionDetail();

				$detail->transaction_id = $transaction->id;
				$detail->chart_id = $chart_id;
				$detail->value = $item['net_amount'];
				$detail->cost = $item['base_rate'];

				//This prevents 0% or null references from searching and/or creating false accounts.
				// if (isset($groupedRowsByType[0]['VATPercentage']) && $groupedRowsByType[0]['VATPercentage'] > 0) {
				// 	if (($transaction->type == 1 && $transaction->sub_type == 1) || ($transaction->type == 2 && $transaction->sub_type == 2)) {
				// 		$detail->chart_vat_id = $this->checkCreditVAT($groupedRowsByType[0]['VATPercentage'], $taxPayer, $cycle);
				// 	} elseif (($transaction->type == 2 && $transaction->sub_type == 1) || ($transaction->type == 1 && $transaction->sub_type == 2)) {
				// 		$detail->chart_vat_id = $this->checkDebitVAT($groupedRowsByType[0]['VATPercentage'], $taxPayer, $cycle);
				// 	}
				// }

				$detail->save();
			 }



		}
	}
}
