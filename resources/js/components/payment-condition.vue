<template>
  <div>
    <b-input-group>
      <b-input-group>
        <b-input
          type="text"
          :placeholder="$t('commercial.paymentCondition')"
          v-model.number="paymentCondition"
        />
        <b-input-group-append v-if="paymentCondition == 0">
          <b-form-select v-model="chartAccount">
            <option
              v-for="account in accountCharts"
              :key="account.key"
              :value="account.id"
            >{{ account.name }}</option>
          </b-form-select>
        </b-input-group-append>
      </b-input-group>
    </b-input-group>
  </div>
</template>

<script>
import crud from "../components/crud.vue";
export default {
  components: { crud: crud },
  props: ["payment_condition", "chart_account_id"],
  data: () => ({
    accountCharts: []
  }),
  computed: {
    paymentCondition: {
      // getter
      get: function() {
        return this.payment_condition;
      },
      // setter
      set: function(newValue) {
        this.$emit("update:payment_condition", newValue);
      }
    },
    chartAccount: {
      // getter
      get: function() {
        return this.partner_taxid;
      },
      // setter
      set: function(newValue) {
        this.$emit("update:chart_account_id", newValue);
      }
    },
    baseUrl() {
      return (
        "/api/" + this.$route.params.taxPayer + "/" + this.$route.params.cycle
      );
    }
  },
  methods: {},
  mounted() {
    //do something after mounting vue instance
    var app = this;
    crud.methods
      .onRead(app.baseUrl + "/accounting/charts/for/money/")
      .then(function(response) {
        app.accountCharts = response.data.data;
      });
  }
};
</script>
