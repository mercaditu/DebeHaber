<template>
  <div>
    <b-input-group>
            <b-form-select v-model="chartId">
              <option v-for="item in salesCharts" :key="item.key" :value="item.id">{{ item.name }}</option>
            </b-form-select>
            <b-input-group-append>
              <b-button variant="primary" @click="calcSales">Calculate</b-button>
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
      salesCharts: [],
      start_date : '',
      end_date : '',
      chart_id:''
    };
  },
  computed: {
    
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
    chartId: {
      // getter
      get: function() {
        return this.chart_id;
      },
      // setter
      set: function(newValue) {
        this.chart_id = newValue;
        this.$emit("update:chart_id", newValue);
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
      app.start_date=app.$parent.$parent.data.start_date;
        app.end_date=app.$parent.$parent.data.end_date;
      crud.methods
        .onUpdate(
          app.baseUrl + "/commercial/inventories/calc-revenue",
          app._data
        )
        .then(function(response) {
          if (response.status == 200) {
            app.salesValue = response.data;
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
      .onRead(app.baseUrl + "/accounting/charts/for/income/stockables/")
      .then(function(response) {
        app.salesCharts = response.data.data;
      });

   
  }
};
</script>

