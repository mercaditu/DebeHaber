<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Taxpayer;
use App\Transaction;
use App\TransactionDetail;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Taxpayer $taxPayer)
    {

        $transaction = Transaction::firstOrNew(['id' => $request->id]);

        $transaction->taxpayer_id = $taxPayer->id;
        $transaction->partner_name = $request->partner_name;
        $transaction->partner_taxid = $request->partner_taxid;

        $transaction->document_id = $request->document_id > 0 ? $request->document_id : null;

        $transaction->currency = $request->currency;
        $transaction->rate = $request->rate;
        $transaction->payment_condition = $request->payment_condition??0;

        if (isset($request->account_chart)) {

            if ($request->account_chart > 0) {

                $transaction->chart_account_id = $request->account_chart['id'];
            }
        }

        $transaction->date = $request->date;
        $transaction->number = $request->number;
        $transaction->code = $request->code;
        $transaction->code_expiry = $request->code_expiry;
        $transaction->comment = $request->comment;
        $transaction->type = $request->type;
        $transaction->sub_type = $request->sub_type;

        $transaction->save();
      
        foreach ($request->details as $detail) {
            if (isset($detail['chart']) && $detail['chart']['id'] > 0) {
                $transactionDetail = TransactionDetail::firstOrNew(['id' => $detail['id']]);
                $transactionDetail->transaction_id = $transaction->id;
                $transactionDetail->chart_id = $detail['chart']['id'];
                $transactionDetail->chart_vat_id = isset($detail['vat']) ? $detail['vat']['id'] > 0 ? $detail['vat']['id'] : null : null;
                $transactionDetail->value = $detail['value'];
                $transactionDetail->save();
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
