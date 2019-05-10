<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateInventoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('inventories', function (Blueprint $table) {
            $table->unsignedInteger('chart_sales_id')->after('chart_id');
            $table->unsignedInteger('journal_id')->after('chart_sales_id');
            $table->unsignedDecimal('discount_value', 18, 2)->default(0)->after('inventory_value');
            $table->dropColumn('cost_value');
            $table->dropColumn('current_value');
            $table->dropColumn('chart_of_incomes');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('inventories', function (Blueprint $table) {
            $table->string('chart_of_incomes');
            $table->unsignedDecimal('cost_value', 18, 2)->default(0);
            $table->unsignedDecimal('current_value', 18, 2)->default(0);
            $table->dropColumn('discount_value');
            $table->dropColumn('chart_sales_id');
        });
    }
}
