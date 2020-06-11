<?php

namespace App\Enums;

use Nasyrov\Laravel\Enums\Enum;

class TransactionTypeEnum extends Enum
{
    // const Invoice           = 1; //Sales or Purchases. You can tell which one by Supplier and Customer Relationship
    // const DebitNote         = 2; //Purchase Credit Note
    // const CreditNote        = 3; //Sales Credit Note
    // const CustomsClearence  = 4; //Importation / Exportation
    // const SelfInvoice       = 5; //Purchase
    // const Ticket            = 6;
    // const AirTicket         = 7;
    // const ForeignInvoices   = 8; //Purchase - Importation
    // //TODO Pankeel check these are important.
    // const Investments       = 9;
    // const Installments      = 10;

    const Invoice   =           1;
    const SelfInvoice =         2;
    const SalesReciept =        3;
    const CreditNote =          4;
    const Salary =              5;
    const WorkInsurance =       6;
    const BankTransaction =     8; //Local
    const BankTransfer =        9; //Transfer
    const ForeignInvoices =     10;
    const GovernmentInvoice =   11;
    const Ticket =              12;
    const CustomsClearence =    13;
    const Others =              14;

    const DebitNote =           15;

    public static function labels()
    {
        return static::constants()
        ->flip()
        ->map(function ($key) {
            // Place your translation strings in `resources/lang/en/enum.php`
            return trans(sprintf('enum.%s', strtolower($key)));
        })
        ->all();
    }
}
