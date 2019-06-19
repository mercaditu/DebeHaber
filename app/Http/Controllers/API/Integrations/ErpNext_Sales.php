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

	 const take = 100;
	 public $url = '{{url}}/api/resource/Sales%20Invoice?limit_start={{pageStart}}&limit_page_length={{pageLength}}&fields=["name"]&filters=[["Sales Invoice","posting_date", ">","{{startDate}}"],["Sales Invoice","posting_date", "<","{{endDate}}"]]';
	 public $header = [
		 				'headers' => [
		 					'Authorization'     => 'token {{key}}:{{secret}}'
		 				]
					 ];
	 

	public function pre_get(Request $request, Taxpayer $taxPayer, Cycle $cycle,$url)
	{
			//write code to fetch data.

			//item
			//customer
			//sales data only names
			//sales full data

			$itemData = (new IntegrationController())->get($url . '/api/resource/Item/?limit_page_length=*&fields=["name","is_stock_item","is_fixed_asset"]', $this->header);
			$itemData = json_decode($itemData->getBody()->getContents());
			$itemData = collect($itemData->data);

			$customerData = (new IntegrationController())->get($url . '/api/resource/Customer/?limit_page_length=*&fields=["name","tax_id"]', $this->header);
			$customerData = json_decode($customerData->getBody()->getContents());
			$customerData = collect($customerData->data);

			

			$limit_Start = 0;
			$collection = collect();
			do {
				$salesurl = $this->url;
 				str_replace('{{pageStart}}', $limit_Start, $salesurl);
				$data = (new IntegrationController())->get($salesurl, $this->header);
				$data = json_decode($data->getBody()->getContents());
				$data = collect($data->data);
				
				foreach ($data as $row) 
				{
					$salesData = (new IntegrationController())->get($url . '/api/resource/Sales Invoice/' .  $row->name, $this->header);
					$salesData = json_decode($salesData->getBody()->getContents());
					$salesData = collect($salesData->data);
					$salesData = $this->map($taxPayer,$cycle,$customerData,$itemData,$salesData);
					$collection->add($salesData);
				}
				$limit_Start = $limit_Start + $this::take ;
		   } while ($data != '');
			
			return $collection;
	}

	
	public function map(Taxpayer $taxPayer, Cycle $cycle,$customers,$items,$row)
	{
			$model = new \App\Transaction();
			
			$customer = $customers->where('name',$row['customer_name'])->first();
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

			foreach ($row['items'] as $data) 
			{
				$data = collect($data);
				$detail = new \App\TransactionDetail();
				$salesitem=$items->where('name',$data['item_code'])->first();
				 if	($salesitem != null)
				 {
					if ($salesitem->is_stock_item == 1) {
						$detail->Type = 2;
						$detail->Name = 'Product';
					 }
					 elseif ($salesitem->is_fixed_asset == 0) {
						$detail->Type = 1;
						$detail->Name = 'Service';
	
					 }
					 else {
						$detail->Type = 3;
						$detail->Name = 'Fixed Asset';
					 }
					
					$detail->Value = $data['net_rate'];
					$detail->Cost = $data['base_rate'];
					
					$detail->VATPercentage = $row['taxes'][0]->rate;
					$model['Details'] = $detail;
				 }
			}
	
		return $model;
	}


}
