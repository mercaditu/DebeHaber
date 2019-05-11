<template>
  <div>
    <v-select v-model="Item" label="name" :options="collections"></v-select>
    <!-- <multiselect
      v-model="Item"
      :options="collections"
      :placeholder="$t('general.pleaseSelect')"
      @input="Item"
      label="name"
      track-by="name"
    ></multiselect> -->
  </div>
</template>

<script>
import crud from "../components/crud.vue";
export default {
  components: { crud: crud },
  props: ["item","api", "options"],
  data: () => ({
    collections: [],
    chart_id : ''
  }),
  computed: {
    Item: {
      // getter
      get: function() {
        return this.item;
      },
      // setter
      set: function(newValue) {
        this.$emit("update:item", newValue);
      }
    },
    baseUrl() {
      return (
        "/api/" + this.$route.params.taxPayer + "/" + this.$route.params.cycle
      );
    }
  },
  mounted() {
    //do something after mounting vue instance
    var app = this;
    if (app.api === "") {
      console.log(app);
      app.collections = app.options;
    } else {
      crud.methods.onRead(app.baseUrl + app.api).then(function(response) {
        if (app.value === "code") {
          response.data.data.forEach(element => {
            app.collections.push({
              id: element.code,
              name: element.name
            });
          });
        } else {
          response.data.data.forEach(element => {
            app.collections.push({
              id: element.id,
              name: element.name
            });
          });
        }
      });
    }
  }
};
</script>
