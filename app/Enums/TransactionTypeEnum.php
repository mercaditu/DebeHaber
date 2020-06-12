<?php

namespace App\Enums;

use Nasyrov\Laravel\Enums\Enum;

class TransactionTypeEnum extends Enum
{
    const Invoice           = 1; //Sales or Purchases. You can tell which one by Supplier and Customer Relationship
    const DebitNote         = 2; //Purchase Credit Note
    const CreditNote        = 3; //Sales Credit Note
    const CustomsClearence  = 4; //Importation / Exportation
    const SelfInvoice       = 5; //Purchase
    const Ticket            = 6;
    const AirTicket         = 7;
    const ForeignInvoices   = 8; //Purchase - Importation
    //TODO Pankeel check these are important.
    const Investments       = 9;
    const Installments      = 10;
    const SalesReciept      = 11;
    const Salary            = 12;
    const WorkInsurance     = 13;
    const BankCardTransaction = 14;
    const BankTransaction   = 15; //Local
    const BankTransfer      = 16; //Transfer
    const GovernmentInvoice = 17;
    const Others            = 18;

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
