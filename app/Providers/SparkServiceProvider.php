<?php

namespace App\Providers;

use Laravel\Spark\Spark;
use Laravel\Spark\Providers\AppServiceProvider as ServiceProvider;

class SparkServiceProvider extends ServiceProvider
{
    /**
    * Your application and company details.
    *
    * @var array
    */
    protected $details = [
        'vendor' => 'Bazaar Social, Inc.',
        'product' => 'DebeHaber',
        'street' => '2035 Sunset Lake Road, Suite B-2',
        'location' => 'Newark, DL 19702',
        'phone' => '595-228-634370',
    ];

    /**
    * The address where customer support e-mails should be sent.
    *
    * @var string
    */
    protected $sendSupportEmailsTo = null;

    /**
    * All of the application developer e-mail addresses.
    *
    * @var array
    */
    protected $developers = [
        'ashah@indopar.com.py',
        'abhi@cognitivo.in',
        'pankeel@cognitivo.in',
        'heti.shah@gmail.com'
    ];

    /**
    * Indicates if the application will expose an API.
    *
    * @var bool
    */
    // protected $usesApi = true;

    public function register()
    {
        Spark::ensureEmailIsVerified();
    }

    /**
    * Finish configuring Spark for the application.
    *
    * @return void
    */
    public function booted()
    {
        //Do not let Users create additional Teams
        Spark::noAdditionalTeams();
        //Do not let Users switch Teams
        // Spark::identifyTeamsByPath();

        Spark::ensureEmailIsVerified();

        Spark::useRoles([
            'admin' => 'Administrator',
            'data-entry' => 'Data Entry',
            'data-view' => 'Data View',
        ]);

        Spark::useStripe()->noCardUpFront()->teamTrialDays(30);

        Spark::freeTeamPlan()
        ->features([
            'All Features, only 1 Taxpayer'
        ]);

        Spark::chargeTeamsPerSeat('Taxpayer', function ($team) {
            return $team->taxPayerIntegration()->count();
        });

        Spark::teamPlan('Pro', 'provider-id-1')
        ->price(6)
        ->features([
            'All features on each Taxpayer'
        ]);
    }
}
