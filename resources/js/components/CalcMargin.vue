<template>
  <div>
    <b-input-group>
      <b-input
        type="number"
        placeholder="Cost"
        v-model.number="discountValue"
        @input="calcCost"
      />
      <b-input-group-append>
        <b-input placeholder="margin" v-model.number="margin"></b-input>
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
      disocunt_value: 0,
      inventory_value: 0,
      margin: 0
    };
  },
  computed: {
    discountValue: {
      // getter
      get: function() {
        return this.discount_value;
      },
      // setter
      set: function(newValue) {
        this.disocunt_value = newValue;
        this.$emit("update:discount_value", newValue);
      }
    },
    baseUrl() {
      return (
        "/api/" + this.$route.params.taxPayer + "/" + this.$route.params.cycle
      );
    }
  },
  methods: {
    calcCost() {
      var app = this;
      app.inventory_value = app.$parent.$parent.data.inventory_value;

      if (
        app.disocunt_value < app.inventory_value ||
        app.disocunt_value == undefined
      ) {
        app.margin = (app.disocunt_value / app.inventory_value) * 100;
        app.margin = app.margin.toFixed(2);
      } else {
        app.margin = 0;
        app.disocunt_value = 0;
        app.$snack.danger({
          text: "Value is Less Than Inventory Value"
        });
      }
    }
  },
  mounted() {}
};
</script>
