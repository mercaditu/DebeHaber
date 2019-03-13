<?php

namespace App\Http\Controllers;

use App\Taxpayer;
use App\Cycle;
use App\CycleBudget;
use App\Chart;
use App\Http\Resources\GeneralResource;
use Illuminate\Http\Request;
use DB;

class BudgetController extends Controller
{
    /**
    * Display a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */
    public function index(Taxpayer $taxPayer, Cycle $cycle)
    {
        //get the journals used as opening balance; is_first = true.
        $cycleBudgets = CycleBudget::where('cycle_id', $cycle->id)->get();

        //get list of charts.
        $charts =  Chart::My($taxPayer, $cycle)
        ->select('id', 'code', 'name',
        'type', 'sub_type', 'is_accountable',
        DB::raw('id as chart_id'),
        DB::raw('null as comment'),
        DB::raw('null as debit'),
        DB::raw('null as credit'),
        DB::raw('null as budget_id'))
        ->orderBy('code')
        ->get();

        if (isset($cycleBudgets))
        {
            // Loop through Journal entries and add to chart balance
            foreach ($cycleBudgets->groupBy('chart_id') as $groupedBudgets)
            {
                $budget = $charts->where('id', $groupedBudgets->first()->chart_id)->first();

                if (isset($budget))
                {
                    $budget->id = $groupedBudgets->first()->id;
                    $budget->debit = $groupedBudgets->sum('debit');
                    $budget->credit = $groupedBudgets->sum('credit');
                    $budget->comment = $groupedBudgets->first()->comment;
                }
            }
        }

        $budgets = $charts->sortBy('type')->sortBy('code');
        return response()->json(GeneralResource::collection($budgets));
    }

    /**
    * Store a newly created resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
    public function store(Request $request, Taxpayer $taxPayer, Cycle $cycle)
    {
        $data = collect($request)->where('is_accountable', '=', 1);

        foreach ($data as $row)
        {
            //Save only if there are values ot be saved. avoid saving blank values.
            if ($row['debit'] != null || $row['credit'] != null) {

                $cycleBudget = CycleBudget::firstOrNew(['id' => $row['budget_id']]);
                $cycleBudget->cycle_id = $cycle->id;
                $cycleBudget->chart_id = $row['chart_id'];
                $cycleBudget->comment = $row['comment'] ?? '';
                $cycleBudget->debit = $row['debit'] ?? 0;
                $cycleBudget->credit = $row['credit'] ?? 0;

                $cycleBudget->save();
            }
        }

        $nonAccountables = collect($request)->where('is_accountable', '=', 0);

        return response()->json('Ok', 200);
    }
}
