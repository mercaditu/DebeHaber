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
		// if ($module == "SalesInvoice") {
		// 	return 
		// 		{ name: "Student login", value: "login1" },
		// 		{ name: "Student password", value: "password" }
		// 	;
		// }
		// else ($module == "PurchaseInvoice"){
			// return [
			// 	{"number", "doc.name"},
			// 	{"partner_name", "doc.supplier.name"}
			// ];
		}
	}
}
