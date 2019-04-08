<b-nav vertical>
    <b-button variant="light" class="mb-10" v-b-toggle.collapse-commercial>
        <span class="nav-heading"> @{{ $t('general.transactions') }} </span>
    </b-button>

    <b-collapse id="collapse-commercial" accordion="sub-menu">

        <h3 class="nav-heading sub">
            @{{ $t('commercial.income', 2) }}
        </h3>
        <b-nav vertical>
            <b-nav-item class="sub-menu" :to="{ name: 'salesList'}">
                <i class="material-icons md-18 ml-10 mr-10">send</i>
                @{{ $t('commercial.salesBook') }}
            </b-nav-item>
            <b-nav-item class="sub-menu" :to="{ name: 'creditList'}">
                <i class="material-icons md-18 ml-10 mr-10">redo</i>
                @{{ $t('commercial.creditBook') }}
            </b-nav-item>
            <b-nav-item class="sub-menu" :to="{ name: 'receivableList'}">
                <i class="material-icons md-18 ml-10 mr-10">attach_money</i>
                @{{ $t('commercial.accountReceivables') }}
            </b-nav-item>
        </b-nav>

        <h3 class="nav-heading sub">
            @{{ $t('commercial.expense') }}
        </h3>
        <b-nav vertical>
            <b-nav-item class="sub-menu" :to="{ name: 'purchaseList'}">
                <i class="material-icons md-18 ml-10 mr-10">shopping_cart</i>
                @{{ $t('commercial.purchaseBook') }}
            </b-nav-item>
            <b-nav-item class="sub-menu" :to="{ name: 'debitList'}">
                <i class="material-icons md-18 ml-10 mr-10">undo</i>
                @{{ $t('commercial.debitBook') }}
            </b-nav-item>
            <b-nav-item class="sub-menu" :to="{ name: 'payableList'}">
                <i class="material-icons md-18 ml-10 mr-10">attach_money</i>
                @{{ $t('commercial.accountPayables') }}
            </b-nav-item>
        </b-nav>

        <h3 class="nav-heading sub">
            Internal
        </h3>
        <b-nav vertical>
            <b-nav-item class="sub-menu":to="{ name: 'impexList'}">
                <i class="material-icons md-18 ml-10 mr-10">directions_boat</i>
                @{{ $t('commercial.impex') }}
            </b-nav-item>
            <b-nav-item class="sub-menu" :to="{ name: 'fixedAssetList'}">
                <i class="material-icons md-18 ml-10 mr-10">vpn_key</i>
                @{{ $t('commercial.fixedAssets') }}
            </b-nav-item>
            <b-nav-item class="sub-menu" :to="{ name: 'inventoryList'}">
                <i class="material-icons md-18 ml-10 mr-10">unarchive</i>
                @{{ $t('commercial.inventories') }}
            </b-nav-item>
            <b-nav-item class="sub-menu" disabled>
                <i class="material-icons md-18 ml-10 mr-10">settings_applications</i>
                @{{ $t('commercial.productions') }}
            </b-nav-item>
            <b-nav-item class="sub-menu":to="{ name: 'moneyMovementList'}">
                <i class="material-icons md-18 ml-10 mr-10">attach_money</i>
                @{{ $t('commercial.moneyMovements') }}
            </b-nav-item>
        </b-nav>
    </b-collapse>

    <b-button variant="light" class="mb-10" v-b-toggle.collapse-accounting>
        {{-- <i class="material-icons float-left">expand_more</i> --}}
        <span class="nav-heading"> @{{ $t('general.accounting') }} </span>
    </b-button>

    <b-collapse id="collapse-accounting" accordion="sub-menu">
        <h3 class="nav-heading sub">
            Daily Accounting
        </h3>
        <b-nav vertical>
            <b-nav-item class="sub-menu" :to="{ name: 'journalList'}">
                <i class="material-icons md-18 ml-10 mr-10">notes</i>
                @{{ $t('accounting.journal') }}
            </b-nav-item>
            <b-nav-item class="sub-menu" :to="{ name: 'journalTemplateList'}">
                <i class="material-icons md-18 ml-10 mr-10">notes</i>
                @{{ $t('accounting.template') }}
            </b-nav-item>
        </b-nav>
        <h3 class="nav-heading sub">
            @{{ $t('accounting.cycle', 5) }}
        </h3>
        <b-nav vertical>
            <b-nav-item class="sub-menu" :to="{ name: 'cycleList'}">
                <i class="material-icons md-18 ml-10 mr-10">calendar_today</i>
                @{{ $t('accounting.accountingCycle') }}
            </b-nav-item>
            <b-nav-item class="sub-menu" :to="{ name: 'openingBalanceForm'}">
                <i class="material-icons md-18 ml-10 mr-10">play_circle_outline</i>
                @{{ $t('accounting.openingBalance') }}
            </b-nav-item>
            <b-nav-item class="sub-menu" :to="{ name: 'closingBalanceForm'}">
                <i class="material-icons md-18 ml-10 mr-10">pause_circle_outline</i>
                @{{ $t('accounting.closingBalance') }}
            </b-nav-item>
            <b-nav-item class="sub-menu" :to="{ name: 'budgetForm'}">
                <i class="material-icons md-18 ml-10 mr-10">playlist_add_check</i>
                @{{ $t('accounting.cycleBudget') }}
            </b-nav-item>
        </b-nav>
        <h3 class="nav-heading sub">
            @{{ $t('general.configuration') }}
        </h3>
        <b-nav vertical>
            <b-nav-item class="sub-menu" :to="{ name: 'chartList'}">
                <i class="material-icons md-18 ml-10 mr-10">settings</i>
                @{{ $t('accounting.chartOfAccounts') }}
            </b-nav-item>
        </b-nav>
    </b-collapse>

    <b-button variant="light" class="mb-10" v-b-toggle.collapse-accounting @if($teamRole != 'Audit') disabled @endif>
        {{-- <i class="material-icons float-left">expand_more</i> --}}
        <span class="nav-heading"> @{{ $t('general.auditing') }} </span>
    </b-button>

    <b-button variant="light" v-b-toggle.collapse-reporting>
        {{-- <i class="material-icons float-left">expand_more</i> --}}
        <span class="nav-heading"> @{{ $t('general.report') }} </span>
    </b-button>

    <b-collapse id="collapse-reporting" accordion="sub-menu">
        <h3 class="nav-heading sub">
            General
        </h3>
        <b-nav vertical>
            <b-nav-item class="sub-menu" :to="{ name: 'commercialReports'}">
                <i class="material-icons md-18 ml-10 mr-10">list</i>
                Commercial
            </b-nav-item>
            <b-nav-item class="sub-menu" :to="{ name: 'accountingReports'}">
                <i class="material-icons md-18 ml-10 mr-10">list</i>
                Accounting
            </b-nav-item>
            <b-nav-item class="sub-menu" disabled>
                <i class="material-icons md-18 ml-10 mr-10">list</i>
                Auditing
            </b-nav-item>
        </b-nav>
    </b-collapse>
</b-nav>
