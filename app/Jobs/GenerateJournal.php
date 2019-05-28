<?php

namespace App\Jobs;

use App\AccountMovement;
use App\Transaction;
use App\Impex;
use App\Http\Controllers\SalesController;
use App\Http\Controllers\ImpexImportController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\CreditNoteController;
use App\Http\Controllers\DebitNoteController;
use App\Http\Controllers\AccountPayableController;
use App\Http\Controllers\AccountReceivableController;
use App\Http\Controllers\AccountMovementController;
use App\Http\Controllers\FixedAssetController;
use App\Taxpayer;
use App\FixedAsset;
use App\Cycle;
use Carbon\Carbon;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class GenerateJournal implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $taxPayer;
    protected $cycle;
    protected $startDate;
    protected $endDate;
    protected $type;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Taxpayer $taxPayer, Cycle $cycle, $startDate, $endDate)
    {
        $this->taxPayer = $taxPayer;
        $this->cycle = $cycle;
        $this->startDate = $startDate;
        $this->endDate = $endDate;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        if ($this->attempts() < 2) {
            $this->generateByMonth();
        }
       
        //Auth::user()->notify(new JournalCompleted);
    }

    /**
     * Generate journals on daily basis. This function is for PAID customers only.
     */
    public function generateByDay()
    {
        //Get startOf and endOf to cover entire week of range.
        $currentDate = Carbon::parse($this->startDate)->startOfDay();
        $endDate = Carbon::parse($this->endDate)->endOfDay();

        //Number of weeks helps with the for loop
        $numberOfDays = $currentDate->diffInDays($endDate);

        for ($x = 0; $x <= $numberOfDays; $x++) {
            //Get current date start of and end of week to run the query.
            $dayStartDate = Carbon::parse($currentDate->startOfDay());
            $dayEndDate = Carbon::parse($currentDate->endOfDay());

            $this->generateJournals($dayStartDate, $dayEndDate);

            //Finally add a month to go into next cycle
            $currentDate = $currentDate->addDays(1);
        }
    }

    /**
     * Generate journals on monthly basis.
     */
    public function generateByMonth()
    {
        //Get startOf and endOf to cover entire week of range.
        $currentDate = Carbon::parse($this->startDate)->startOfMonth();
        $endingDate = Carbon::parse($this->endDate)->endOfMonth();

        //Number of weeks helps with the for loop
        $numberOfMonths = $currentDate->diffInMonths($endingDate);

        for ($x = 0; $x <= $numberOfMonths; $x++) {
            //Get current date start of and end of week to run the query.
            $firstDay = Carbon::parse($currentDate->startOfMonth());
            $lastDay = Carbon::parse($currentDate->endOfMonth());

            $this->generateJournals($firstDay, $lastDay);

            $currentDate = $lastDay->addDay();
        }
    }

    public function generateJournals($startingDate, $endingDate)
    {
        /*
        Sales Invoices
        */
        if (Transaction::MySalesForJournals($startingDate, $endingDate, $this->taxPayer->id)->count() > 0) {
            $controller = new SalesController();
            $controller->generate_Journals($startingDate, $endingDate, $this->taxPayer, $this->cycle);
        }

        /*
        Purchase Invoices
        */
        if (Transaction::MyPurchasesForJournals($startingDate, $endingDate, $this->taxPayer->id)->count() > 0) {
            $controller = new PurchaseController();
            $controller->generate_Journals($startingDate, $endingDate, $this->taxPayer, $this->cycle);
        }

        /*
        Credit Notes
        */
        if (Transaction::MyCreditNotesForJournals($startingDate, $endingDate, $this->taxPayer->id)->count() > 0) {
            $controller = new CreditNoteController();
            $controller->generate_Journals($startingDate, $endingDate, $this->taxPayer, $this->cycle);
        }

        /*
        Debit Notes
        */
        if (Transaction::MyDebitNotesForJournals($startingDate, $endingDate, $this->taxPayer->id)->count() > 0) {
            $controller = new DebitNoteController();
            $controller->generate_Journals($startingDate, $endingDate, $this->taxPayer, $this->cycle);
        }

        /*
        Accounts Payable
        */
        if (AccountMovement::PaymentsMade($startingDate, $endingDate, $this->taxPayer->id)->count() > 0) {
            $controller = new AccountPayableController();
            $controller->generate_Journals($startingDate, $endingDate, $this->taxPayer, $this->cycle);
        }

        /*
        Accounts Receivable
        */
        if (AccountMovement::PaymentsRecieved($startingDate, $endingDate, $this->taxPayer->id)->count() > 0) {
            $controller = new AccountReceivableController();
            $controller->generate_Journals($startingDate, $endingDate, $this->taxPayer, $this->cycle);
        }

        /*
        Accounts Payable
        */
        if (AccountMovement::My($startingDate, $endingDate, $this->taxPayer->id)->count() > 0) {
            $controller = new AccountMovementController();
            $controller->generate_Journals($startingDate, $endingDate, $this->taxPayer, $this->cycle);
        }

        /*
        Fixed Assets Depreciation
        */
        if (FixedAsset::where('taxpayer_id', $this->taxPayer->id)->count() > 0) {
            $assets = FixedAsset::where('taxpayer_id', $this->taxPayer->id)->get();
            foreach ($assets as $asset) {
                $controller = new FixedAssetController();
                $controller->depreciate($asset);
            }
        }

        /*
        Impex
        */
        if (
            Impex::where('taxpayer_id', $this->taxPayer->id)
            ->whereBetween('date', [$startingDate, $endingDate])
            ->count() > 0
        ) {
            $controller = new ImpexImportController();
            $controller->generate_Journals($startingDate, $endingDate, $this->taxPayer, $this->cycle);
        }
    }
}
