<?php

namespace App\Http\Controllers;

use App\Taxpayer;
use App\Cycle;
use App\Journal;
use App\JournalDetail;
use App\Http\Resources\GeneralResource;
use Spatie\QueryBuilder\QueryBuilder;
use App\Jobs\GenerateJournal;
use Illuminate\Http\Request;

class JournalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Taxpayer $taxPayer, Cycle $cycle)
    {
        $query =  Journal::with([
            'details:journal_id,chart_id,debit,credit',
            'details.chart:id,name,code,type,sub_type'
        ])
            ->orderBy('date', 'desc');

        return GeneralResource::collection(
            QueryBuilder::for($query)
                ->allowedFilters('detail.chart.name')
                ->paginate(50)
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Taxpayer $taxPayer, Cycle $cycle)
    {
        $journal = $request->id == 0 ? new Journal() : Journal::where('id', $request->id)->first();

        $journal->date = $request->date;
        $journal->number = $request->number;
        $journal->comment = $request->comment ?? '';
        $journal->cycle_id = $cycle->id;
        $journal->is_automatic = 0;
        // $journal->template_id = $request->template_id;

        $journal->save();

        foreach ($request->details as $detail) {
            $journalDetail = JournalDetail::firstOrNew(['id' => $detail['id']]);;
            $journalDetail->journal_id = $journal->id;
            $journalDetail->chart_id = $detail['chart_id'];
            $journalDetail->debit = $detail['debit'] ?? 0;
            $journalDetail->credit = $detail['credit'] ?? 0;
            $journalDetail->save();
        }

        return response()->json('Ok', 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Journal  $journal
     * @return \Illuminate\Http\Response
     */
    public function show(Taxpayer $taxPayer, Cycle $cycle, $journalId)
    {
        return new GeneralResource(
            Journal::with([
                'details',
                'details.chart:id,name,code,type'
            ])
                ->where('id', $journalId)
                ->orderBy('date', 'desc')
                ->first()
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Journal  $journal
     * @return \Illuminate\Http\Response
     */
    public function destroy(Journal $journal)
    {
        //clean up use of journal in transactions and other places
    }

    //TODO calcualte without VAT.
    public function chartStats($taxPayer, $cycleId, $starDate, $endDate, $chartId)
    {
        $journals = Journal::leftJoin('journal_details as jd', 'jd.journal_id', 'journals.id')
            ->where('journals.cycle_id', $cycleId)
            ->where('jd.chart_id', $chartId)
            ->whereBetween('date', [$starDate, $endDate])
            ->groupBy('jd.chart_id')
            ->select(DB::raw('sum(jd.credit) - sum(jd.debit) as value'))
            ->first();
        return response()->json($journals != null ? $journals->value : 0);
    }

    public function generateJournalsByRange(Taxpayer $taxPayer, Cycle $cycle, $startDate, $endDate)
    {
        GenerateJournal::dispatch($taxPayer, $cycle, $startDate, $endDate);
        return back();
    }
}
