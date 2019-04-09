<template>
  <div>
    <b-form-select v-model="document_id" :options="collections"></b-form-select>
  </div>
</template>

<script>
import crud from "../components/crud.vue";
export default {
  components: { crud: crud },
  props: ["Id", "api", "options"],
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
        this.$emit("update:Id", newValue);
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
              // index: this.data.details.length + 1,
              value: element.code,
              text: element.name
            });
          });
        } else {
          response.data.data.forEach(element => {
            app.collections.push({
              // index: this.data.details.length + 1,
              value: element.id,
              text: element.name
            });
          });
        }
      });
    }
  }
};
</script>
