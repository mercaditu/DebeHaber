<template>
  <div>
    <b-button v-b-modal.expenses>
      <i class="material-icon">add</i>
      {{ $t('general.searchForExpenses') }}
    </b-button>
    <b-modal id="expenses" size="xl" :title="$t('general.searchForExpenses')">
      <b-input type="text" :placeholder="$t('general.search')" @keyup="search()" v-model="query"></b-input>
      <b-table hover :items="results['data']" :fields="columns">
        <template slot="actions" slot-scope="data">
          <b-button @click="addExpense(data.item)">Add</b-button>
        </template>

        <div slot="table-busy">
          <table-loading></table-loading>
        </div>

        <template slot="empty" slot-scope="data">
          <table-empty></table-empty>
        </template>
      </b-table>
      <div slot="modal-footer" class="w-100"></div>
    </b-modal>
  </div>
</template>

<script>
import crud from "../components/crud.vue";
export default {
  components: { crud: crud },
  data: () => ({
    query: "",
    skip: 1,
    results: [],
    columns: [
      {
        key: "date",
        label: "commercial.date",
        formatter: (value, key, item) => {
          return new Date(item.date).toLocaleDateString();
        },
        sortable: true
      },
      {
        key: "partner_name",
        label: "commercial.supplier",
        formatter: (value, key, item) => {
          return item.partner_name.substring(0, 24) + "...";
        },
        sortable: true
      },
      {
        key: "chart",
        label: "accounting.chartOfAccounts",
        sortable: true
      },
      {
        key: "current_value",
        label: "commercial.value",
        formatter: (value, key, item) => {
          return new Number(item.value).toLocaleString();
        },
        sortable: true
      },
      {
        key: "actions",
        label: "",
        sortable: false
      }
    ]
  }),
  computed: {
    baseUrl() {
      return (
        this.spark.mainUrl +
        "/api/" +
        this.$route.params.taxPayer +
        "/" +
        this.$route.params.cycle
      );
    }
  },
  methods: {
    search() {
      var app = this;
      if (app.query.length < 3) {
        app.results = [];
      } else {
        crud.methods
          .onRead(app.baseUrl + "/search/expenses/" + app.query)
          .then(function(data) {
            app.results = data.data;
            app.skip += app.pageSize;
          });
      }
    },

    addExpense(item) {
      var app = this;
      app.$parent.data.expenses.push({
        transaction_detail_id: item.id,
        chart: item.chart,
        chart_id: item.chart_id,
        value: item.value,
        currency: item.currency,
        rate: item.rate
      });
    }
  },
  mounted() {
    if (this.columns != null) {
      this.columns.forEach(element => {
        element.label = this.$t(element.label);
      });
    }
  }
};
</script>