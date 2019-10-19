<template>
  <div>
    <b-button v-b-modal.transactions>
      <i class="material-icon">add</i>
      {{ $t('general.searchForTransactions') }}
    </b-button>
    <b-modal id="transactions" size="xl" :title="$t('general.searchForTransaction')">
      <b-input type="text" :placeholder="$t('general.search')" @keyup="search()" v-model="query"></b-input>
      <b-table hover :items="results['data']" :fields="columns">
        <template slot="actions" slot-scope="data">
          <b-button @click="addTransaction(data.item)">Add</b-button>
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
  props: ["impexType"],
  data: () => ({
    query: "",
    skip: 1,
    results: [],
    columns: [
      {
        key: "date",
        label: "general.date",
        formatter: (value, key, item) => {
          return new Date(item.date).toLocaleDateString();
        },
        sortable: true
      },
      {
        key: "c",
        label: "commercial.supplier",
        formatter: (value, key, item) => {
          return item.partner_name.substring(0, 32) + "...";
        },
        sortable: true
      },
      {
        key: "number",
        label: "commercial.number",
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
          .onRead(app.baseUrl + "/search/purchases/products/" + app.query)
          .then(function(data) {
            app.results = data.data;
            app.skip += app.pageSize;
          });
      }
    },

    addTransaction(item) {
      var app = this;
      app.$parent.data.transactions.push({
        id: item.id,
        number: item.number,
        value: item.value
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