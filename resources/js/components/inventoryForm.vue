<template>
  <b-card>
    <b-container>
      <b-row>
        <b-col>
          <b-form-group :label="$t('commercial.startDate')">
            <b-input
              type="date"
              required
              placeholder="Missing Information"
              v-model="data.start_date"
            />
          </b-form-group>
          <b-form-group :label="$t('commercial.endDate')">
            <b-input
              type="date"
              required
              placeholder="Missing Information"
              v-model="data.end_date"
            />
          </b-form-group>
          <b-form-group :label="$t('commercial.salesValue')">
            <b-input type="number" placeholder="Sales Value" v-model.number="data.sales_value"/>
          </b-form-group>
          <b-form-group :label="$t('commercial.costValue')">
            <b-input placeholder="margin"></b-input>
            <b-input type="number" placeholder="Cost" v-model.number="data.cost_value"/>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group :label="$t('commercial.chart')">
            <b-form-select v-model="data.chart_id">
              <option v-for="item in charts" :key="item.key" :value="item.id">{{ item.name }}</option>
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
    </b-container>
  </b-card>
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
        sales_vale: "",
        cost_vale: "",
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

  mounted() {
    var app = this;

    crud.methods
      .onRead(app.baseUrl + "/accounting/charts/for/income/")
      .then(function(response) {
        app.charts = response.data.data;
      });
  }
};
</script>

