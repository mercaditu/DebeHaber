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

    public function getArandukaDocumentText($key) {
        if($key == 1){
            return 'Factura';
        } elseif ($key == 2) {
            return 'Autofactura';
        } elseif ($key == 3) {
            return 'Boleta de Venta';
        } elseif ($key == 4) {
            return 'Nota de Crédito';
        } elseif ($key == 5) {
            return 'Liquidación de Salarios';
        } elseif ($key == 6) {
            return 'Extracto de Cuenta IPS';
        } elseif ($key == 7) {
            return 'Extracto de Tarjeta de Crédito/Tarjeta de Débito';
        } elseif ($key == 8) {
            return 'Extracto de Cuenta (cuando no exista la obligación de emitir comprobantes de venta)';
        } elseif ($key == 9) {
            return 'Transferencias o Giros Bancarios / Boleta de Depósito';
        } elseif ($key == 10) {
            return 'Comprobante del Exterior Legalizado';
        }elseif ($key == 11) {
            return 'Comprobante de Ingreso de Entidades Públicas, Religiosas o de Beneficio Público';
        }elseif ($key == 12) {
            return 'Ticket (Máquina Registradora)';
        }elseif ($key == 13) {
            return 'Despacho de Importación';
        }elseif ($key == 14) {
            return 'Otros comprobantes de venta que respaldan los egresos (pasaje aéreos, entradas a espectáculos públicos, boletos de transporte público) o cuando no exista la obligación de emitir comprobantes de venta';
        }
    }
}
