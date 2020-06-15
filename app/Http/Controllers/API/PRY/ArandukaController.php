<?php

namespace App\Http\Controllers\API\PRY;

ini_set('memory_limit', '3000M');
ini_set('max_execution_time', '0');
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\Collection2Excel;
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
	public function arandukaUpload(Request $request, Taxpayer $taxPayer, Cycle $cycle)
	{

		$transactionController = new TransactionController();
		$results = collect($request["results"]);

		foreach ($results as $data)
		{
       $transaction = null;

       if(isset($data["Número de Documento"]))
			 {
				$transaction = Transaction::where('partner_taxid', $data["Número de Identificación"])->where('number', $data["Número de Documento"])->first() ?? new Transaction();
			 } else {
			  $transaction = Transaction::where('partner_taxid', $data["Número de Identificación"])->where('number', $data["Número de Documento_1"])->first() ?? new Transaction();
			 }

			 $transaction->type = 1;
			 $transaction->sub_type = static::ARANDUKA_MAP[$data["Tipo de Documento"]];
			 $transaction->taxpayer_id = $taxPayer->id;

			 $transaction->partner_name = $data["Nombres y Apellidos o Razón Social"];
			 $transaction->partner_taxid = $data["Número de Identificación"];

			 //TODO, this is not enough. Remove Cycle, and exchange that for Invoice Date. Since this will tell you better the exchange rate for that day.
			 $transaction->currency = $taxPayer->currency;

			 $transaction->rate = $transactionController->checkCurrencyRate($transaction->currency, $taxPayer, $data["Fecha"]) ?? 1;

			 $paymentCondition = '';
			 if(isset($data["Condición de la Venta"]))
			 {
				  if($data["Condición de la Venta"] == "contado")
					{
						$paymentCondition = 0;
					} else {
						$paymentCondition = 1;
					}
			 }
			 else {
			 	$paymentCondition = 0;
			 }

			 $transaction->payment_condition = $paymentCondition;
			 $transaction->date = $transactionController->convert_date($data["Fecha"]);

			 if($data["Tipo de Documento"] == 11)
			 {
				$transaction->number = $data["Número de Documento_1"] ?? '';
			 }
			 else
			 {
				$transaction->code = $data["Número de Timbrado"] ?? '';
				$transaction->number = $data["Número de Documento"] ?? '';
       }

			  $transaction->save();

				$transactiondetail = $this->processDetail(
          $transaction,
          $taxPayer,
          $cycle,
          $data
			  );
	 }

	 return response()->json('Done');
	}

	public function processDetail(Transaction $transaction, Taxpayer $taxPayer, Cycle $cycle, $collection)
	{
		$transaction->details()->delete();

    $chart = Chart::My($taxPayer, $cycle)
        ->where('code', $collection["Clasificación de Egreso"])
        ->where('is_accountable', true)
        ->first();

    if (!isset($chart)) {
        //if not, create specific.
        $chart = new Chart();
        $chart->taxpayer_id = $taxPayer->id;
        $chart->chart_version_id = $cycle->chart_version_id;
        $chart->type = 5;
        $chart->sub_type = 12;
        $chart->is_accountable = true;
        $chart->code = $collection["Clasificación de Egreso"];
        $chart->name = $collection["Clasificación de Egreso (Texto)"];
        $chart->save();
    }

		$detail = new TransactionDetail();
		$detail->transaction_id = $transaction->id;
		$detail->chart_id = $chart->id;
		$detail->value = $collection["Monto Total"];
        $detail->save();

		return $detail;
	}

  public function generateFiles(Taxpayer $taxPayer, Cycle $cycle, $startDate, $endDate)
  {
		$startDate = Carbon::parse($startDate)->startOfDay();
    $endDate = Carbon::parse($endDate)->endOfDay();

    $zipname = 'Aranduka-' . $taxPayer->name . '-' . date_format($startDate, 'Y') . '.zip';

    $zip = new ZipArchive;
    $zip->open($zipname, ZipArchive::CREATE);



    $income = $this->getIncomeTransactions($startDate, $endDate, $taxPayer);
    $expense = $this->getExpenseTransactions($startDate, $endDate, $taxPayer);

		$file = Storage::disk('local');
    $path = $file->getDriver()->getAdapter()->getPathPrefix();

    $this->generateDetail($startDate, $endDate, $taxPayer, $income, $expense, $zip,$path);
    $this->generateHeader($startDate, $endDate, $taxPayer, $income, $expense, $zip,$path);
		$this->generateIncomeExcel($startDate, $endDate, $taxPayer, $income, $expense, $zip,$path);
		$this->generateExpenseExcel($startDate, $endDate, $taxPayer, $income, $expense, $zip,$path);

    $zip->close();

    return response()->download($zipname)->deleteFileAfterSend(true);
  }

  public function generateDetail($startDate, $endDate, $taxPayer, $income, $expense, $zip,$path) {

    $data['informante'] = [
      'ruc' => $taxPayer->taxid,
      'dv'=> $taxPayer->code,
      'nombre' => $taxPayer->name,
      'tipoContribuyente' => $taxPayer->type ?? 'FISICO',
      'tipoSociedad' =>  null,
      'nombreFantasia'=> null,
      'obligaciones' => [
				[
        'impuesto' => 211,
        'nombre' => 'IVA  General',
        'fechaDesde' => '18/01/2006'
				]
      ] ,
      'clasificacion' => $taxPayer->type ?? 'FISICO'
    ];

    $data['identificacion'] = [
      'periodo' => date_format($startDate, 'Y'),
      'tipoMovimiento' => 'CON_MOVIMIENTO',
      'tipoPresentacion' => 'ORIGINAL',
      'version' =>'1.0.3'
    ];

    $data['ingresos'] = [];
    $data['egresos'] = $expense;
    $data['familiares'] = [];

    $fileName = 'LIE_' . date_format($startDate, 'Y') . '_99550965_' . $taxPayer->taxid . '_952-detalle.json';
    Storage::disk('local')->put($fileName,  json_encode($data));
    $zip->addFile($path . $fileName, $fileName);
    return $zip;
  }

  public function generateHeader($startDate, $endDate, $taxPayer, $income, $expense, $zip,$path) {
		$fileData = [];
    $fileData['informante'] = [
      'ruc' => $taxPayer->taxid,
      'dv'=> $taxPayer->code,
      'nombre' => $taxPayer->name,
      'tipoContribuyente' => $taxPayer->type ?? 'FISICO',
      'tipoSociedad' =>  null,
      'nombreFantasia'=> null,
      'obligaciones' => [
				['impuesto' => 211,
        'nombre' => 'IVA  General',
        'fechaDesde' => '18/01/2006']
      ] ,
      'clasificacion' => $taxPayer->type ?? 'FISICO'
    ];

    $fileData['identificacion'] = [
      'periodo' => date_format($startDate, 'Y'),
      'tipoMovimiento' => 'CON_MOVIMIENTO',
      'tipoPresentacion' => 'ORIGINAL',
      'version' =>'1.0.3'
    ];

    $fileData['cantidades'] = [
      'ingresos' => count($income),
      'egreso' => count($expense)
    ];

    $summaryOfExpenses = [];
		$i=0;
    foreach($expense->groupBy('subtipoEgreso') as $data) {
      $type = [
        'ruc' => $taxPayer->taxid,
        'periodo' => $data[0]['periodo'],
        'tipoEgreso' => $data[0]['tipoEgreso'],
        'clasificacion' => $data[0]['subtipoEgreso'],
        'valor' => $data->sum('egresoMontoTotal')
			];
			$summaryOfExpenses[$i]= $type;
			$i = $i + 1;
    }

    $summaryOfIncome = [];
		$i=0;
    foreach($income->groupBy('subtipoIngreso') as $data) {
      $type = [
        'ruc' => $taxPayer->taxid,
        'periodo' => date_format($date, 'Y'),
        'tipoIngreso' => $data['tipoIngreso']->first(),
        'clasificacion' => $data['subtipoIngreso']->first(),
        'valor' => $data->sum('ingresoMontoTotal')
      ];
			$summaryOfExpenses[$i]= $type;
			$i = $i + 1;
    }

    $fileData['totales'] = [
      'ingresos' => $summaryOfIncome,
      'egresos' => $summaryOfExpenses,
      "arbolIngresos" => [
        "subtotalGravado" => 0,
        "subtotalNoGravado" => 0
      ],
      'arbolEgresos' => [
        "subtotalGravado" => $expense->sum('egresoMontoTotal'),
        "subtotalNoGravado" => $expense->sum('egresoMontoTotal')
      ],
    ];

    $fileNameJson = 'LIE_' . date_format($startDate, 'Y') . '_99550965_' . $taxPayer->taxid . '_952.json';

    Storage::disk('local')->put($fileNameJson,  json_encode($fileData));
    $zip->addFile($path . $fileNameJson, $fileNameJson);

    $fileNameXml = 'LIE_' . date_format($startDate, 'Y') . '_99550965_' . $taxPayer->taxid . '_952.xml';

		$file["resumen"] = $fileData;
		$fileData = ArrayToXml::convert($file);
    Storage::disk('local')->put($fileNameXml,  $fileData);
    $zip->addFile($path . $fileNameXml, $fileNameXml);
    return $zip;
  }

  public function generateExpenseExcel($startDate, $endDate, $taxPayer, $income, $expense, $zip,$path) {
		$data = [];

		$row = [];
		$row['tipo'] = 'Tipo de Documento';
		$row['Tipo de Documento (Texto)'] = 'Tipo de Documento (Texto)';
		$row['Fecha'] = 'Fecha';
		$row['Mes'] = 'Mes';
		$row['Tipo de Identificación'] = 'Tipo de Identificación';
		$row['Número de Identificación'] = 'Número de Identificación';
		$row['Nombres y Apellidos o Razón Social'] = 'Nombres y Apellidos o Razón Social';
		$row['Número de Timbrado'] = 'Número de Timbrado';
		$row['Número de Documento'] = 'Número de Documento';
		$row['Condición de la Venta'] = 'Condición de la Venta';
		$row['Monto Total'] = 'Monto Total';
		$row['Número de Cuenta'] = 'Número de Cuenta';
		$row['Razón Social del Banco / Financiera / Cooperativa'] = 'Razón Social del Banco / Financiera / Cooperativa';
		$row['Otro Tipo de Documento'] = 'Otro Tipo de Documento';
		$row['Número de Documento1'] = 'Número de Documento';
		$row['Período de la Cuenta'] = 'Período de la Cuenta';
		$row['Identificador del Empleador'] = 'Identificador del Empleador';
		$row['Tipo de Egreso'] = 'Tipo de Egreso';
		$row['Tipo de Egreso (Texto)'] = 'Tipo de Egreso (Texto)';
		$row['Clasificación de Egreso'] = 'Número de Despacho';
		$row['Clasificación de Egreso (Texto)'] = 'Clasificación de Egreso (Texto)';
		$row['Número de Identificación Del Empleador'] = 'Número de Identificación Del Empleador';
   	$data[1] =$row;


		$i = 2;

		foreach ($expense as $expdata) {
			$row = [];
			//dd($expdata);
			$row['Tipo de Documento'] = $expdata["tipo"];
			$row['Tipo de Documento (Texto)'] = $expdata["tipoTexto"];
			$row['Fecha'] = $expdata["fecha"];
			$row['Mes'] = '';
			$row['Tipo de Identificación'] = 'RUC';
			$row['Número de Identificación'] = $expdata["relacionadoNumeroIdentificacion"];
			$row['Nombres y Apellidos o Razón Social'] = $expdata["relacionadoNombres"];
			$row['Número de Timbrado'] = $expdata["timbradoNumero"] ?? '';
			if($expdata["tipo"] == 1)
			{
				$row['Número de Documento'] = $expdata["timbradoDocumento"] ?? '';
			}
			else {
				$row['Número de Documento'] = '';
			};
			$row['Condición de la Venta'] = $expdata["timbradoCondicion"] ?? '';
			$row['Monto Total'] = $expdata["egresoMontoTotal"];
			$row['Número de Cuenta'] = '';
			$row['Razón Social del Banco / Financiera / Cooperativa'] = '';
			$row['Otro Tipo de Documento'] = '';
			if($expdata["tipo"] == 11)
			{
				$row['Número de Documento1'] = $expdata["timbradoDocumento"] ?? '';
			}
			else {
				$row['Número de Documento1'] = '';
			};
			$row['Período de la Cuenta'] = '';
			$row['Identificador del Empleador'] = '';
			$row['Tipo de Egreso'] = $expdata["tipoEgreso"];
			$row['Tipo de Egreso (Texto)'] = $expdata["tipoEgresoTexto"];
			$row['Clasificación de Egreso'] = $expdata["subtipoEgreso"];
			$row['Clasificación de Egreso (Texto)'] = $expdata["subtipoEgresoTexto"];
			$row['Número de Identificación Del Empleador'] = '';
			$data[$i] = $row;
			$i = $i + 1;
		}
		//dd($data[596]);
		// $data[1] =$row;
		$fileNameJson = 'LIE_' . date_format($startDate, 'Y') . '_99550965_' . $taxPayer->taxid . '_952-egresos.xls';
		Excel::store(new Collection2Excel(
				['data' => $data]
		), $fileNameJson);
		$zip->addFile($path . $fileNameJson, $fileNameJson);

  }
	public function generateIncomeExcel($startDate, $endDate, $taxPayer, $income, $expense, $zip,$path) {
		$data = [];

		$row = [];
		$row['tipo'] = 'Tipo de Documento';
		$row['Tipo de Documento (Texto)'] = 'Tipo de Documento (Texto)';
		$row['Fecha'] = 'Fecha';
		$row['Mes'] = 'Mes';
		$row['Tipo de Identificación'] = 'Tipo de Identificación';
		$row['Número de Identificación'] = 'Número de Identificación';
		$row['Nombres y Apellidos o Razón Social'] = 'Nombres y Apellidos o Razón Social';
		$row['Número de Timbrado'] = 'Número de Timbrado';
		$row['Número de Documento'] = 'Número de Documento';
		$row['Condición de la Venta'] = 'Condición de la Venta';
		$row['Monto Total'] = 'Monto Total';
		$row['Número de Cuenta'] = 'Número de Cuenta';
		$row['Razón Social del Banco / Financiera / Cooperativa'] = 'Razón Social del Banco / Financiera / Cooperativa';
		$row['Otro Tipo de Documento'] = 'Otro Tipo de Documento';
		$row['Número de Documento1'] = 'Número de Documento';
		$row['Período de la Cuenta'] = 'Período de la Cuenta';
		$row['Identificador del Empleador'] = 'Identificador del Empleador';
		$row['Tipo de Egreso'] = 'Tipo de Egreso';
		$row['Tipo de Egreso (Texto)'] = 'Tipo de Egreso (Texto)';
		$row['Clasificación de Egreso'] = 'Número de Despacho';
		$row['Clasificación de Egreso (Texto)'] = 'Clasificación de Egreso (Texto)';
		$row['Número de Identificación Del Empleador'] = 'Número de Identificación Del Empleador';
   	$data[1] =$row;


		// $i = 2;
		//
		// foreach ($expense as $expdata) {
		// 	$row = [];
		// 	//dd($expdata);
		// 	$row['Tipo de Documento'] = $expdata["tipo"];
		// 	$row['Tipo de Documento (Texto)'] = $expdata["tipoTexto"];
		// 	$row['Fecha'] = $expdata["fecha"];
		// 	$row['Mes'] = '';
		// 	$row['Tipo de Identificación'] = 'RUC';
		// 	$row['Número de Identificación'] = $expdata["relacionadoNumeroIdentificacion"];
		// 	$row['Nombres y Apellidos o Razón Social'] = $expdata["relacionadoNombres"];
		// 	$row['Número de Timbrado'] = $expdata["timbradoNumero"] ?? '';
		// 	if($expdata["tipo"] == 1)
		// 	{
		// 		$row['Número de Documento'] = $expdata["timbradoDocumento"] ?? '';
		// 	}
		// 	else {
		// 		$row['Número de Documento'] = '';
		// 	};
		// 	$row['Condición de la Venta'] = $expdata["timbradoCondicion"] ?? '';
		// 	$row['Monto Total'] = $expdata["egresoMontoTotal"];
		// 	$row['Número de Cuenta'] = '';
		// 	$row['Razón Social del Banco / Financiera / Cooperativa'] = '';
		// 	$row['Otro Tipo de Documento'] = '';
		// 	if($expdata["tipo"] == 11)
		// 	{
		// 		$row['Número de Documento1'] = $expdata["timbradoDocumento"] ?? '';
		// 	}
		// 	else {
		// 		$row['Número de Documento1'] = '';
		// 	};
		// 	$row['Período de la Cuenta'] = '';
		// 	$row['Identificador del Empleador'] = '';
		// 	$row['Tipo de Egreso'] = $expdata["tipoEgreso"];
		// 	$row['Tipo de Egreso (Texto)'] = $expdata["tipoEgresoTexto"];
		// 	$row['Clasificación de Egreso'] = $expdata["subtipoEgreso"];
		// 	$row['Clasificación de Egreso (Texto)'] = $expdata["subtipoEgresoTexto"];
		// 	$row['Número de Identificación Del Empleador'] = '';
		// 	$data[$i] = $row;
		// 	$i = $i + 1;
		// }

		$fileNameJson = 'LIE_' . date_format($startDate, 'Y') . '_99550965_' . $taxPayer->taxid . '_952-ingresos.xls';
		Excel::store(new Collection2Excel(
				['data' => $data]
		), $fileNameJson);
		$zip->addFile($path . $fileNameJson, $fileNameJson);

  }

  public function getIncomeTransactions($startDate, $endDate, $taxPayer)
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
      and t.type = 2)
      group by t.id');

      $raw = collect($raw);
	  return $raw;

      // $i = 1;
      // $data = [];
      // $total = $raw->sum('Value');
	  //
      //  $obligaciones=['impuesto' => 211 , 'nombre' => 'IVA  General' , 'fechaDesde' => $startDate];
      //  $informante=['ruc' => $taxPayer->taxid,'dv'=> $taxPayer->code,'nombre' => $taxPayer->name,'tipoContribuyente' => $taxPayer->type,'tipoSociedad' =>  null , 'nombreFantasia'=> null , 'obligaciones' => $obligaciones , 'clasificacion' => $taxPayer->type];
      //  $data['informante'] = $informante ;
      //  $identificacion=['periodo' => '2020','tipoMovimiento' => 'CON_MOVIMIENTO' , 'tipoPresentacion' => 'ORIGINAL' , 'version' =>'1.0.3'];
      //  $data['identificacion'] = $identificacion ;
      //  $cantidades=['ingresos'=>0,'egresos'=>count($raw)];
      //  $data['cantidades'] = $cantidades ;
      //  $ingresos=['ruc' => $taxPayer->taxid , 'periodo' => 2020 ,"tipoEgreso" => 'gasto',"clasificacion" => 'GPERS','valor' => $total];
      //  $arbolEgresos=['subtotalGravado' => 0 ,'subtotalNoGravado' => 0];
      //  $gastro=['total' => $total,"GPERS" => $total];
      //  $arbolIngresos=['gasto' => $gastro];
      //  $totales=['ingresos'=>[],'egresos' => $ingresos ,'arbolIngresos' => $arbolEgresos,'arbolEgresos' => $arbolIngresos];
      //  $data['totales'] = $totales ;
	  //
      //  $details = [];
      //  $i = 0;
      //  foreach ($raw as $result)
      //  {
      //    $date = Carbon::parse($result->Date);
      //    $detail=['periodo' => 2020,
      //            'tipo' => 1,
      //            'relacionadoTipoIdentificacion' => 'RUC',
      //            "fecha" => date_format($date, 'd/m/Y'),
      //            'id' => $result->ID,
      //            'ruc' => $taxPayer->taxid,
      //            'egresoMontoTotal' =>$result->Value,
      //            'relacionadoNombres' => $result->Partner,
      //            'relacionadoNumeroIdentificacion' =>  $result->PartnerTaxID,
      //            'timbradoCondicion' => $result->PaymentCondition,
      //            'timbradoDocumento' => $result->Number,
      //            'timbradoNumero' => $result->PartnerTaxID,
      //            'tipoEgreso' => 'gasto',
      //            'tipoEgresoTexto' => 'Gasto',
      //            'tipoTexto' => 'Factura',
      //            'subtipoEgreso' =>'GPERS',
      //            'subtipoEgresoTexto' => 'Gastos personales y de familiares a cargo realizados en el país',
      //             ];
      //             $i=$i+1;
      //    $details[$i] = $detail;
      //  }
	  //
      //  $dataDetail = [];
	  //
      //  $obligaciones=['impuesto' => 211 , 'nombre' => 'IVA  General' , 'fechaDesde' => $startDate];
      //  $informante=['ruc' => $taxPayer->taxid,'dv'=> $taxPayer->code,'nombre' => $taxPayer->name,'tipoContribuyente' => $taxPayer->type,'tipoSociedad' =>  null , 'nombreFantasia'=> null , 'obligaciones' => $obligaciones , 'clasificacion' => $taxPayer->type];
      //  $dataDetail['informante'] = $informante ;
      //  $identificacion=['periodo' => '2020','tipoMovimiento' => 'CON_MOVIMIENTO' , 'tipoPresentacion' => 'ORIGINAL' , 'version' =>'1.0.3'];
      //  $dataDetail['identificacion'] = $identificacion ;
      //  $dataDetail['ingresos'] = [] ;
      //  $dataDetail['egresos'] = $details ;



       // Storage::disk('local')->put('LIE_2020_99550965_1184844_952-sales.json',   response()->json($data));
       // $result = ArrayToXml::convert($data);
       // Storage::disk('local')->put('LIE_2020_99550965_1184844_952-sales.XML',$result);
       // Storage::disk('local')->put('LIE_2020_99550965_1184844_952-detalle-sales.json',  response()->json($dataDetail));
	   //
       // $file = Storage::disk('local');
	   //
       // $path = $file->getDriver()->getAdapter()->getPathPrefix();
	   //
       // $zip->addFile($path . 'LIE_2020_99550965_1184844_952-sales.json', 'LIE_2020_99550965_1184844_952-sales.json');
       // $zip->addFile($path . 'LIE_2020_99550965_1184844_952-sales.XML', 'LIE_2020_99550965_1184844_952-sales.XML');
       // $zip->addFile($path . 'LIE_2020_99550965_1184844_952-detalle-sales.json', 'LIE_2020_99550965_1184844_952-detalle-sales.json');


  }

  public function getExpenseTransactions($startDate, $endDate, $taxPayer)
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
	  max(ChartCode) as ChartCode,
	  max(ChartName) as ChartName,
	  ROUND(sum(value)) as Value
      from transactions as t
      join
      ( select
      max(transaction_id) as transaction_id,
      sum(value) as value,
	  max(c.code) as ChartCode,
	  max(c.name) as ChartName
	  from transaction_details
	  join charts as c on transaction_details.chart_id = c.id
      group by transaction_id
      ) as td on td.transaction_id = t.id
      where (t.taxpayer_id = ' . $taxPayer->id . '
      and t.deleted_at is null
      and t.date between "' . $startDate . '" and "' . $endDate . '"
      and t.type = 1)
      group by t.id');

      $raw = collect($raw);

      $details = collect();

      

      foreach ($raw as $result)
      {
         $date = Carbon::parse($result->Date);

         if ($result->DocumentType == '1' || $result->DocumentType == '5') {
          $detail = [
            'periodo' => date_format($date, 'Y'),
            'tipo' => (string) array_search($result->DocumentType, static::ARANDUKA_MAP, true),
            'relacionadoTipoIdentificacion' => 'RUC',
            "fecha" => date_format($date, 'Y-m-d'),
            'id' => $result->ID,
            'ruc' => $taxPayer->taxid,
            'egresoMontoTotal' => (int) $result->Value,
            'relacionadoNombres' => $result->Partner,
            'relacionadoNumeroIdentificacion' => $result->PartnerTaxID,
            'timbradoCondicion' => $result->PaymentCondition != "0" ? 'credito' : 'contado',
            'timbradoDocumento' => $result->Number,
            'timbradoNumero' => $result->Code,
            'tipoEgreso' => 'gasto',
            'tipoEgresoTexto' => 'Gasto',
            'tipoTexto' => $this->getArandukaDocumentText(array_search($result->DocumentType, static::ARANDUKA_MAP, true)),
            'subtipoEgreso' => $result->ChartCode,
            'subtipoEgresoTexto' => $result->ChartName ?? 'Gastos personales y de familiares a cargo realizados en el país',
           ];
         } else {
          $detail = ['periodo' => date_format($date, 'Y'),
          'tipo' => (string) array_search($result->DocumentType, static::ARANDUKA_MAP, true),
          'relacionadoTipoIdentificacion' => 'RUC',
          "fecha" => date_format($date, 'Y-m-d'),
          'id' => $result->ID,
          'ruc' => $taxPayer->taxid,
          'egresoMontoTotal' => (int) $result->Value,
          'relacionadoNombres' => $result->Partner,
          'relacionadoNumeroIdentificacion' => $result->PartnerTaxID,
          'tipoEgreso' => 'gasto',
          'tipoEgresoTexto' => 'Gasto',
          'tipoTexto' => $this->getArandukaDocumentText(array_search($result->DocumentType, static::ARANDUKA_MAP, true)),
          'subtipoEgreso' => $result->ChartCode,
          'subtipoEgresoTexto' => $result->ChartName ?? 'Gastos personales y de familiares a cargo realizados en el país',
          'numeroDocumento' => $result->Number,
           ];
         }
         $details->add($detail);

       }

       return $details;
  }

  public function dividirCodigo($codigo)
  {
      return $code = explode("-", $codigo);
  }
}
