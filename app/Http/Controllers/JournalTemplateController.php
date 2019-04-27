<?php

namespace App\Http\Controllers;

use App\Taxpayer;
use App\Cycle;
use App\JournalTemplate;
use App\JournalTemplateDetail;
use App\Http\Resources\GeneralResource;
use Illuminate\Http\Request;

class JournalTemplateController extends Controller
{
    /**
    * Display a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */
    public function index(Taxpayer $taxPayer, Cycle $cycle)
    {
         return GeneralResource::collection(
                JournalTemplate::
                with([
                    'details:id,journal_template_id,chart_id,debit_coef,credit_coef',
                    'details.chart:id,name,code,type,sub_type'
                ])
                ->paginate(50)
        );
    }

    /**
    * Show the form for creating a new resource.
    *
    * @return \Illuminate\Http\Response
    */
    public function create()
    {
        //
    }

    /**
    * Store a newly created resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
    public function store(TaxPayer $taxPayer,Request $request)
    {
        $journalTemplate = JournalTemplate::firstOrNew(['id' => $request->id]);

        $journalTemplate->country = $taxPayer->country;
        $journalTemplate->taxpayer_id = $taxPayer->id;
        $journalTemplate->name = $request->name;

        $journalTemplate->save();

        foreach ($request->details as $detail)
        {
            if (isset($detail['chart_id']) && $detail['chart_id'] > 0) {
                $journalTemplateDetail = JournalTemplateDetail::firstOrNew(['id' => $detail['id']]);
                $journalTemplateDetail->journal_template_id = $journalTemplate->id;
                $journalTemplateDetail->chart_id = $detail['chart']['id'];
                $journalTemplateDetail->debit_coef = $detail['debit_coef']??0;
                $journalTemplateDetail->credit_coef = $detail['credit_coef']??0;
                $journalTemplateDetail->save();
            }
        }
    }

    /**
    * Display the specified resource.
    *
    * @param  \App\JournalTemplate  $journalTemplate
    * @return \Illuminate\Http\Response
    */
    public function show(Taxpayer $taxPayer, Cycle $cycle, $templateId)
    {
         return new GeneralResource(
            JournalTemplate::
            with([
                'details:id,journal_template_id,chart_id,debit_coef,credit_coef',
                'details.chart:id,name,code,type,sub_type'
            ])
                ->where('id', $templateId)
                ->first()
        );
    }

    /**
    * Show the form for editing the specified resource.
    *
    * @param  \App\JournalTemplate  $journalTemplate
    * @return \Illuminate\Http\Response
    */
    public function edit(JournalTemplate $journalTemplate)
    {
        //
    }

    /**
    * Update the specified resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param  \App\JournalTemplate  $journalTemplate
    * @return \Illuminate\Http\Response
    */
    public function update(Request $request, JournalTemplate $journalTemplate)
    {
        //
    }

    /**
    * Remove the specified resource from storage.
    *
    * @param  \App\JournalTemplate  $journalTemplate
    * @return \Illuminate\Http\Response
    */
    public function destroy(JournalTemplate $journalTemplate)
    {
        //
    }
}
