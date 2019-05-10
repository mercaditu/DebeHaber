<template>
  <div>
    <b-input-group>
      <b-form-select v-model="chart_id">
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
  components: { crud: crud },
  data() {
    return {
      charts: [],
      chart_id: "",
      value: ""
    };
  },
  computed: {
    inventoryValue: {
      // getter
      get: function() {
        return this.value;
      },
      // setter
      set: function(newValue) {
        this.$emit("update:value", newValue);
      }
    },

    baseUrl() {
      return (
        "/api/" +
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
            "/chart"
        )
        .then(function(response) {
          if (response.status == 200) {
            app.value = response.data;
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
      .onRead(app.baseUrl + "/charts/for/inventories/")
      .then(function(response) {
        app.charts = response.data.data;
      });
  }
};
</script>

