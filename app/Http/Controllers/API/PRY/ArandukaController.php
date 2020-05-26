<?php

namespace App\Http\Controllers\API\PRY;

ini_set('memory_limit', '3000M');
ini_set('max_execution_time', '0');
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\View2Excel;
use App\Taxpayer;
use App\Transaction;
use App\TransactionDetail;
use App\Http\Controllers\ChartController;
use App\Http\Controllers\API\TransactionController;
use App\Cycle;
use App\Journal;
use App\Chart;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Spatie\ArrayToXml\ArrayToXml;
use PDF;
use DB;
use Storage;
use ZipArchive;
use File;
use Zip;

class ArandukaController extends Controller
{
    public function import(Request $request,Taxpayer $taxPayer,Cycle $cycle)
    {

      $transactionController = new TransactionController();
      $collection = array();
      $results = collect($request["results"]);
      foreach ($results as $result) {
        for ($i=0; $i <count($result["data"]) ; $i++) {
          $collection[$i][$result["column"]] = $result["data"][$i];
        }
      }


      $details = [];
      $total = 0;
    //  $paginate =10;
      $i=0;

      for ($i; $i < count($collection) ; $i++)
     {
         $total = $total + $collection[$i]["total"];
         $transactionType = '';
         $transactionSubType = 1;
         if($collection[$i]["document_type"] == 1)
         {
           $transactionType = $collection[$i]["document_type"];
         }
         else
         {
           $transactionType = $collection[$i]["document_type"];
         }


         $transaction = new Transaction();

         $transaction->type = $transactionType;
         $transaction->sub_type = $transactionSubType;
         $transaction->taxpayer_id = $taxPayer->id;

         $transaction->partner_name = $collection[$i]["partner_name"];
         $transaction->partner_taxid = $collection[$i]["partner_taxid"];

         //TODO, this is not enough. Remove Cycle, and exchange that for Invoice Date. Since this will tell you better the exchange rate for that day.
         $transaction->currency = $taxPayer->currency;


         $transaction->rate = $transactionController->checkCurrencyRate($transaction->currency, $taxPayer,$collection[$i]["date"]) ?? 1;

         $paymentCondition = '';
         if($collection[$i]["payment_condition"] == "contado")
         {
           $paymentCondition =0;
         }
         else {
           $paymentCondition =1;
         }
         $transaction->payment_condition = $paymentCondition;
         $transaction->date = $transactionController->convert_date($collection[$i]["date"]);
         $transaction->number = $collection[$i]["number"];
         $transaction->save();

          $transactiondetail = $this->processDetail(
     			$transaction,
     			$taxPayer,
     			$cycle,$collection[$i]
     		);

        $detail=['periodo' => 2020,
                 'tipo' => 1,
                 'relacionadoTipoIdentificacion' => 'RUC',
                 "fecha" => $collection[$i]["date"],
                 'id' => $transactiondetail->id,
                 'ruc' => $taxPayer->taxid,
                 'egresoMontoTotal' =>$collection[$i]['total'],
                 'relacionadoNombres' => $collection[$i]["partner_name"],
                 'relacionadoNumeroIdentificacion' =>  $collection[$i]["partner_taxid"],
                 'timbradoCondicion' => $collection[$i]["payment_condition"],
                 'timbradoDocumento' => $collection[$i]["number"],
                 'timbradoNumero' => $collection[$i]["letterhead_number"],
                 'tipoEgreso' => $collection[$i]["type"],
                 'tipoEgresoTexto' => $collection[$i]["typetext"],
                 'tipoTexto' => $collection[$i]["document_name"],
                 'subtipoEgreso' => $collection[$i]["sub_type"],
                 'subtipoEgresoTexto' => $collection[$i]["chart_name"],
                  ];
       $details[$i] = $detail;


     }


       $data = [];

       $obligaciones=['impuesto' => 211 , 'nombre' => 'IVA  General' , 'fechaDesde' => '02/01/2007'];
       $informante=['ruc' => $taxPayer->taxid,'dv'=> $taxPayer->code,'nombre' => $taxPayer->name,'tipoContribuyente' => 'FISICO','tipoSociedad' =>  null , 'nombreFantasia'=> null , 'obligaciones' => $obligaciones , 'clasificacion' => 'FISICO'];
       $data['informante'] = $informante ;
       $identificacion=['periodo' => '2020','tipoMovimiento' => 'CON_MOVIMIENTO' , 'tipoPresentacion' => 'ORIGINAL' , 'version' =>'1.0.3'];
       $data['identificacion'] = $identificacion ;
       $cantidades=['ingresos'=>0,'egresos'=>count($collection)];
       $data['cantidades'] = $cantidades ;
       $egresos=['ruc' => $taxPayer->taxid , 'periodo' => 2020 ,"tipoEgreso" => 'gasto',"clasificacion" => 'GPERS','valor' => $total];
       $arbolIngresos=['subtotalGravado' => 0 ,'subtotalNoGravado' => 0];
       $gastro=['total' => $total,"GPERS" => $total];
       $arbolEgresos=['gasto' => $gastro];
       $totales=['ingresos'=>[],'egresos' => $egresos ,'arbolIngresos' => $arbolIngresos,'arbolEgresos' => $arbolEgresos];
       $data['totales'] = $totales ;





       $dataDetail = [];

       $obligaciones=['impuesto' => 211 , 'nombre' => 'IVA  General' , 'fechaDesde' => '02/01/2007'];
       $informante=['ruc' => $taxPayer->taxid,'dv'=> $taxPayer->code,'nombre' => $taxPayer->name,'tipoContribuyente' => 'FISICO','tipoSociedad' =>  null , 'nombreFantasia'=> null , 'obligaciones' => $obligaciones , 'clasificacion' => 'FISICO'];
       $dataDetail['informante'] = $informante ;
       $identificacion=['periodo' => '2020','tipoMovimiento' => 'CON_MOVIMIENTO' , 'tipoPresentacion' => 'ORIGINAL' , 'version' =>'1.0.3'];
       $dataDetail['identificacion'] = $identificacion ;
       $dataDetail['ingresos'] = [] ;
       $dataDetail['egresos'] = $details ;


      Storage::disk('public_uploads')->put('LIE_2020_99550965_1184844_952.json',   response()->json($data));
      Storage::disk('public_uploads')->put('LIE_2020_99550965_1184844_952-detalle.json',  response()->json($dataDetail));
      $result = ArrayToXml::convert($data);
      Storage::disk('public_uploads')->put('LIE_2020_99550965_1184844_952.XML',$result);

          $zip = new ZipArchive;

         $fileName = 'Aranduka.zip';

         if ($zip->open(public_path($fileName), ZipArchive::CREATE) === TRUE)
         {
             $files = File::files(public_path('aranduka'));

             foreach ($files as $key => $value) {
                 $relativeNameInZipFile = basename($value);
                 $zip->addFile($value, $relativeNameInZipFile);
             }

             $zip->close();
         }

         return response()->download(public_path($fileName));
    }

    public function processDetail(Transaction $transaction, Taxpayer $taxPayer, Cycle $cycle,$collection)
    {

      $chartController = new ChartController();
      $detail = new TransactionDetail();
      if($collection["sub_type"] == 'GPERS')
      {
        $chart_id = $chartController->createIfNotExists_ExpensesFromGPERS($taxPayer, $cycle, $collection["chart_name"] ?? '')->id;
      }
      else {
          $chart_id = $chartController->createIfNotExists_ExpensesFromCUOTA($taxPayer, $cycle, $collection["chart_name"] ?? '')->id;
      }


      $detail->transaction_id = $transaction->id;
      $detail->chart_id = $chart_id;
      $detail->value = $collection["total"];





      $detail->save();
      return $detail;


    }
}
