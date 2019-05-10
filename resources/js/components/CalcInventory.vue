<template>
  <div>
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
  </div>
</template>

<script>
import crud from "../components/crud.vue";
export default {
  components: { crud: crud },
  data() {
    return {
      inventoryCharts: [],
      start_date : '',
      end_date : '',
      chart_sales_id:''
    };
  },
  computed: {
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
    chartofIncomes: {
      // getter
      get: function() {
        return this.chart_sales_id;
      },
      // setter
      set: function(newValue) {
        this.chart_sales_id = newValue;
        this.$emit("update:chart_sales_id", newValue);
      }
    },

    baseUrl() {
      return (
        "/api/" + this.$route.params.taxPayer + "/" + this.$route.params.cycle
      );
    }
  },
  methods: {
    calcInventory() {
      var app = this;
        app.start_date=app.$parent.$parent.data.start_date;
        app.end_date=app.$parent.$parent.data.end_date;
      crud.methods
        .onUpdate(
          app.baseUrl + "/commercial/inventories/calc-inventory",
          app._data
        )
        .then(function(response) {
          if (response.status == 200) {
            app.inventoryValue = response.data;
          }
        })
        .catch(function(error) {
          console.log(error);
          app.$snack.danger({
            text: this.$i18n.t("general.errorMessage") + error.message
          });
        });
    }
  },
  mounted() {
    var app = this;

    crud.methods
      .onRead(app.baseUrl + "/accounting/charts/for/inventories/")
      .then(function(response) {
        app.inventoryCharts = response.data.data;
      });
  }
};
</script>

