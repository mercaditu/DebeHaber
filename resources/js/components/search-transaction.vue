<template>
  <div>
    <b-input-group>
      <b-input
        type="text"
        v-model="transactionNumber"
        placeholder="Search for Transaction Number"
        @keyup="searchTransactionNumber()"
      />
      <b-input type="text" v-model="searchvalue" readonly="true"/>
    </b-input-group>

    <b-list-group>
      <b-list-group-item
        v-for="transaction in transactions"
        @click="select(transaction)"
        :key="transaction.id"
      >
        <b>{{ transaction.number }}</b>
        | {{ transaction.total }}
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import crud from "../components/crud.vue";
export default {
  components: { crud: crud },
  props: ["number", "value"],
  data: () => ({
    searchnumber: "",
    searchvalue: "",
    selected: [],
    transactions: []
  }),
  computed: {
    transactionNumber: {
      // getter
      get: function() {
        return this.number;
      },
      // setter
      set: function(newValue) {
        this.searchnumber = newValue;
        this.$emit("update:number", newValue);
      }
    },
    transactionValue: {
      // getter
      get: function() {
        return this.value;
      },
      // setter
      set: function(newValue) {
        this.searchvalue = newValue;
        this.$emit("update:value", newValue);
      }
    },

    baseUrl() {
      return (
        "/api/" + this.$route.params.taxPayer + "/" + this.$route.params.cycle
      );
    }
  },
  methods: {
    updateValue: function(value) {
      this.$emit("update:number", value.number);
      this.$emit("update:value", value.total);
      this.selected = value;
    },
    select(transaction) {
      var app = this;
      app.updateValue(transaction);
      app.transactions = [];
      app.transactionNumber = transaction.number;
      app.transactionValue = transaction.total;
    },
    searchTransactionNumber() {
      var app = this;
      if (app.searchnumber.length < 3) {
        app.transactions = [];
      } else {
        crud.methods
          .onRead(
            app.baseUrl + "/search/Purchasetransactions/" + app.searchnumber
          )
          .then(function(response) {
            app.transactions = response.data.data;
          });
      }
    }
  },
  mounted() {
    //do something after mounting vue instance
    var app = this;
  }
};
</script>
