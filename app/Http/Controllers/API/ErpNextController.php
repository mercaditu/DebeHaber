<?php

namespace App\Http\Controllers\API;

use App\Taxpayer;
use App\Cycle;
use App\Transaction;
use App\TransactionDetail;
use Illuminate\Http\Request;
use Carbon\Carbon;
use DateTime;

class ErpNextController extends Controller
{
	

	public function salesInvoice(Request $request, Taxpayer $taxPayer, Cycle $cycle,$items,$customers,$row)
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
			$model->CodeExpiry = $row['due_date'];
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
	
		return $model;
	}


}
