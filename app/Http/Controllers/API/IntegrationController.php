<?php

namespace App\Http\Controllers\API;

use App\Taxpayer;
use App\Cycle;
use App\Transaction;
use App\TransactionDetail;
use App\Http\Controllers\API\ErpNextController;
use App\Http\Controllers\ChartController;
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

	public function arandukaUpload(Request $request,Taxpayer $taxPayer,Cycle $cycle)
	{

		$transactionController = new TransactionController();
		$collection = collect();
		$results = collect($request["results"]);



			for ($i=0; $i <count($results[0]["data"]) ; $i++) {
					$data =collect();
				foreach ($results as $result) {
				$data->put($result["column"],$result["data"][$i]);
				}
					$collection->push($data);
			}



		$details = collect();
		$total = 0;



		foreach ($collection as $data)
	 {
			 $total = $total + $data["total"];
			 $transactionType = '';
			 $transactionSubType = 1;
			 if($data["document_type"] == 1)
			 {
				 $transactionType = $data["document_type"];
			 }
			 else
			 {
				 $transactionType = $data["document_type"];
			 }


			 $transaction =Transaction::where('partner_taxid',$data["partner_taxid"])->where('number',$data["number"])->first() ?? new Transaction();

			 $transaction->type = $transactionType;
			 $transaction->sub_type = $transactionSubType;
			 $transaction->taxpayer_id = $taxPayer->id;

			 $transaction->partner_name = $data["partner_name"];
			 $transaction->partner_taxid = $data["partner_taxid"];

			 //TODO, this is not enough. Remove Cycle, and exchange that for Invoice Date. Since this will tell you better the exchange rate for that day.
			 $transaction->currency = $taxPayer->currency;


			 $transaction->rate = $transactionController->checkCurrencyRate($transaction->currency, $taxPayer,$data["date"]) ?? 1;

			 $paymentCondition = '';
			 if($data["payment_condition"] == "contado")
			 {
				 $paymentCondition =0;
			 }
			 else {
				 $paymentCondition =1;
			 }
			 $transaction->payment_condition = $paymentCondition;
			 $transaction->date = $transactionController->convert_date($data["date"]);
			 if($transactionType == 11)
			 {
						$transaction->number = $data["receiptnumber"];
			 }
			 else
			 {
						$transaction->number = $data["number"];
			 }
			 $transaction->save();

				$transactiondetail = $this->processDetail(
				$transaction,
				$taxPayer,
				$cycle,$data
			);



		 return response()->json('Done');
	 }



	}

	public function processDetail(Transaction $transaction, Taxpayer $taxPayer, Cycle $cycle,$collection)
	{

		$chartController = new ChartController();
		$detail = new TransactionDetail();
		if($collection["sub_type"] == 'GPERS')
		{
			$chart_id = $chartController->createIfNotExists_ExpensesFromGPERS($taxPayer, $cycle, $collection["chart_name"] ?? '')->id;
		}
		else {
				$chart_id = $chartController->createIfNotExists_ExpensesFromCUOTA($taxPayer, $cycle, $collection["chart_name"] ?? '')->id;
		}


		$detail->transaction_id = $transaction->id;
		$detail->chart_id = $chart_id;
		$detail->value = $collection["total"];





		$detail->save();
		return $detail;


	}


}
