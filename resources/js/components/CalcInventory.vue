<template>
  <div>
    <b-input-group>
      <b-form-select v-model="chartId">
        <option v-for="item in charts" :key="item.key" :value="item.id">{{ item.name }}</option>
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
  props: ["api"],
  components: { crud: crud },
  data() {
    return {
      charts: [],
      chart_id: "",
      value: ""
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
        this.$emit("update:value", newValue);
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
       this.spark.mainUrl + "/api/" +
        this.$route.params.taxPayer +
        "/" +
        this.$route.params.cycle +
        "/accounting"
      );
    }
  },
  methods: {
    calcInventory() {
      var app = this;

      crud.methods
        .onRead(
          app.baseUrl +
            "/journals/stats/" +
            app.$parent.$parent.data.start_date +
            "/" +
            app.$parent.$parent.data.end_date +
            "/chart/" +
            app.chart_id
        )
        .then(function(response) {
          if (response.status == 200) {
            app.Value = response.data;
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
    crud.methods.onRead(app.baseUrl + app.api).then(function(response) {
      app.charts = response.data.data;
    });
  }
};
</script>

