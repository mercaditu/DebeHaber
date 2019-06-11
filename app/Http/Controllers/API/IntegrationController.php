<?php

namespace App\Http\Controllers\API;

use App\Taxpayer;
use App\Cycle;
use App\Transaction;
use App\TransactionDetail;
use Illuminate\Http\Request;
use Carbon\Carbon;

class IntegrationController extends Controller
{
	//module??
	//mapping??

	public function test(Request $request, Taxpayer $taxPayer, Cycle $cycle)
	{
		$url = strpos($request['url'], "http") ? "http://" . $request['url'] : $request['url'];
		$token = "token " . $request['key'] . ":" . $request['secrete'];
		$client = new \GuzzleHttp\Client();

		$response = $client->request(
			'GET',
			$url . '/api/resource/Sales%20Invoice?fields=["*"]',
			[
				'headers' => [
					'Authorization'     => $token
				]
			]
		);
		$response = $response->getBody()->getContents();
		return response()->json($response);

		//return true or false;
	}

	public function get(Request $request, Taxpayer $taxPayer, Cycle $cycle)
	{
		$url = strpos($request['url'], "http") ? "http://" . $request['url'] : $request['url'];
		$token = "token " . $request['key'] . ":" . $request['secrete'];
		$client = new \GuzzleHttp\Client();

		$response = $client->request(
			'GET',
			$url . '/api/resource/Sales%20Invoice?fields=["*"]',
			[
				'headers' => [
					'Authorization'     => $token
				]
			]
		);

		$response = $response->getBody()->getContents();

		//mapping
		$model = "Model Name"; //controller based on model;
		foreach ($response as $row) {
			foreach ($mapping as $map) {
				$model[$map->key] = $row[$map->value];
			}
		}

		return response()->json($response);
	}

	public function store(Request $request, Taxpayer $taxPayer, Cycle $cycle)
	{
		$transactions = [];
		$url = "http://"  .  $request['url'];
		$token = "token " . $request['key'];
		$Jsondata = collect($request);
		$client = new \GuzzleHttp\Client();

		$response = $client->request(
			'GET',
			$url . '/api/resource/Item/?limit_page_length=1000&fields=["name","is_stock_item","is_fixed_asset"]',
			[
				'headers' => [
					'Authorization'     => $token
				]
			]
		);
		$items = json_decode($response->getBody()->getContents());
		$items = collect($items->data);

		foreach ($Jsondata['SalesNumber'] as $sales) {
			$response = $client->request(
				'GET',
				$url . "/api/resource/Sales Invoice/" . $sales['name'],
				[
					'headers' => [
						'Authorization'     => $token
					]
				]
			);
			$response = json_decode($response->getBody()->getContents());


			foreach ($response as $data) {
				$transaction = Transaction::where('number', $data->name)
					->where(function ($query) {
						return $query->where('type', 2)
							->where('sub_type', 1);
					})
					->where('taxpayer_id', $taxPayer->id)
					->whereDate('date', $this->convert_date($data->posting_date))
					->first() ?? new Transaction();

				$transaction->type = 2;
				$transaction->sub_type = 1;
				$transaction->taxpayer_id = $taxPayer->id;

				$transaction->partner_name = $data->customer_name;

				//TODO, this is not enough. Remove Cycle, and exchange that for Invoice Date. Since this will tell you better the exchange rate for that day.
				$transaction->currency = $data->currency ?? $taxPayer->currency;

				if ($data->conversion_rate ==  '') {
					// $currency_id = $this->checkCurrency($data->CurrencyCode'], $taxPayer);
					$transaction->rate = $this->checkCurrencyRate($transaction->currency, $taxPayer, $data->Date) ?? 1;
				} else {
					$transaction->rate = $data->conversion_rate;
				}


				$transaction->date = $this->convert_date($data->posting_date);
				$transaction->number = $data->name;
				//$transaction->code = $data->Code != '' ? $data->Code : null;
				//$transaction->code_expiry = $data->CodeExpiry != '' ? $this->convert_date($data->CodeExpiry)  : null;
				$transaction->comment = $data->Comment ?? '';
				$transaction->save();

				foreach ($data->items as $item) {

					$salesitem = $items->where('name', $item->item_code)->first();
					$type = 1;
					if ($salesitem->is_stock_item == 1) {
						$type = 2;
					} elseif ($salesitem->is_fixed_asset == 0) {
						$type = 1;
					} else {
						$type = 3;
					}

					$chart_id = $this->checkChart($type, $item->item_name, $taxPayer, $cycle, 2);
					$detail = TransactionDetail::where('chart_id', $chart_id)->where('transaction_id', $transaction->id)->first() ?? new TransactionDetail();

					$detail->transaction_id = $transaction->id;
					$detail->chart_id = $chart_id;
					$detail->value = $item->net_amount;
					$detail->cost = $item->base_rate;
					//$detail->chart_vat_id = $this->checkDebitVAT($groupedRowsByType[0]['VATPercentage'], $taxPayer, $cycle);

					$detail->save();
				}
			}
		}
	}
}
