<?php

namespace App\Http\Controllers\API;

use App\Taxpayer;
use App\Cycle;
use App\Transaction;
use App\TransactionDetail;
use App\Http\Controllers\API\ErpNextController;
use Illuminate\Http\Request;
use Carbon\Carbon;

class IntegrationController extends Controller
{
	//module??
	//mapping??

	// public function test(Request $request, Taxpayer $taxPayer, Cycle $cycle)
	// {
	// 	$url = strpos($request['url'], "http") ? $request['url'] : "http://" . $request['url'] ;
	// 	$token = "token " . $request['api_key'] . ":" . $request['api_secrete'];
	// 	$client = new \GuzzleHttp\Client();
	// 	try {
	// 		$response = $client->request(
	// 			'GET',
	// 			$url . '/api/resource/Sales%20Invoice?fields=["*"]',
	// 			[
	// 				'headers' => [
	// 					'Authorization'     => $token
	// 				]
	// 			]
	// 		);
	// 		$response = $response->getBody()->getContents();
	// 		return response()->json($response);
	// 	} catch (\Throwable $th) {
	// 		return response()->json("Invalid Response",500);
	// 	}
	// 	//return true or false;
	// }

	public function get($url, $header) {
		return $client->request(
			'GET',
			$url,
			$header
		);
	}

	public function post(Request $request, $url, $header) {
		return $client->request(
			'POST',
			$url,
			$header,
			$request
		);
	}

	// public function get2(Request $request, Taxpayer $taxPayer, Cycle $cycle)
	// {		
	// 	//String cleanup
	// 	$url = strpos($request['url'], "http") ? $request['url'] : "http://" . $request['url'] ;
	// 	$client = new \GuzzleHttp\Client();

	// 	//wrong. very specific.
	// 	$token = "token " . $request['api_key'] . ":" . $request['api_secrete'];

	// 	$response = $client->request(
	// 		'GET',
	// 		$url . $urlSales,
	// 		[
	// 			'headers' => [
	// 				'Authorization' => $token
	// 			]
	// 		]
	// 	);
	// 	$items = json_decode($response->getBody()->getContents());
	// 	$items = collect($items->data);

	// 	$response = $client->request(
	// 		'GET',
	// 		$url . '/api/resource/Customer/?limit_page_length=1000&fields=["name","tax_id"]',
	// 		[
	// 			'headers' => [
	// 				'Authorization'     => $token
	// 			]
	// 		]
	// 	);
	// 	$customers = json_decode($response->getBody()->getContents());
	// 	$customers = collect($customers->data);
	
	// 	$limit_start = 0;
	// 	$limit_page_length = 20;
		
	
	// 		$response = $client->request(
	// 			'GET',
	// 			$url . '/api/resource/Sales%20Invoice?limit_start='. $limit_start .'&limit_page_length='. $limit_page_length .'&fields=["name"]&filters=[["Sales Invoice","posting_date", ">","' . Carbon::parse($request->start_date)->toDateString() . '"],["Sales Invoice","posting_date", "<","' . Carbon::parse($request->end_date)->toDateString() . '"]]',
	// 			[
	// 				'headers' => [
	// 					'Authorization'     => $token
	// 				]
	// 			]
	// 		);
			
	// 		$response = json_decode($response->getBody()->getContents());
	// 		$response = collect($response->data);
		
	// 		$models = collect();
	// 		foreach ($response as $row) {
	// 			$row=collect($row);
	// 			$response = $client->request(
	// 				'GET',
	// 				$url . '/api/resource/Sales%20Invoice/'. $row['name'],
	// 				[
	// 					'headers' => [
	// 						'Authorization'     => $token
	// 					]
	// 				]
	// 			);

	// 			$response = json_decode($response->getBody()->getContents());
	// 			$row = collect($response->data);
	// 			$app = app();
	// 			$controller = $app->make('\App\Http\Controllers\API\ErpNextController' );
	// 			$model= $controller->callAction('salesInvoice', $parameters = [$request, $taxPayer,$cycle,$items,$customers,$row]);

	// 			// $model = 
	// 			$models->add($model);
	// 		}
		
			
	// 	return response()->json($models);
	// }

	// public function store(Request $request, Taxpayer $taxPayer, Cycle $cycle)
	// {
	// 	$transaction = (new TransactionController())->start($request);
	// 	return response()->json($transaction,200);
	// }
}
