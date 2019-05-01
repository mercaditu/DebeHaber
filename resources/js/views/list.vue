<template>
  <div>
    <b-row v-if="$route.name.includes('List')">
      <b-col>
        <b-card-group deck>
          <b-card bg-variant="dark" text-variant="light">
            <h1>
              <img :src="$route.meta.img" alt class="ml-5 mr-5" width="26">
              {{ $t($route.meta.title) }}
            </h1>
          </b-card>
          <b-card v-for="component in $route.meta.components" v-bind:key="component.key" no-body>
            <component v-if="component.type != 'links'" :is="component.type"></component>

            <b-list-group v-else flush>
              <b-list-group-item
                v-for="link in component.links"
                v-bind:key="link.key"
                :href="link.url"
              >
                <i class="material-icons">{{ link.icon }}</i>
                {{ $t(link.label) }}
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div v-if="$route.name.includes('List')">
          <crud inline-template>
            <div>
              <b-row>
                <b-col>
                 
                  <b-button @click="$parent.addComponent()">Add Filter</b-button>
                  <b-list-group  flush>
                    <b-list-group-item
                      v-for="filter in $parent.filters"
                      v-bind:key="filter.key"
                    >

                   {{ filter }}
                    <b-button @click="$parent.removeFilter(filter)" variant="primary">X</b-button>
                </b-list-group-item>
            </b-list-group>
                </b-col>
                <b-col>
                  <b-button-toolbar
                    class="float-right"
                    key-nav
                    aria-label="Toolbar with button groups"
                  >
                    <b-button-group class="mx-1">
                      <b-button @click="refresh(items.links.first)" variant="primary">&laquo;</b-button>
                      <b-button @click="refresh(items.links.prev)" variant="primary">&lsaquo;</b-button>
                    </b-button-group>
                    <b-button-group class="mx-1">
                      <b-button
                        v-for="action in $route.meta.actions"
                        v-bind:key="action.index"
                        :to="action.url"
                        :variant="action.variant"
                      >
                        <i class="material-icons md-18">{{ action.icon }}</i>
                        {{ $t(action.label) }}
                      </b-button>
                    </b-button-group>
                    <b-button-group class="mx-1">
                      <b-button @click="refresh(items.links.next)" variant="primary">&rsaquo;</b-button>
                      <b-button @click="refresh(items.links.last)" variant="primary">&raquo;</b-button>
                    </b-button-group>
                  </b-button-toolbar>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-input-group>
                    <b-input-group-prepend v-for="component in $parent.components"  v-bind:key="component.index">
                      <filter-data></filter-data>
                      <!-- <b-form-select v-model="$parent.column">
                        <option
                          v-for="column in $route.meta.columns.filter(c => c.searchable)"
                          :value="column.key"
                          v-bind:key="column.index"
                          href="#"
                        >{{$t(column.label)}}</option>
                      </b-form-select> -->
                    </b-input-group-prepend>

                    <!-- <b-form-input v-model="$parent.query" placeholder="Type to Search"></b-form-input> -->

                    <!-- <b-input-group-append>
                      <b-button @click="$parent.addFilter(items.meta.path, items.meta.current_page)">Add Filter</b-button>
                    </b-input-group-append> -->
                  </b-input-group>
                </b-col>
              </b-row>

              <b-card no-body>

                <b-table
                  id="my-table"
                  hover
                  responsive
                  :items="items.data"
                  :per-page="10"
                  :fields="$route.meta.columns"
                  :current-page="items.meta.current_page!=null?items.meta.current_page:1"
                  show-empty
                >
                  <template slot="actions" slot-scope="data">
                    <table-actions :row="data.item"></table-actions>
                  </template>

                  <div slot="table-busy">
                    <table-loading></table-loading>
                  </div>

                  <template slot="empty" slot-scope="data">
                    <b-row>
                      <b-col>
                        <b-img right fluid center :src="$route.meta.img"/>
                      </b-col>
                      <b-col>
                        <h4>Nothing here</h4>
                        <p class="lead">But you can change that</p>
                      </b-col>
                    </b-row>
                  </template>

                  <div slot="table-busy" class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                  </div>
                </b-table>
              </b-card>
            </div>
          </crud>
        </div>
        <keep-alive v-else>
          <router-view></router-view>
        </keep-alive>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import crud from "../components/crud.vue";
export default {
  components: { crud },
  data: () => ({
    components:[],
    filters:[]
  }),

  computed: {
    formURL: function() {
      return this.$route.name.replace("List", "Form");
    },
    uploadURL: function() {
      return "";
    }
  },
  methods: {
    addComponent() {
      var app=this;
      app.components.push('filter');
      // var filter = [];
      // filter.column = this.column;
      // filter.query = this.query;
      // app.filters.push(filter);
      // var str='';
      // app.filters.forEach(element => {
      //   app.querystring += '&filter[' + element.column + ']=' + element.query
      //  });
      //   console.log(crud);
      
      // crud.refresh(
      //   path +
      //     "?page=" +
      //     currentPage +
      //     "&filter[" +
      //     this.column +
      //     "]=" +
      //    this.filter
      // );
    },
    removeComponent(compo) {
      var app=this;
      app.components.splice(this.components.indexOf(compo));
    },
    addFilter(compo,column,condition,query) {
      var app=this;
      app.filters.push(
         '&filter[' + column + ']' + condition + query
      );
      app.components.splice(this.components.indexOf(compo));
    },
    removeFilter(compo) {
      var app=this;
      app.filters.splice(this.components.indexOf(compo));
    }
  },
  mounted() {
    if (this.$route.meta.columns != null) {
      this.$route.meta.columns.forEach(element => {
        element.label = this.$t(element.label);
      });
    }
    if (this.$route.meta.actions != null) {
      this.$route.meta.actions.forEach(element => {
        element.text = this.$t(element.text);
      });
    }
  }
};
</script>
