<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class IntegrationServices extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('taxpayers', function (Blueprint $table) {
            $table->string('avatar')->after('alias')->nullable();
        });

        Schema::create('integration_services', function (Blueprint $table) {
            $table->increments('id');
            
            $table->unsignedInteger('taxpayer_id');
            $table->foreign('taxpayer_id')->references('id')->on('taxpayers')->onDelete('cascade');

            $table->boolean('is_enabled')->default(false);

            $table->unsignedTinyInteger('template')->comment('1 = ERPNext, 2 = Shopify, etc ...');
            $table->unsignedTinyInteger('module')->comment('1 = Purchase, 2 = Sales, etc ...');
            $table->string('name')->comment('simple name to remember the integration');
            $table->string('url');

            $table->string('api_secrete');
            $table->string('api_key');

            $table->unsignedTinyInteger('run_every_xdays')->comment('value in days of how often to run. ex: 15 = run every 15 days');

            $table->dateTime('lastrun_on')->nullable();
            $table->timestamps();
        });

        Schema::create('integration_service_mappings', function (Blueprint $table) {
            $table->increments('id');
            
            $table->unsignedInteger('integration_service_id');
            $table->foreign('integration_service_id')->references('id')->on('integration_services')->onDelete('cascade');

            $table->string('internal_property');
            $table->string('external_property');
            $table->boolean('is_mandatory')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('taxpayers', function (Blueprint $table) {
            $table->dropColumn('avatar');
        });

        Schema::dropIfExists('integration_service_mappings');
        Schema::dropIfExists('integration_services');
    }
}
