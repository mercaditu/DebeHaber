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
            <component v-if="component.type != 'links'" v-bind:is="component.type"></component>

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
              <b-row class="mb-10 mt-10">
                <b-col></b-col>
                <b-col>
                  <b-button-toolbar
                    class="float-right"
                    key-nav
                    aria-label="Toolbar with button groups"
                  >
                    <b-button-group class="mx-1">
                      <b-button
                        @click="refresh(items.links.first)"
                        variant="primary"
                        size="sm"
                      >&laquo;</b-button>
                      <b-button
                        @click="refresh(items.links.prev)"
                        variant="primary"
                        size="sm"
                      >&lsaquo;</b-button>
                    </b-button-group>

                    <b-button-group class="mx-1">
                      <b-button
                        v-for="child in this.$router.options.routes.find(r => r.name === $route.name).children"
                        v-bind:key="child.index"
                        :to="child.url"
                        :variant="child.variant"
                        size="sm"
                      >
                        <i class="material-icons md-18">{{ child.icon }}</i>
                        {{ $t(child.label) }}
                      </b-button>
                    </b-button-group>

                    <b-button-group class="mx-1">
                      <b-button
                        @click="$parent.showFilter = !$parent.showFilter"
                        variant="primary"
                        size="sm"
                      >
                        <i class="material-icons md-18">search</i>
                      </b-button>
                    </b-button-group>

                    <b-button-group class="mx-1">
                      <b-button
                        @click="refresh(items.links.next)"
                        variant="primary"
                        size="sm"
                      >&rsaquo;</b-button>
                      <b-button
                        @click="refresh(items.links.last)"
                        variant="primary"
                        size="sm"
                      >&raquo;</b-button>
                    </b-button-group>
                  </b-button-toolbar>
                </b-col>
              </b-row>
              <!-- {{ this.$router.options.routes }} -->
              <b-card no-body>
                <div v-if="$parent.showFilter == true">
                  <filter-data></filter-data>
                </div>
                <b-table
                  id="my-table"
                  hover
                  responsive
                  :items="items.data"
                  :per-page="items.meta != null ? items.meta.per - page : 10"
                  :fields="$route.meta.columns"
                  :current-page="items.meta != null ? items.meta.current_page : 1"
                  show-empty
                >
                  <template slot="actions" slot-scope="data">
                    <table-actions :row="data.item"></table-actions>
                  </template>

                  <div slot="table-busy">
                    <table-loading></table-loading>
                  </div>

                  <template slot="empty">
                    <b-container class="m-25">
                      <b-row align-v="center">
                        <b-col>
                          <b-img right fluid center :src="$route.meta.img"/>
                        </b-col>
                        <b-col>
                          <h4>Nothing here</h4>
                          <p
                            class="lead"
                          >But you can change that, start by clicking one of the following options.</p>
                          <b-button
                            v-for="action in $route.meta.actions"
                            v-bind:key="action.index"
                            :to="action.url"
                            :variant="action.variant"
                          >
                            <i class="material-icons md-18">{{ action.icon }}</i>
                            {{ $t(action.label) }}
                          </b-button>
                        </b-col>
                      </b-row>
                    </b-container>
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
    components: [],
    showFilter: false
  }),

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
