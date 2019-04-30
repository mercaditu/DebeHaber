<template>
  <div>
    <b-row v-if="$route.name.includes('List')">
      <b-col>
        <b-card-group deck>
          <b-card bg-variant="dark" text-variant="white">
            <h4 class="upper-case">
              <img :src="$route.meta.img" alt class="ml-5 mr-5" width="26">
              {{ $t($route.meta.title) }}
            </h4>
          </b-card>

          <invoices-this-month-kpi class="d-none d-xl-block"></invoices-this-month-kpi>

          <b-card no-body>
            <b-list-group-item href="#">
              <i class="material-icons">help</i>
              {{ $t('general.manual') }}
            </b-list-group-item>
            <b-list-group-item href="#" @click="GenerateJournal()">
              <i class="material-icons">autorenew</i>
              {{ $t('accounting.generateJournal') }}
            </b-list-group-item>
            <b-list-group-item :to="{ name: formURL, params: { id: 0}}">
              <i class="material-icons md-light">add_box</i>
              {{ $t('general.createNewRecord') }}
            </b-list-group-item>
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div v-if="$route.name.includes('List')">
          <crud :columns="columns" inline-template>
            <div>
              <b-button-group class="mx-1">
                <b-button @click="refresh(items.links.first)">&laquo;</b-button>
                <b-button @click="refresh(items.links.prev)">&lsaquo;</b-button>

                <b-button 
                  v-for="action in $route.meta.actions"
                  v-bind:key="action.index" :href="action.url"
                >{{$t(action.label)}}</b-button>
                
              <b-input-group>
                <b-form-input v-model="$parent.filter" placeholder="Type to Search"></b-form-input>
                <b-input-group-append>
                  <b-button  @click="refresh(items.meta.path + '?page=' + items.meta.current_page + ' & filter[partner_name]=' + $parent.filter + ' & filter[partner_taxid]=' + $parent.filter + ' & filter[number]=' + $parent.filter)">Filter</b-button>
                </b-input-group-append>
              </b-input-group>

                <b-button @click="refresh(items.links.next)">&rsaquo;</b-button>
                <b-button @click="refresh(items.links.last)">&raquo;</b-button>
              </b-button-group>
              <b-card no-body>
                <b-table
                  hover
                  responsive
                  :items="items.data"
                  :fields="columns"
                  :current-page="current_page"
                >
                  <template
                    slot="date"
                    slot-scope="data"
                  >{{ new Date(data.item.date).toLocaleDateString() }}</template>

                  <template slot="total" slot-scope="data">
                    <span class="float-right">
                      {{ new Number(sum(data.item.details, 'debit')).toLocaleString() }}
                      <small
                        class="text-success text-uppercase"
                        v-if="data.item.currency != null"
                      >{{ data.item.currency.code }}</small>
                    </span>
                  </template>

                  <template slot="row-details" slot-scope="row">
                    <b-row>
                      <b-col cols="8" colspan="2">
                        <span class="text-muted">{{ $t('accounting.chartOfAccounts') }}</span>
                      </b-col>
                      <b-col cols="2" class="text-sm-right">
                        <span class="text-muted">{{ $t('general.credit') }}</span>
                      </b-col>
                      <b-col cols="2" class="text-sm-right">
                        <span class="text-muted">{{ $t('general.debit') }}</span>
                      </b-col>
                    </b-row>
                    <b-row v-for="detail in row.item.details" :key="detail.key">
                      <b-col cols="2">
                        <b>{{ detail.chart.code }}</b>
                      </b-col>
                      <b-col cols="6">
                        <chart-types
                          :chart="detail.chart.name"
                          :type="detail.chart.type"
                          :sub_type="detail.chart.sub_type"
                        />
                      </b-col>
                      <b-col
                        cols="2"
                        class="text-sm-right"
                      >{{ new Number(detail.credit).toLocaleString() }}</b-col>
                      <b-col
                        cols="2"
                        class="text-sm-right"
                      >{{ new Number(detail.debit).toLocaleString() }}</b-col>
                    </b-row>
                  </template>

                  <template slot="hasDetails" slot-scope="row">
                    <b-button-group size="sm" class="show-when-hovered">
                      <b-button @click="row.toggleDetails">
                        <i class="material-icons md-19">remove_red_eye</i>
                      </b-button>
                    </b-button-group>
                  </template>

                  <template slot="actions" slot-scope="data">
                    <table-actions :row="data.item"></table-actions>
                  </template>

                  <div slot="table-busy">
                    <table-loading></table-loading>
                  </div>

                  <template slot="empty" slot-scope="scope">
                    <table-empty></table-empty>
                  </template>
                </b-table>
              </b-card>
              
            </div>
          </crud>
        </div>
        <router-view v-else></router-view>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import crud from "../../components/crud.vue";
export default {
  components: { crud },
  data: () => ({
    cycle: []
  }),
  computed: {
    formURL: function() {
      return this.$route.name.replace("List", "Form");
    },
    columns() {
      return [
        {
          key: "date",
          sortable: true
        },
        {
          key: "comment",
          label: this.$i18n.t("general.comment"),
          sortable: true
        },
        {
          key: "debit",
          formatter: (value, key, item) => {
            return new Number(
              item.details.reduce(function(sum, row) {
                return sum + new Number(row["debit"]);
              }, 0)
            ).toLocaleString();
          },
          label: this.$i18n.t("commercial.value"),
          sortable: true
        },
        {
          key: "hasDetails",
          label: "",
          sortable: false
        },
        {
          key: "actions",
          label: "",
          sortable: false
        }
      ];
    },
    baseUrl() {
      return (
        "/api/" + this.$route.params.taxPayer + "/" + this.$route.params.cycle
      );
    }
  },
  methods: {
    GenerateJournal() {
      var app = this;

      crud.methods
        .onRead(
          app.baseUrl +
            "/generate-journals/" +
            app.cycle.start_date +
            "/" +
            app.cycle.end_date
        )
        .then(function(response) {
          app.$snack.success({
            text: app.$i18n.t("accounting.generateJournal")
          });
        });
    }
  },
  mounted() {
    var app = this;

    crud.methods
      .onRead(app.baseUrl + "/config/cycles/" + this.$route.params.cycle)
      .then(function(response) {
        app.cycle = response.data.data;
      });
  }
};
</script>
