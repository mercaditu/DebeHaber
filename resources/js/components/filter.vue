<template>
  <div>
     <b-col>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-form-select v-model="column">
                        <option
                          v-for="column in $route.meta.columns.filter(c => c.searchable)"
                          :value="column.key"
                          v-bind:key="column.index"
                          href="#"
                        >{{$t(column.label)}}</option>
                      </b-form-select>
                    </b-input-group-prepend>
                    
                    <b-form-select v-model="condition">
                        <option
                          v-for="condition in conditions"
                          :value="condition.value"
                          v-bind:key="condition.index"
                          href="#"
                        >{{$t(condition.label)}}</option>
                    </b-form-select>

                    <b-form-input v-model="query" placeholder="Type to Search"></b-form-input>

                    <b-input-group-append>
                      <b-button @click="add()">Apply</b-button>
                      <b-button @click="remove()">Remove</b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-col>
  </div>
</template>

<script>
import crud from "../components/crud.vue";
export default {
  components: { crud: crud },
  //props: ["parentCode", "parentName", "parent_id"],
  data: () => ({
    column: "",
    condition: "",
    query: "",
    conditions: [{ label : 'Equals' , value : '='}]
  }),
  computed: {
   
  },
  methods: {
    add()
    {
      var app=this;
      app.$parent.$parent.addFilter(app,app.column,app.condition,app.query);
       app.$parent.refresh( "/api" + 
        app.$route.path +
          "?" +
          app.$parent.$parent.filters
      );
    },
    remove()
    {
      var app=this;
      app.$parent.$parent.removeComponent(app);
    },
  
  },
  mounted() {
    //do something after mounting vue instance
    var app = this;
  }
};
</script>
