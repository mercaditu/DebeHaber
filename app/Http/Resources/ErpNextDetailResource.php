<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ErpNextDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'Type' => '',
            'Name ' => '',
            'Value ' => $this->net_rate,
            'Cost ' => $this->base_rate,
            'VATPercentage ' => '',
        ];
    }
}
