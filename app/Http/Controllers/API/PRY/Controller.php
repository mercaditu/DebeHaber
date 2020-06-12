<?php

namespace App\Http\Controllers\API\PRY;

use App\TaxpayerIntegration;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    const ARANDUKA_MAP = [
        1 => 1,
        2 => 5,
        3 => 6,
        4 => 3,
        5 => 12,
        6 => 13,
        7 => 14,
        8 => 15,
        9 => 16,
        10 => 8,
        11 => 17,
        12 => 6,
        13 => 4,
        14 => 18,
    ];

    public function calculateTaxCode($taxID)
    {
        $base_max = 11;
        $arrayTaxID = str_split($taxID);
        $n = count($arrayTaxID);

        $suma = 0;
        $k = 2;

        for ($i = $n - 1; $i >= 0; $i--) {
            if (is_numeric($arrayTaxID[$i])) {
                $k = $k > $base_max ? 2 : $k;
                $suma += ($arrayTaxID[$i] * $k++);
            }
        }

        $v_resto = $suma % 11;
        $code = $v_resto > 1 ? 11 - $v_resto : 0;
        return $code;
    }

    public function splitTaxCode($taxID)
    {
        $stringParts =  explode("-", $taxID);
        return count($stringParts) > 1 ? $stringParts[1] : '';
    }

    public function cleanTaxCode($taxID)
    {
        return strtok($taxID, '-');
    }
}
