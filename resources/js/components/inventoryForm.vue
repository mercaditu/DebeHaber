<template>
  <div>
    <b-row>
      <b-col>
        <b-form-group :label="$t('general.startDate')">
          <b-input type="date" required v-model="startDate"/>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group :label="$t('general.endDate')">
          <b-input type="date" required v-model="endDate"/>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form-group :label="$t('commercial.income')">
          <b-input-group>
            <b-form-select v-model="chartId">
              <option v-for="item in salesCharts" :key="item.key" :value="item.id">{{ item.name }}</option>
            </b-form-select>
            <b-input-group-append>
              <b-button variant="primary" @click="calcSales">Calculate</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col>
        <p class="lead">Sales Value: {{ salesValue }} {{spark.taxPayerData.currency}}</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form-group :label="$t('commercial.inventory')">
          <b-input-group>
            <b-form-select v-model="chartofIncomes">
              <option
                v-for="item in inventoryCharts"
                :key="item.key"
                :value="item.id"
              >{{ item.name }}</option>
            </b-form-select>
            <b-input-group-append>
              <b-button variant="primary" @click="calcInventory">Calculate</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col>
        <p class="lead">Inventory Value: {{ inventoryValue }} {{spark.taxPayerData.currency}}</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <p>{{ salesValue }} {{spark.taxPayerData.currency}}</p>
      </b-col>
      <b-col>
        <b-form-group :label="$t('commercial.costValue')">
          <b-input placeholder="margin" v-model.number="Margin"></b-input>
          <b-input type="number" placeholder="Cost" v-model.number="cost_value" @input="calcCost"/>
        </b-form-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import crud from "../components/crud.vue";
export default {
  props: [
    "start_date",
    "end_date",
    "sales_value",
    "inventory_value",
    "cost_value",
    "chart_id",
    "chart_of_incomes",
    "margin"
  ],
  components: { crud: crud },
  data() {
    return {
      salesCharts: [],
      inventoryCharts: []
    };
  },
  computed: {
    Margin: {
      // getter
      get: function() {
        return this.margin;
      },
      // setter
      set: function(newValue) {
        this.$emit("update:margin", newValue);
      }
    },
    startDate: {
      // getter
      get: function() {
        return this.start_date;
      },
      // setter
      set: function(newValue) {
        console.log(newValue);
        this.$emit("update:start_date", newValue);
      }
    },
    endDate: {
      // getter
      get: function() {
        return this.end_date;
      },
      // setter
      set: function(newValue) {
        this.$emit("update:end_date", newValue);
      }
    },
    salesValue: {
      // getter
      get: function() {
        return this.sales_value;
      },
      // setter
      set: function(newValue) {
        this.$emit("update:sales_value", newValue);
      }
    },
    inventoryValue: {
      // getter
      get: function() {
        return this.inventory_value;
      },
      // setter
      set: function(newValue) {
        this.$emit("update:inventory_value", newValue);
      }
    },
    costValue: {
      // getter
      get: function() {
        return this.cost_value;
      },
      // setter
      set: function(newValue) {
        this.$emit("update:cost_value", newValue);
      }
    },
    chartId: {
      // getter
      get: function() {
        return this.chart_id;
      },
      // setter
      set: function(newValue) {
        this.$emit("update:chart_id", newValue);
      }
    },
    chartofIncomes: {
      // getter
      get: function() {
        return this.chart_of_incomes;
      },
      // setter
      set: function(newValue) {
        this.$emit("update:chart_of_incomes", newValue);
      }
    },

    baseUrl() {
      return (
        "/api/" + this.$route.params.taxPayer + "/" + this.$route.params.cycle
      );
    }
  },
  methods: {
    calcSales() {
      var app = this;

      crud.methods
        .onUpdate(
          app.baseUrl + "/commercial/inventories/calc-revenue",
          app._props
        )
        .then(function(response) {
          if (response.status == 200) {
            app.sales_value = response.data;
          }
        })
        .catch(function(error) {
          console.log(error);
          app.$snack.danger({
            text: this.$i18n.t("general.errorMessage") + error.message
          });
        });
    },
    calcInventory() {
      var app = this;

      crud.methods
        .onUpdate(
          app.baseUrl + "/commercial/inventories/calc-inventory",
          app._props
        )
        .then(function(response) {
          if (response.status == 200) {
            console.log(response.data);
            app.inventoryValue = response.data;
          }
        })
        .catch(function(error) {
          console.log(error);
          app.$snack.danger({
            text: this.$i18n.t("general.errorMessage") + error.message
          });
        });
    },
    calcCost() {
      var app = this;
      console.log(app.cost_value);
      if (app.cost_value < app.inventory_value || app.cost_value == undefined) {
        app.Margin = (app.cost_value / app.inventory_value) * 100;
        app.costValue = app.cost_value;
      } else {
        app.margin = 0;
        app.cost_value = 0;
        app.$snack.danger({
          text: "Value is Less Than Inventory Value"
        });
      }
    }
  },
  mounted() {
    var app = this;

    crud.methods
      .onRead(app.baseUrl + "/accounting/charts/for/income/stockables/")
      .then(function(response) {
        app.salesCharts = response.data.data;
      });

    crud.methods
      .onRead(app.baseUrl + "/accounting/charts/for/inventories/")
      .then(function(response) {
        app.inventoryCharts = response.data.data;
      });
  }
};
</script>

