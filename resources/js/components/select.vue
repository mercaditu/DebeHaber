<template>
  <div>
     <multiselect v-model="Item" :options="collections" 
        placeholder="Select one"  @input="itemSelect"
        label="name" 
         track-by="name"></multiselect>
    <!-- <b-form-select v-model="document_id" :options="collections"></b-form-select> -->
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import crud from "../components/crud.vue";
export default {
  components: { crud: crud ,Multiselect},
  props: ["Item", "api", "options"],
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
        console.log(newValue);
        this.$emit("update:Item", newValue);
      }
    },
    baseUrl() {
      return (
        "/api/" + this.$route.params.taxPayer + "/" + this.$route.params.cycle
      );
    }
  },
  methods: {
    itemSelect() {
        //do something after mounting vue instance
        var app = this;
        app.document_id = app.Item;
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
              id: element.code,
              name: element.name
            });
          });
        } else {
          response.data.data.forEach(element => {
            app.collections.push({
              // index: this.data.details.length + 1,
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
