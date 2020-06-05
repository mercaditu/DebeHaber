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
		$results = collect($request["results"]);
		$total = 0;



		foreach ($results as $data)
	 {
			 $total = $total + $data["Monto Total"];
			 $transactionType = '';
			 $transactionSubType = 1;
			 if($data["Tipo de Documento"] == 1)
			 {
				 $transactionType = $data["Tipo de Documento"];
			 }
			 else
			 {
				 $transactionType = $data["Tipo de Documento"];
			 }
       $transaction =null;
			 if(isset($data["Número de Documento"]))
			 {
				  $transaction =Transaction::where('partner_taxid',$data["Número de Identificación"])->where('number',$data["Número de Documento"])->first() ?? new Transaction();
			 }
			 else {
			  $transaction = Transaction::where('partner_taxid',$data["Número de Identificación"])->where('number',$data["Número de Documento_1"])->first() ?? new Transaction();
			 }


			 $transaction->type = $transactionType;
			 $transaction->sub_type = $transactionSubType;
			 $transaction->taxpayer_id = $taxPayer->id;

			 $transaction->partner_name = $data["Nombres y Apellidos o Razón Social"];
			 $transaction->partner_taxid = $data["Número de Identificación"];

			 //TODO, this is not enough. Remove Cycle, and exchange that for Invoice Date. Since this will tell you better the exchange rate for that day.
			 $transaction->currency = $taxPayer->currency;


			 $transaction->rate = $transactionController->checkCurrencyRate($transaction->currency, $taxPayer,$data["Fecha"]) ?? 1;

			 $paymentCondition = '';
			 if(isset($data["Condición de la Venta"]))
			 {
				  if($data["Condición de la Venta"] == "contado")
					{
						$paymentCondition =0;
					}
					else {
						$paymentCondition =1;
					}
			 }
			 else {
			 	$paymentCondition =1;
			 }

			 $transaction->payment_condition = $paymentCondition;
			 $transaction->date = $transactionController->convert_date($data["Fecha"]);

			 if($transactionType == 11)
			 {
						$transaction->number = $data["Número de Documento_1"]??'';
			 }
			 else
			 {
				 	  $transaction->code = $data["Número de Timbrado"] ?? '';
						$transaction->number = $data["Número de Documento"] ?? '';

			 }
			 $transaction->save();

				$transactiondetail = $this->processDetail(
				$transaction,
				$taxPayer,
				$cycle,$data
			);

	 }

	 return response()->json('Done');

	}

	public function processDetail(Transaction $transaction, Taxpayer $taxPayer, Cycle $cycle,$collection)
	{
		$transaction->details()->delete();

		$chartController = new ChartController();
		if($collection["Clasificación de Egreso"] == 'GPERS')
		{
			$chart_id = $chartController->createIfNotExists_ExpensesFromGPERS($taxPayer, $cycle, $collection["Clasificación de Egreso (Texto)"] ?? '')->id;
		}
		else {
				$chart_id = $chartController->createIfNotExists_ExpensesFromCUOTA($taxPayer, $cycle, $collection["Clasificación de Egreso (Texto)"] ?? '')->id;
		}

		$detail = new TransactionDetail();
		$detail->transaction_id = $transaction->id;
		$detail->chart_id = $chart_id;
		$detail->value = $collection["Monto Total"];
		$detail->save();
		return $detail;
	}
}
