<template>
  <div>
    <b-row>
      <b-col>
        <b-form-group :label="$t('accounting.template')">
          <b-form-select v-model="template">
            <option v-for="item in templates" :key="item.key" :value="item">{{ item.name }}</option>
          </b-form-select>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group :label="$t('commercial.value')">
          <b-input-group-append>
            <b-input type="text" placeholder="Value" v-model="Value" />
            <b-btn variant="primary" @click="onGenerateDetail()">{{ $t('general.generate') }}</b-btn>
          </b-input-group-append>
        </b-form-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import crud from "../components/crud.vue";
export default {
  components: { crud: crud },
  data() {
    return {
      template_id: "",
      template: "",
      value: "",
      pageUrl: "/accounting/journals",
      accountCharts: [],
      templates: []
    };
  },
  computed: {
    Value: {
      // getter
      get: function() {
        return this.value;
      },
      // setter
      set: function(newValue) {
        this.value = newValue;
        this.$emit("update:value", newValue);
      }
    },
    Balance() {
      var debit = 0;
      var credit = 0;
      this.data.details.forEach(e => {
        debit += e.debit;
        credit += e.credit;
      });

      return debit - credit;
    },

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
    onGenerateDetail() {
      var app = this;
      app.template_id = app.template.id;
      this.$emit("update:template_id", app.template.id);
      app.template.details.forEach(element => {
        app.$parent.$parent.data.details.push({
          id: 0,
          chart: element.chart,
          chart_id: element.chart.id,
          debit: app.value * element.debit_coef,
          credit: app.value * element.credit_coef
        });
      });
    }
  },

  mounted() {
    var app = this;

    crud.methods
      .onRead(app.baseUrl + "/accounting/charts/for/accountables/")
      .then(function(response) {
        console.log(response.data);
        app.accountCharts = response.data;
      });

    crud.methods
      .onRead(app.baseUrl + "/accounting/journal-templates")
      .then(function(response) {
        console.log(response.data);
        app.templates = response.data.data;
      });
  }
};
</script>

