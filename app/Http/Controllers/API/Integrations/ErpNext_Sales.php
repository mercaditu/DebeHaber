<?php

namespace App\Http\Controllers\API\Integrations;

use App\Taxpayer;
use App\Cycle;
use App\Transaction;
use App\TransactionDetail;
use App\Http\Controllers\API\IntegrationController;
use Illuminate\Http\Request;
use Carbon\Carbon;
use DateTime;

class ErpNext_Sales extends Controller
{

	 const take = 20;
	 public $url = '{{url}}/api/resource/Sales%20Invoice?limit_start={{pageStart}}&limit_page_length={{pageLength}}&fields=["name","customer_name"]&filters=[["Sales Invoice","posting_date", ">=","{{startDate}}"],["Sales Invoice","posting_date", "<=","{{endDate}}"]]';
	 public $header = [
		 				'headers' => [
		 					'Authorization'     => 'token {{key}}:{{secret}}'
		 				]
					 ];
	 

	public function pre_get(Request $request, Taxpayer $taxPayer, Cycle $cycle,$url)
	{
		$collection = collect();
		
		$salesurl = $this->url;
		$salesurl = str_replace('{{pageStart}}', $request->limit_Start, $salesurl);
		
		$data = (new IntegrationController())->get($salesurl, $this->header);
		$data = json_decode($data->getBody()->getContents());
		$data = collect($data->data);
		$customers='';
		foreach ($data as $row) 
		{
			$customers = $customers . $row->customer_name . ",";
		}
		$customers=substr_replace($customers ,"",-1);
			
		$customerData = (new IntegrationController())->get($url . '/api/resource/Customer/?fields=["name","tax_id"]&filters=[["Customer","name", "in","['. $customers .  ']"]]', $this->header);	
		$customerData = json_decode($customerData->getBody()->getContents());
		$customerData = collect($customerData->data);
						
		foreach ($data as $row) 
		{
			$salesData = (new IntegrationController())->get($url . '/api/resource/Sales Invoice/' .  $row->name, $this->header);
			$salesData = json_decode($salesData->getBody()->getContents());
			$salesData = collect($salesData->data);
				
			$salesData = $this->map($taxPayer,$cycle,$customerData,$salesData);
			$collection->add($salesData);
		}
		
			
		return $collection;
	}

	
	public function map(Taxpayer $taxPayer, Cycle $cycle,$customers,$row)
	{
		    $customer = $customers->where('name',$row['customer_name'])->first();
			$model = new \App\Transaction();
			$model->Type = 2;
			$model->SubType = 1;
			$model->CustomerName = $row['customer_name'];
			$model->CustomerTaxID = $customer->tax_id ?? '';
			$model->SupplierName = $taxPayer->name;
			$model->SupplierTaxID = $taxPayer->taxid;
			$model->Date = $row['posting_date'];
			$model->Number = $row['name'];
			$model->Code = '';
			$model->CodeExpiry = '';
			$datetime1 = new DateTime($row['posting_date']);
			$datetime2 = new DateTime($row['due_date']);
			$interval = $datetime1->diff($datetime2);
			$days = $interval->format('%a');//now do whatever you like with $days
			$model->PaymentCondition = $days;
			$model->CurrencyCode = $row['currency'];
			$model->CurrencyRate = $row['conversion_rate'];
			$model->Comment = '';

			$details = collect();
			foreach ($row['items'] as $data) 
			{
				$data = collect($data);
				$detail = new \App\TransactionDetail();
			
				//  if	($salesitem != null)
				//  {
				// 	if ($salesitem->is_stock_item == 1) {
						$detail->Type = 2;
						$detail->Name = 'Product';
					//  }
					//  elseif ($salesitem->is_fixed_asset == 0) {
					// 	$detail->Type = 1;
					// 	$detail->Name = 'Service';
	
					//  }
					//  else {
					// 	$detail->Type = 3;
					// 	$detail->Name = 'Fixed Asset';
					//  }
					
					$detail->Value = $data['net_rate'];
					$detail->Cost = $data['base_rate'];
					
					$detail->VATPercentage = $row['taxes'][0]->rate;
					$details->add($detail);
				//  }
			}
			$model['Details'] = $details;
		return $model;
	}


}
