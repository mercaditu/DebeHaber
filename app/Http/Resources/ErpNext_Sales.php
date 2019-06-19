<?php

namespace App\Http\Resources;

use App\Http\Resources\ErpNextDetailResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ErpNext_Sales extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return parent::toArray($request);
        // return [
        //     'Type' => '',
        //     'SubType' => '',
        //     'CustomerName' => $this->customer_name,
        //     'CustomerTaxID' => '',
        //     'SupplierName' => '',
        //     'SupplierTaxID' => '',
        //     'Date' => $this->posting_date,
        //     'Number' => $this->name,
        //     'Code' => '',
        //     'CodeExpiry' => '',
        //     'PaymentCondition' => '',
        //     'CurrencyCode' => $this->currency,
        //     'CurrencyRate' => $this->conversion_rate,
        //     'Comment' => '',
        //     'details' => ErpNextDetailResource::collection($this->whenLoaded('items')),
        // ];
    }

   
}
