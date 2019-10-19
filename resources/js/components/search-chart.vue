<template>
  <div>
    <b-input-group>
      <b-input
        type="text"
        v-model="chartCode"
        placeholder="Search for Chart Code"
        @keyup="searchChartcode()"
      />
      <b-input
        type="text"
        v-model="chartName"
        placeholder="Search for Chart Name"
        @keyup="searchChartname()"
      />
    </b-input-group>
    <b-list-group>
      <b-list-group-item v-for="chart in charts" @click="select(chart)" :key="chart.id">
        <b>{{ chart.name }}</b>
        | {{ chart.code }}
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import crud from "../components/crud.vue";
export default {
  components: { crud: crud },
  props: ["parentCode", "parentName", "parent_id"],
  data: () => ({
    searchname: "",
    searchcode: "",
    selected: [],
    charts: []
  }),
  computed: {
    chartName: {
      // getter
      get: function() {
        return this.parentName;
      },
      // setter
      set: function(newValue) {
        this.searchname = newValue;
      }
    },
    chartCode: {
      // getter
      get: function() {
        return this.parentCode;
      },
      // setter
      set: function(newValue) {
        this.searchcode = newValue;
      }
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
    updateValue: function(value) {
      this.$emit("update:code", value.code + ".0");
      this.$emit("update:parentCode", value.code);
      this.$emit("update:parentName", value.name);
      this.$emit("update:parent_id", value.id);
      this.selected = value;
    },
    select(chart) {
      var app = this;
      app.updateValue(chart);
      app.charts = [];
      app.searchname = chart.name;
      app.searchcode = chart.code;
    },
    searchChartname() {
      var app = this;
      crud.methods
        .onRead(app.baseUrl + "/search/chartsName/" + app.searchname)
        .then(function(response) {
          app.charts = response.data;
        });
    },
    searchChartcode() {
      var app = this;

      crud.methods
        .onRead(app.baseUrl + "/search/chartsCode/" + app.searchcode)
        .then(function(response) {
          app.charts = response.data;
        });
    }
  },
  mounted() {
    //do something after mounting vue instance
    var app = this;
  }
};
</script>
