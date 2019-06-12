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
		$url = strpos($request['url'], "http") ? $request['url'] : "http://" . $request['url'] ;
		$token = "token " . $request['api_key'] . ":" . $request['api_secrete'];
		$client = new \GuzzleHttp\Client();
		try {
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
		} catch (\Throwable $th) {
			return response()->json("Invalid Response",500);
		}
		
		

		//return true or false;
	}

	public function get(Request $request, Taxpayer $taxPayer, Cycle $cycle)
	{
		
		$url = strpos($request['url'], "http") ? $request['url'] : "http://" . $request['url'] ;
		$token = "token " . $request['api_key'] . ":" . $request['api_secrete'];
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

		$response = $client->request(
			'GET',
			$url . '/api/resource/Sales%20Invoice?fields=["name"]',
			[
				'headers' => [
					'Authorization'     => $token
				]
			]
		);

		$response = json_decode($response->getBody()->getContents());
		$response = collect($response->data);

		//mapping
		$mappings = include('Mapping/ErpNext.php');
		
		
		$models = collect();
	
		foreach ($response as $row) {
			$row=collect($row);
			$response = $client->request(
				'GET',
				$url . '/api/resource/Sales%20Invoice/'. $row['name'],
				[
					'headers' => [
						'Authorization'     => $token
					]
				]
			);
	
			$response = json_decode($response->getBody()->getContents());
			$row = collect($response->data);
		
			
			if ($request->module === 1) {
				$model = new \App\Transaction(); //controller based on model;
			}
			//return response()->json($mappings);
			foreach ($mappings as $map) {
				
				if(count($map['value']) === 1)
				{
					if ($map['value'] != '') {
						$model[$map['key']] = $row[$map['value']];
					}
					else{
						$model[$map['key']] = '';
					}
					
				}
				else
				{
					$details = collect();
					foreach ($row[$map['key']] as $data) 
					{
						$data = collect($data);
						if ($request->module === 1) {
							$modeldetail = new \App\TransactionDetail(); //controller based on model;
						}

						foreach ($map['value'] as $detailmap) 
						{
							if ($detailmap['value'] != '') {
							$modeldetail[$detailmap['key']] = $data[$detailmap['value']];
							}
							else{
								$modeldetail[$detailmap['key']] = '';
							}
						}

						$details->add($modeldetail);
					}
					$model['details'] = $details;
				}
			}
			
			$models->add($model);
		}

		return response()->json($models);
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
