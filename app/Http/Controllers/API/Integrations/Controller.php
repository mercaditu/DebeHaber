<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\ChartController;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Auth;

class Controller extends BaseController
{
    public function selectTemplate($template) {
        //match template with file
        //activate file
    }
}
