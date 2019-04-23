<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateJournal extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('impexes', function (Blueprint $table) {
            // change() tells the Schema builder that we are altering a table
            $table->unsignedInteger('journal_id')->default(null)->nullable();
            $table->foreign('journal_id')->references('id')->on('journals');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('impexes', function (Blueprint $table) {
            // change() tells the Schema builder that we are altering a table
            $table->dropColumn('journal_id');
        });
    }
}
