<template>
  <div>
    <b-card
      title="First Step"
      sub-title="Select a date range and a sales income category (related to stockable items) and press calculate"
    >
      <b-row>
        <b-col>
          <b-form-group :label="$t('general.startDate')">
            <b-input type="date" required v-model="data.start_date"/>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group :label="$t('general.endDate')">
            <b-input type="date" required v-model="data.end_date"/>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group :label="$t('commercial.income')">
            <b-input-group>
              <b-form-select v-model="data.chart_id">
                <option v-for="item in charts" :key="item.key" :value="item.id">{{ item.name }}</option>
              </b-form-select>
              <b-input-group-append>
                <b-button variant="primary">Calculate</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col>
          <p class="lead">Sales Value: {{ data.sales_value }} PYG</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group :label="$t('commercial.inventory')">
            <b-input-group>
              <b-form-select v-model="data.chart_id">
                <option v-for="item in charts" :key="item.key" :value="item.id">{{ item.name }}</option>
              </b-form-select>
              <b-input-group-append>
                <b-button variant="primary">Calculate</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col>
          <p class="lead">Inventory Value: {{ data.sales_value }} PYG</p>
        </b-col>
      </b-row>
    </b-card>
    <b-card title="Second Step" sub-title="Check or manually update your cost value">
      <b-row>
        <b-col>
          <p>{{ data.sales_value }} PYG</p>
        </b-col>
        <b-col>
          <b-form-group :label="$t('commercial.costValue')">
            <b-input placeholder="margin"></b-input>
            <b-input type="number" placeholder="Cost" v-model.number="data.cost_value"/>
          </b-form-group>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import crud from "../components/crud.vue";
export default {
  components: { crud: crud },
  data() {
    return {
      data: {
        start_date: "",
        end_date: "",
        sales_value: "",
        inventory_value: "",
        chart_id: ""
      },
      salesCharts: [],
      inventoryCharts: []
    };
  },
  computed: {
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
        .onRead(app.baseUrl + "/accounting/charts/for/income/")
        .then(function(response) {
          app.charts = response.data.data;
        });
    },
    calcInventory() {
      var app = this;

      crud.methods
        .onRead(app.baseUrl + "/accounting/charts/for/income/")
        .then(function(response) {
          app.charts = response.data.data;
        });
    }
  },
  mounted() {
    var app = this;

    crud.methods
      .onRead(app.baseUrl + "/accounting/charts/for/income/")
      .then(function(response) {
        app.salesCharts = response.data.data;
      });
  }
};
</script>

