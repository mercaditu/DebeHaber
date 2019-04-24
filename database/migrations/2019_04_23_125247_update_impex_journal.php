<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateImpexJournal extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('impexes', function (Blueprint $table) {
            $table->unsignedInteger('journal_id')->nullable()->after('taxpayer_id');
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
            $table->dropColumn('journal_id');
        });
    }
}
