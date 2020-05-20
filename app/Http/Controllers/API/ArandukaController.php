<?php

namespace App\Http\Controllers\API;

use Maatwebsite\Excel\Facades\Excel;
use App\Exports\View2Excel;
use App\Taxpayer;
use App\Transaction;
use App\TransactionDetail;
use App\Http\Controllers\ChartController;
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

class ArandukaController extends Controller
{
    public function import(Request $request,Taxpayer $taxPayer,Cycle $cycle)
    {


      $collection = array();
      $results = collect($request["results"]);
      foreach ($results as $result) {
        for ($i=0; $i <count($result["data"]) ; $i++) {
          $collection[$i][$result["column"]] = $result["data"][$i];
        }
      }


      $details = [];
      $total = 0;
      for ($i=0; $i <count($collection) ; $i++)
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


         $transaction->rate = $this->checkCurrencyRate($transaction->currency, $taxPayer,$collection[$i]["date"]) ?? 1;

         $paymentCondition = '';
         if($collection[$i]["payment_condition"] == "contado")
         {
           $paymentCondition =0;
         }
         else {
           $paymentCondition =1;
         }
         $transaction->payment_condition = $paymentCondition;
         $transaction->date = $this->convert_date($collection[$i]["date"]);
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
       $details[$i] =$detail;

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


      Storage::put('LIE_2020_99550965_1184844_952.json',   response()->json($data));
      Storage::put('LIE_2020_99550965_1184844_952-detalle.json',  response()->json($dataDetail));
      $result = ArrayToXml::convert($data);
      Storage::put('LIE_2020_99550965_1184844_952.XML',$result);

      // $public_dir=public_path();
      //   	// Zip File Name
      //       $zipFileName = 'AllDocuments.zip';
      //       // Create ZipArchive Obj
      //       $zip = new ZipArchive;
      //       if ($zip->open($public_dir . '/' . $zipFileName, ZipArchive::CREATE) === TRUE) {
      //       	// Add File in ZipArchive
      //           $zip->addFile('/storage','LIE_2020_99550965_1184844_952.json');
      //           $zip->addFile('/storage','LIE_2020_99550965_1184844_952-detalle.json');
      //           $zip->addFile('/storage','LIE_2020_99550965_1184844_952.xmla');
      //           // Close ZipArchive
      //           $zip->close();
      //       }
      //       // Set Header
      //       $headers = array(
      //           'Content-Type' => 'application/octet-stream',
      //       );
      //       $filetopath=$public_dir.'/'.$zipFileName;
      //       // Create Download Response
      //       if(file_exists($filetopath)){
      //           return response()->download($filetopath,$zipFileName,$headers);
      //       }

     return response()->json('Done',500);
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
