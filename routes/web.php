<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'WelcomeController@show');
Route::get('/home', 'HomeController@show');


Route::group(['middleware' => 'auth'], function () {
    Route::get('selectTaxPayer/{taxPayer}', 'TaxpayerController@selectTaxpayer')->name('selectTaxPayer');

    //Taxpayer Setting Routes
    Route::get('taxpayer/{id}', 'TaxpayerController@show')->name('editTaxPayer');
    Route::post('taxpayer', 'TaxpayerController@store')->name('postTaxPayer');
    Route::PUT('taxpayer/{taxPayer}', 'TaxpayerController@update')->name('updateTaxPayer');
    Route::delete('taxpayer', 'TaxpayerController@destroy')->name('deleteTaxPayer');

    Route::prefix('{taxPayer}/{cycle}')->group(function () {
        Route::prefix('commercial')->group(function () {
            Route::prefix('reports')->group(function () {
                Route::get('purchases/{strDate}/{endDate}/{e?}', 'ReportController@purchases')->name('reports.purchases');
                Route::get('purchases-byVAT/{strDate}/{endDate}/{e?}', 'ReportController@purchasesByVAT')->name('reports.purchaseByVAT');
                Route::get('purchases-bySupplier/{strDate}/{endDate}/', 'ReportController@purchasesBySupplier')->name('reports.purchaseBySupplier');
                Route::get('purchases-byChart/{strDate}/{endDate}/', 'ReportController@purchasesByChart')->name('reports.salesByChart');

                Route::get('sales/{strDate}/{endDate}/{e?}', 'ReportController@sales')->name('reports.sales');
                Route::get('sales-byVATs/{strDate}/{endDate}/{e?}', 'ReportController@salesByVAT')->name('reports.salesByVAT');
                Route::get('sales-byCustomers/{strDate}/{endDate}/{e?}', 'ReportController@salesByCustomer')->name('reports.salesByCustomer');
                Route::get('sales-byChart/{strDate}/{endDate}/{e?}', 'ReportController@salesByChart')->name('reports.salesByChart');

                Route::get('credit_notes/{strDate}/{endDate}/{e?}', 'ReportController@creditNotes')->name('reports.creditNotes');
                Route::get('debit_notes/{strDate}/{endDate}/{e?}', 'ReportController@debitNotes')->name('reports.debitNotes');

                Route::get('account-receivable/{strDate}/{endDate}/{e?}', 'ReportController@accountReceivable');
                Route::get('account-customer/{strDate}/{endDate}/{e?}', 'ReportController@accountCustomer');
                Route::get('account-payable/{strDate}/{endDate}/{e?}', 'ReportController@accountPayable');
                Route::get('account-supplier/{strDate}/{endDate}/{e?}', 'ReportController@accountSupplier');
            });
        });
        Route::prefix('accounting')->group(function () {
            Route::prefix('reports')->group(function () {
                Route::get('hechauka/generate_files/{start_date}/{end_date}', 'API\PRY\HechaukaController@generateFiles');
                Route::get('chart-ofAccounts/{strDate}/{endDate}/{e?}', 'ReportController@chartOfAccounts');
                Route::get('sub_ledger/{strDate}/{endDate}/{e?}', 'ReportController@subLedger')->name('reports.subLedger');
                Route::get('ledger/{strDate}/{endDate}/{e?}', 'ReportController@ledger')->name('reports.ledger');
                Route::get('ledger-byMonth/{strDate}/{endDate}/{e?}', 'ReportController@ledgerByMonth')->name('reports.ledgerByMonth');
                Route::get('ledger-byMoneyAccounts/{strDate}/{endDate}/{e?}', 'ReportController@ledgerByCashAccount');
                Route::get('ledger-byReceivables/{strDate}/{endDate}/{e?}', 'ReportController@ledgerByReceivables');
                Route::get('ledger-byPayables/{strDate}/{endDate}/{e?}', 'ReportController@ledgerByPayables');
                Route::get('ledger-byExpenses/{strDate}/{endDate}/{e?}', 'ReportController@ledgerByExpenses');
                Route::get('balance-sheet/{strDate}/{endDate}/', 'ReportController@balanceSheet')->name('reports.balanceSheet');
                Route::get('balance-byMonth/{strDate}/{endDate}/', 'ReportController@balanceByMonth')->name('reports.balanceByMonth');
                Route::get('balance-bycomparative/{strDate}/{endDate}/', 'ReportController@balanceComparative')->name('reports.balanceComparative');
            });
        });

        Route::get('', 'TaxpayerController@showDashboard')->name('taxpayer.dashboard');
        Route::get('{any}', function () {
            return view('platform');
        })->where('any', '.*');
    });
});
// // ->middleware('accessTaxPayer')
// Route::prefix('{taxPayer}/{cycle}')->group(function () {
//
// });
