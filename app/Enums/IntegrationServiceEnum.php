<?php

namespace App\Enums;

use Nasyrov\Laravel\Enums\Enum;

class IntegrationServiceEnum extends Enum
{
	const ERPNext = 1;

	public function getStatusAttribute($attribute)
	{
		return new IntegrationServiceEnum($attribute);
	}

	public function ERPNext($module)
	{
		if ($module == "SalesInvoice") {
			// return [
			// 	{"number", "doc.name"},
			// 	{"partner_name", "doc.customer.name"}
			// ];
		} else ($module == "PurchaseInvoice"){
			// return [
			// 	{"number", "doc.name"},
			// 	{"partner_name", "doc.supplier.name"}
			// ];
		}
	}
}
