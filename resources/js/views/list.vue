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
              <b-pagination-nav pages="['?page=1', '?page=2', '?page=3']" use-router></b-pagination-nav>
              <b-card no-body>
                <b-table
                  hover
                  responsive
                  :items="items"
                  :fields="$route.meta.columns"
                  :current-page="currentPage"
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
                :total-rows="meta.total"
                :per-page="meta.per_page"
                @change="onList()"
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
    currentPage: 1
  }),

  computed: {
    formURL: function() {
      return this.$route.name.replace("List", "Form");
    },
    uploadURL: function() {
      return "";
    }
  },

  mounted() {
    if (this.$route.meta.columns != null) {
      this.$route.meta.columns.forEach(element => {
        element.label = this.$t(element.label);
      });
    }
  }
};
</script>
