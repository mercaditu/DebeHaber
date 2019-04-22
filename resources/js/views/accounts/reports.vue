<template>
  <div>
    <b-row>
      <b-col>
        <b-card>
          <b-button-group>
            <b-button>Last Month</b-button>
            <b-button>This Year</b-button>
            <b-button>Last Year</b-button>
          </b-button-group>
          <b-form inline horizontal>
            <b-form-group label="Start Date">
              <b-form-input type="date" v-model="startDate"/>
            </b-form-group>
            <b-form-group label="End Date">
              <b-form-input type="date" v-model="endDate"/>
            </b-form-group>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card-group deck>
          <b-card no-body>
            <b-list-group flush>
              <b-list-group-item href="#" @click="GenerateReport('sub_ledger')">
                <b-img src="/img/apps/journals.svg" width="32"/>
                {{ $t('accounting.subLedger') }}
                <b-img src="/img/apps/excel.svg" width="32" @click="GenerateReport('sub_ledger',1)"/>
              </b-list-group-item>
              <b-list-group-item href="#" @click="GenerateReport('ledger')">
                 <b-img src="/img/apps/journals.svg" width="32"/>
                {{ $t('accounting.ledger') }}
                 <b-img src="/img/apps/excel.svg" width="32" @click="GenerateReport('ledger',1)"/>
              </b-list-group-item>
              <b-list-group-item href="#" @click="GenerateReport('ledger-byMonth')">
                 <b-img src="/img/apps/journals.svg" width="32"/>
                {{ $t('accounting.ledgerOfMonth') }}
                <b-img src="/img/apps/excel.svg" width="32" @click="GenerateReport('ledger-byMonth',1)"/>
              </b-list-group-item>
              <b-list-group-item href="#" @click="GenerateReport('ledger-byMoneyAccounts')">
                 <b-img src="/img/apps/journals.svg" width="32"/>
                {{ $t('accounting.ledgerOfCash') }}
                <b-img src="/img/apps/excel.svg" width="32" @click="GenerateReport('ledger-byMoneyAccounts',1)"/>
              </b-list-group-item>
               <b-list-group-item href="#" @click="GenerateReport('ledger-byReceivables')">
                 <b-img src="/img/apps/journals.svg" width="32"/>
                {{ $t('accounting.ledgerOfAccountsReceivable') }}
                <b-img src="/img/apps/excel.svg" width="32" @click="GenerateReport('ledger-byReceivables',1)"/>
              </b-list-group-item>
               <b-list-group-item href="#" @click="GenerateReport('ledger-byPayables')">
                 <b-img src="/img/apps/journals.svg" width="32"/>
                {{ $t('accounting.ledgerOfAccountsPayable') }}
                <b-img src="/img/apps/excel.svg" width="32" @click="GenerateReport('ledger-byPayables',1)"/>
              </b-list-group-item>
               <b-list-group-item href="#" @click="GenerateReport('ledger-byExpenses')">
                 <b-img src="/img/apps/journals.svg" width="32"/>
                {{ $t('accounting.ledgerOfExpenses') }}
                <b-img src="/img/apps/excel.svg" width="32" @click="GenerateReport('ledger-byExpenses',1)"/>
              </b-list-group-item>
            </b-list-group>
          </b-card>

          <b-card no-body>
            <b-list-group flush>
              <b-list-group-item href="#" @click="GenerateReport('balance-sheet')">
                <b-img src="/img/apps/balance.svg" width="32"/>
                {{ $t('commercial.Balance Sheet') }}
                <b-img src="/img/apps/excel.svg" width="32" @click="GenerateReport('balance-sheet',1)"/>
              </b-list-group-item>
              <b-list-group-item href="#" @click="GenerateReport('balance-byMonth')">
                <b-img src="/img/apps/balance.svg" width="32"/>
                {{ $t('commercial.BalanceSheetByMonth') }}
                <b-img src="/img/apps/excel.svg" width="32" @click="GenerateReport('balance-byMonth',1)"/>
              </b-list-group-item>
               <b-list-group-item href="#" @click="GenerateReport('balance-bycomparative')">
                <b-img src="/img/apps/balance.svg" width="32"/>
                {{ $t('commercial.BalanceComparative') }}
                <b-img src="/img/apps/excel.svg" width="32" @click="GenerateReport('balance-bycomparative',1)"/>
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card-group deck>
          <b-card no-body>
            <b-list-group flush>
              <b-list-group-item href="#" @click="GenerateReport('chart-ofAccounts')">
                <b-img src="/img/apps/chart-of-accounts.svg" width="32"/>
                {{ $t('commercial.Chart of Accounts') }}
              </b-list-group-item>
            </b-list-group>
          </b-card>

          
        </b-card-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "",
  data: () => ({
    startDate: "",
    endDate: ""
  }),
    methods: {

        GenerateReport(path,mode) {
          //console.log(mode);
            var app = this;
            window.location.href = app.$route.path + "/" +  path + "/" +  app.startDate + "/" + app.endDate;
           
            
        }

      
    },
  mounted() {
    var app = this;
    app.startDate= moment().subtract(1, 'months').startOf('month').format("YYYY-MM-DD");
    app.endDate= moment().subtract(1, 'months').endOf('month').format("YYYY-MM-DD");
    
  }
 
};
</script>
