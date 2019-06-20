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
		$client = new \GuzzleHttp\Client();

		return $client->request(
			'GET',
			$url,
			$header
		);
	}

	public function post(Request $request, $url, $header) {
		$client = new \GuzzleHttp\Client();
		return $client->request(
			'POST',
			$url,
			$header,
			$request
		);
	}

	 private function string_replace(Request $request, $source,$take) {
		$url = strpos($request['url'], "http") ? $request['url'] : "http://" . $request['url'] ;
		$source = str_replace('{{url}}', $url, $source);
		$source = str_replace('{{startDate}}', $request->startDate, $source);
		$source = str_replace('{{endDate}}', $request->endDate, $source);
		$source = str_replace('{{key}}', $request->api_key, $source);
		$source = str_replace('{{secret}}', $request->api_secrete, $source);
		$source = str_replace('{{pageLength}}', $take , $source);
		return $source;
	}

	public function integration(Request $request, Taxpayer $taxPayer, Cycle $cycle)
	{
		//1 ==sales 
		if($request->module === 1)
		{
			
			$location = '\\App\\Http\\Controllers\\API\\Integrations\\' . $request->templateName . '_Sales';
			$controller = app()->make($location);

			$controller->url = $this->string_replace($request, $controller->url,$controller::take);
			$controller->header['headers']['Authorization'] = $this->string_replace($request,$controller->header['headers']['Authorization'],$controller::take);
			
			
			$url = strpos($request['url'], "http") ? $request['url'] : "http://" . $request['url'] ;
			$data= $controller->callAction('pre_get', $parameters = [$request,$taxPayer,$cycle,$url]);
			
			//  $resourceLocation = '\\App\\Http\\Resources\\' . $request->templateName . '_Sales.php';
			
			//  $Apiresource = app()->make($resourceLocation);
			 return response()->json($data);
		}
	}
	public function store(Request $request, Taxpayer $taxPayer, Cycle $cycle)
	{
		$transaction = (new TransactionController())->start($request);
		return response()->json($transaction,200);
	}

	

	
}
