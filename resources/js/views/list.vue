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
          <b-card no-body>
            <b-list-group flush>
              <b-list-group-item
                v-for="action in $route.meta.actions"
                v-bind:key="action.key"
                :href="action.url"
              >
                <i class="material-icons">{{ action.icon }}</i>
                {{ $t(action.name) }}
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
              <b-button-group class="mx-1">
                
                <b-button @click="refresh(items.links.first)">&laquo;</b-button>
                <b-button @click="refresh(items.links.prev)">&lsaquo;</b-button>

                <b-button
                  v-for="action in $route.meta.actions"
                  v-bind:key="action.index"
                >{{ action.label }}</b-button>

                <b-button @click="refresh(items.links.next)">&rsaquo;</b-button>
                <b-button @click="refresh(items.links.last)">&raquo;</b-button>
              </b-button-group>
              <!-- <b-pagination-nav
                hide-goto-end-buttons="false"
                :link-gen="$parent.linkGen"
                :pages="$route.meta.actions"
                use-router
              ></b-pagination-nav>-->

              <!-- <b-input-group>
                <b-form-input v-model="$parent.filter" placeholder="Type to Search"></b-form-input>
                <b-input-group-append>
                  <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                </b-input-group-append>
              </b-input-group>-->
              <b-card no-body>
                <b-table
                  id="my-table"
                  hover
                  responsive
                  :items="items.data"
                  :per-page="10"
                  :fields="$route.meta.columns"
                  :current-page="$parent.currentPage"
                  :filter="$parent.filter"
                  show-empty
                >
                  <template slot="actions" slot-scope="data">
                    <table-actions :row="data.item"></table-actions>
                  </template>

                  <div slot="table-busy">
                    <table-loading></table-loading>
                  </div>

                  <template slot="empty" slot-scope="data">
                    <table-empty></table-empty>
                  </template>

                  <div slot="table-busy" class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                  </div>
                </b-table>
              </b-card>

              <b-pagination
                align="center"
                v-model="$parent.currentPage"
                :total-rows="items.meta.total"
                :per-page="10"
                aria-controls="my-table"
              ></b-pagination>
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
    // currentPage: 1,
    //  filter: null,
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
    // Returning a router-link `to` object
    linkGen(pageNum) {
      return { path: `sales/0` };
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
