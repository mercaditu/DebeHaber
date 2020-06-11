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
  public function generateFiles(Taxpayer $taxPayer, Cycle $cycle, $startDate, $endDate)
  {
      //Get the Integration Once. No need to bring it into the Query.


      //TODO: This function is wrong. It will take all files from a path.
      //$files = File::allFiles($path);

      $zipname = 'Aranduka.zip';

      $zip = new ZipArchive;
      $zip->open($zipname, ZipArchive::CREATE);
      $startDate = Carbon::parse($startDate)->startOfDay();
      $endDate = Carbon::parse($endDate)->endOfDay();

     $this->generateSales($startDate, $endDate, $taxPayer, $zip);

    $this->generatePurchases($startDate, $endDate, $taxPayer, $zip);

      $zip->close();


      return response()->download($zipname)->deleteFileAfterSend(true);

      return redirect()->back();
  }

  public function generateSales($startDate, $endDate, $taxPayer, $zip)
  {
      $raw = DB::select('
      select
      max(t.id) as ID,
      max(partner_name) Partner,
      max(partner_taxid) PartnerTaxID,
      max(t.date) as Date,
      max(t.number) as Number,
      max(t.code) as Code,
      max(t.payment_condition) as PaymentCondition,
      max(t.code_expiry) as CodeExpiry,
      max(t.sub_type) as DocumentType,
      ROUND(sum(value)) as Value
      from transactions as t
      join
      ( select
      max(transaction_id) as transaction_id,
      sum(value) as value
      from transaction_details
      group by transaction_id
      ) as td on td.transaction_id = t.id
      where (t.taxpayer_id = ' . $taxPayer->id . '
      and t.deleted_at is null
      and t.date between "' . $startDate . '" and "' . $endDate . '"
      and t.type = 2
      and t.sub_type in (1, 11))
      group by t.id');

      $raw = collect($raw);
      $i = 1;
      $data = [];
      $total = $raw->sum('Value');

       $obligaciones=['impuesto' => 211 , 'nombre' => 'IVA  General' , 'fechaDesde' => $startDate];
       $informante=['ruc' => $taxPayer->taxid,'dv'=> $taxPayer->code,'nombre' => $taxPayer->name,'tipoContribuyente' => $taxPayer->type,'tipoSociedad' =>  null , 'nombreFantasia'=> null , 'obligaciones' => $obligaciones , 'clasificacion' => $taxPayer->type];
       $data['informante'] = $informante ;
       $identificacion=['periodo' => '2020','tipoMovimiento' => 'CON_MOVIMIENTO' , 'tipoPresentacion' => 'ORIGINAL' , 'version' =>'1.0.3'];
       $data['identificacion'] = $identificacion ;
       $cantidades=['ingresos'=>0,'egresos'=>count($raw)];
       $data['cantidades'] = $cantidades ;
       $ingresos=['ruc' => $taxPayer->taxid , 'periodo' => 2020 ,"tipoEgreso" => 'gasto',"clasificacion" => 'GPERS','valor' => $total];
       $arbolEgresos=['subtotalGravado' => 0 ,'subtotalNoGravado' => 0];
       $gastro=['total' => $total,"GPERS" => $total];
       $arbolIngresos=['gasto' => $gastro];
       $totales=['ingresos'=>[],'egresos' => $ingresos ,'arbolIngresos' => $arbolEgresos,'arbolEgresos' => $arbolIngresos];
       $data['totales'] = $totales ;

       $details = [];
       $i = 0;
       foreach ($raw as $result)
       {
         $date = Carbon::parse($result->Date);
         $detail=['periodo' => 2020,
                 'tipo' => 1,
                 'relacionadoTipoIdentificacion' => 'RUC',
                 "fecha" => date_format($date, 'd/m/Y'),
                 'id' => $result->ID,
                 'ruc' => $taxPayer->taxid,
                 'egresoMontoTotal' =>$result->Value,
                 'relacionadoNombres' => $result->Partner,
                 'relacionadoNumeroIdentificacion' =>  $result->PartnerTaxID,
                 'timbradoCondicion' => $result->PaymentCondition,
                 'timbradoDocumento' => $result->Number,
                 'timbradoNumero' => $result->PartnerTaxID,
                 'tipoEgreso' => 'gasto',
                 'tipoEgresoTexto' => 'Gasto',
                 'tipoTexto' => 'Factura',
                 'subtipoEgreso' =>'GPERS',
                 'subtipoEgresoTexto' => 'Gastos personales y de familiares a cargo realizados en el país',
                  ];
                  $i=$i+1;
         $details[$i] = $detail;
       }

       $dataDetail = [];

       $obligaciones=['impuesto' => 211 , 'nombre' => 'IVA  General' , 'fechaDesde' => $startDate];
       $informante=['ruc' => $taxPayer->taxid,'dv'=> $taxPayer->code,'nombre' => $taxPayer->name,'tipoContribuyente' => $taxPayer->type,'tipoSociedad' =>  null , 'nombreFantasia'=> null , 'obligaciones' => $obligaciones , 'clasificacion' => $taxPayer->type];
       $dataDetail['informante'] = $informante ;
       $identificacion=['periodo' => '2020','tipoMovimiento' => 'CON_MOVIMIENTO' , 'tipoPresentacion' => 'ORIGINAL' , 'version' =>'1.0.3'];
       $dataDetail['identificacion'] = $identificacion ;
       $dataDetail['ingresos'] = [] ;
       $dataDetail['egresos'] = $details ;

       Storage::disk('local')->put('LIE_2020_99550965_1184844_952-sales.json',   response()->json($data));
       $result = ArrayToXml::convert($data);
       Storage::disk('local')->put('LIE_2020_99550965_1184844_952-sales.XML',$result);
       Storage::disk('local')->put('LIE_2020_99550965_1184844_952-detalle-sales.json',  response()->json($dataDetail));

       $file = Storage::disk('local');

       $path = $file->getDriver()->getAdapter()->getPathPrefix();

       $zip->addFile($path . 'LIE_2020_99550965_1184844_952-sales.json', 'LIE_2020_99550965_1184844_952-sales.json');
       $zip->addFile($path . 'LIE_2020_99550965_1184844_952-sales.XML', 'LIE_2020_99550965_1184844_952-sales.XML');
       $zip->addFile($path . 'LIE_2020_99550965_1184844_952-detalle-sales.json', 'LIE_2020_99550965_1184844_952-detalle-sales.json');


  }

  public function generatePurchases($startDate, $endDate, $taxPayer, $zip)
  {

      $raw = DB::select('
      select
      max(t.id) as ID,
      max(partner_name) Partner,
      max(partner_taxid) PartnerTaxID,
      max(t.date) as Date,
      max(t.number) as Number,
      max(t.code) as Code,
      max(t.payment_condition) as PaymentCondition,
      max(t.code_expiry) as CodeExpiry,
      max(t.sub_type) as DocumentType,
	  ROUND(sum(value)) as Value
      from transactions as t
      join
      ( select
      max(transaction_id) as transaction_id,
      sum(value) as value
      from transaction_details
      group by transaction_id
      ) as td on td.transaction_id = t.id
      where (t.taxpayer_id = ' . $taxPayer->id . '
      and t.deleted_at is null
      and t.date between "' . $startDate . '" and "' . $endDate . '"
      and t.type = 1
      and t.sub_type in (1, 11))
      group by t.id');

      $raw = collect($raw);
      $i = 1;

      $data = [];
      $total = $raw->sum('Value');

       $obligaciones=['impuesto' => 211 , 'nombre' => 'IVA  General' , 'fechaDesde' => $startDate];
       $informante=['ruc' => $taxPayer->taxid,'dv'=> $taxPayer->code,'nombre' => $taxPayer->name,'tipoContribuyente' => $taxPayer->type,'tipoSociedad' =>  null , 'nombreFantasia'=> null , 'obligaciones' => $obligaciones , 'clasificacion' => $taxPayer->type];
       $data['informante'] = $informante ;
       $identificacion=['periodo' => '2020','tipoMovimiento' => 'CON_MOVIMIENTO' , 'tipoPresentacion' => 'ORIGINAL' , 'version' =>'1.0.3'];
       $data['identificacion'] = $identificacion ;
       $cantidades=['ingresos'=>count($raw),'egresos'=>0];
       $data['cantidades'] = $cantidades ;
       $ingresos=['ruc' => $taxPayer->taxid , 'periodo' => 2020 ,"tipoEgreso" => 'gasto',"clasificacion" => 'GPERS','valor' => $total];
       $arbolIngresos=['subtotalGravado' => 0 ,'subtotalNoGravado' => 0];
       $gastro=['total' => $total,"GPERS" => $total];
       $arbolEgresos=['gasto' => $gastro];
       $totales=['ingresos'=>$ingresos,'egresos' => [] ,'arbolIngresos' => $arbolEgresos,'arbolEgresos' => $arbolIngresos];
       $data['totales'] = $totales ;

       $details = [];
       $i=0;

       foreach ($raw as $result)
       {
		  
         $date = Carbon::parse($result->Date);
         $detail=['periodo' => 2020,
                 'tipo' => 1,
                 'relacionadoTipoIdentificacion' => 'RUC',
                 "fecha" => date_format($date, 'd/m/Y'),
                 'id' => $result->ID,
                 'ruc' => $taxPayer->taxid,
                 'egresoMontoTotal' =>$result->Value,
                 'relacionadoNombres' => $result->Partner,
                 'relacionadoNumeroIdentificacion' =>  $result->PartnerTaxID,
                 'timbradoCondicion' => $result->PaymentCondition,
                 'timbradoDocumento' => $result->Number,
                 'timbradoNumero' => $result->PartnerTaxID,
                 'tipoEgreso' => 'gasto',
                 'tipoEgresoTexto' => 'Gasto',
                 'tipoTexto' => 'Factura',
                 'subtipoEgreso' =>'GPERS',
                 'subtipoEgresoTexto' => 'Gastos personales y de familiares a cargo realizados en el país',
                  ];
                  $i=$i+1;
         $details[$i] = $detail;
       }
       $dataDetail = [];

       $obligaciones=['impuesto' => 211 , 'nombre' => 'IVA  General' , 'fechaDesde' => $startDate];
       $informante=['ruc' => $taxPayer->taxid,'dv'=> $taxPayer->code,'nombre' => $taxPayer->name,'tipoContribuyente' => $taxPayer->type,'tipoSociedad' =>  null , 'nombreFantasia'=> null , 'obligaciones' => $obligaciones , 'clasificacion' => $taxPayer->type];
       $dataDetail['informante'] = $informante ;
       $identificacion=['periodo' => '2020','tipoMovimiento' => 'CON_MOVIMIENTO' , 'tipoPresentacion' => 'ORIGINAL' , 'version' =>'1.0.3'];
       $dataDetail['identificacion'] = $identificacion ;
       $dataDetail['ingresos'] = $details ;
       $dataDetail['egresos'] =  [];

       Storage::disk('local')->put('LIE_2020_99550965_1184844_952-purchase.json',   response()->json($data));
       $result = ArrayToXml::convert($data);
       Storage::disk('local')->put('LIE_2020_99550965_1184844_952-purchase.XML',$result);
       Storage::disk('local')->put('LIE_2020_99550965_1184844_952-detalle-purchase.json',  response()->json($dataDetail));

       $file = Storage::disk('local');

       $path = $file->getDriver()->getAdapter()->getPathPrefix();

       $zip->addFile($path . 'LIE_2020_99550965_1184844_952-purchase.json', 'LIE_2020_99550965_1184844_952-purchase.json');
       $zip->addFile($path . 'LIE_2020_99550965_1184844_952-purchase.XML', 'LIE_2020_99550965_1184844_952-purchase.XML');
       $zip->addFile($path . 'LIE_2020_99550965_1184844_952-detalle-purchase.json', 'LIE_2020_99550965_1184844_952-detalle-purchase.json');

  }

  public function dividirCodigo($codigo)
  {
      return $code = explode("-", $codigo);
  }
}
