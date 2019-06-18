<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\IntegrationService;
use App\Taxpayer;
use App\Http\Resources\GeneralResource;
use App\Cycle;

class IntegrationServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Taxpayer $taxPayer, Cycle $cycle)
    {
        return GeneralResource::collection(
            IntegrationService::where('taxpayer_id', $taxPayer->id)
            // ->with('details')
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
    public function store(Request $request, Taxpayer $taxPayer, Cycle $cycle)
    {
          
            $integrationservice = IntegrationService::firstOrNew(['id' => $request->id]);
            $integrationservice->taxpayer_id = $taxPayer->id;
            $integrationservice->template = $request->template ?? 0;
            $integrationservice->module = $request->module ?? 0;
            $integrationservice->name = $request->name ?? '';
            $integrationservice->url = $request->url ?? '';
            $integrationservice->api_secrete = $request->api_secrete ?? '';
            $integrationservice->api_key = $request->api_key ?? '';
            $integrationservice->run_every_xdays = $request->run_every_xdays  ?? 15;
            $integrationservice->save();

            return response()->json($integrationservice, 200);
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
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Taxpayer $taxPayer, Cycle $cycle, $id)
    {
        try {
            //TODO: Run Tests to make sure it deletes all journals related to transaction
            IntegrationService::where('id', $id)->forceDelete();
            return response()->json('Ok', 200);
        } catch (\Exception $e) {
            return response()->json($e, 500);
        }
    }
}
