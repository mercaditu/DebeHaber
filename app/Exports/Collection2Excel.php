<?php
namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\Exportable;

class Collection2Excel implements FromArray
{
    use Exportable;

    public $data;

    public function __construct($data = "")
    {
      $this->data = $data;
    }
    public function array(): array
    {
        return $this->data;
    }
}
