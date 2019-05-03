<template>
  <div>
    <multiselect
      v-model="item"
      :options="collections"
      :placeholder="$t('general.pleaseSelect')"
      @input="item"
      label="name"
      track-by="name"
    ></multiselect>
  </div>
</template>

<script>
import multiselect from "vue-multiselect";
import crud from "../components/crud.vue";
export default {
  components: { crud: crud, multiselect },
  props: ["item", "api", "options"],
  data: () => ({
    collections: []
  }),
  computed: {
    document_id: {
      // getter
      get: function() {
        return this.Id;
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
