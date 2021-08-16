<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DefaultController extends Controller
{
    /**
     * Show the application splash screen.
     *
     * @return Response
     */
    public function show($taxPayer, $cycle)
    {
        return view('platform');
    }
}
