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
            <p class="lead" v-if="$route.name.includes('List')">{{ $t($route.meta.description) }},</p>
          </b-card>

          <invoices-this-month-kpi class="d-none d-xl-block"></invoices-this-month-kpi>

          <b-card no-body>
            <b-list-group flush>
              <b-list-group-item href="#">
                <i class="material-icons">help</i>
                {{ $t('general.manual') }}
              </b-list-group-item>
              <b-list-group-item :to="{ name: uploadURL }">
                <i class="material-icons">cloud_upload</i>
                {{ $t('general.uploadFromExcel') }}
              </b-list-group-item>

              <b-list-group-item :to="{ name: formURL, params: { id: 0}}">
                <i class="material-icons md-light">add_box</i>
                {{ $t('general.createNewRecord') }}
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div v-if="$route.name.includes('List')">
          <crud :columns="columns" inline-template>
            <b-card no-body>
              <b-table
                hover
                responsive
                :items="items"
                :fields="columns"
                :current-page="current_page"
              >
                <template slot="type" slot-scope="data">
                  <chart-types :type="data.item.type" :sub_type="data.item.sub_type"/>
                </template>

                <template slot="code" slot-scope="data">
                  <span v-if="data.item.is_accountable">{{ data.item.code }}</span>
                  <b v-else>{{ data.item.code }}</b>
                </template>

                <template slot="name" slot-scope="data">
                  <span v-if="data.item.is_accountable">{{ data.item.name }}</span>
                  <b v-else>{{ data.item.name }}</b>
                </template>

                <template slot="actions" slot-scope="data">
                  <b-button-group
                    size="sm"
                    class="show-when-hovered"
                    v-if="data.item.is_accountable == 0"
                  >
                    <b-button
                      v-b-modal.chartOfAccounts
                      @click="$parent.createChild(data.item)"
                      ref="btnShow"
                    >
                      <i class="material-icons">playlist_add</i>
                    </b-button>
                  </b-button-group>
                  <div v-if="data.item.taxpayer_id != null">
                    <table-actions :row="data.item"></table-actions>

                    <b-button
                      size="sm"
                      v-b-modal.mergeChartOfAccounts
                      @click="$parent.mergeChart(data.item)"
                      ref="btnShow"
                    >
                      <i class="material-icons">delete</i>
                    </b-button>
                  </div>
                </template>

                <div slot="table-busy">
                  <table-loading></table-loading>
                </div>

                <template slot="empty">
                  <table-empty></table-empty>
                </template>
              </b-table>
              <!-- <b-pagination align="center" :total-rows="meta.total" :per-page="meta.per_page"  @change="onList()"></b-pagination> -->
            </b-card>
          </crud>
        </div>
        <router-view v-else></router-view>
      </b-col>
    </b-row>
    <b-modal id="chartOfAccounts" hide-footer centered title="Create Chart" ref="accountModel">
      <b-container v-if="parentChart != null">
        <b-form-group :label="$t('accounting.parentChart')">
          <b-input-group>
            <b-input
              readonly
              type="text"
              :placeholder="$t('commercial.parent')"
              v-model="parentChart.code"
            />
            <b-input-group-append>
              <b-input readonly type="text" v-model="parentChart.name"/>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>

        <b-form-group :label="$t('accounting.chart')">
          <b-input-group>
            <b-input required :placeholder="$t('commercial.code')" v-model.trim="newChart.code"/>
            <b-input-group-append>
              <b-input required :placeholder="$t('commercial.name')" v-model.trim="newChart.name"/>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>

        <b-row>
          <b-col>
            <b-button>{{ spark.enumChartType[newChart.type] }}</b-button>
          </b-col>
          <b-col>
            <b-form-group label="Is Accountable">
              <b-form-checkbox
                switch
                v-model="newChart.is_accountable"
                size="lg"
                name="check-button"
              >{{ $t('accounting.isAccountable') }}</b-form-checkbox>
            </b-form-group>
          </b-col>
        </b-row>

        <b-form-group
          label="Asset Types"
          v-if="newChart.type == 1"
          description="Only accountable charts can be used in journals or transactions. If marked as false, it can only be used to summarise child accounts."
        >
          <b-form-radio-group v-model.number="newChart.sub_type" :options="spark.enumAsset"/>
        </b-form-group>
        <b-form-group
          label="Liability Types"
          v-if="newChart.type == 2"
          description="Only accountable charts can be used in journals or transactions. If marked as false, it can only be used to summarise child accounts."
        >
          <b-form-radio-group v-model.number="newChart.sub_type" :options="spark.enumLiability"/>
        </b-form-group>
        <b-form-group
          label="Equity Types"
          v-if="newChart.type == 3"
          description="Only accountable charts can be used in journals or transactions. If marked as false, it can only be used to summarise child accounts."
        >
          <b-form-radio-group v-model.number="newChart.sub_type" :options="spark.enumEquity"/>
        </b-form-group>
        <b-form-group
          label="Revenue Types"
          v-if="newChart.type == 4"
          description="Only accountable charts can be used in journals or transactions. If marked as false, it can only be used to summarise child accounts."
        >
          <b-form-radio-group v-model.number="newChart.sub_type" :options="spark.enumRevenue"/>
        </b-form-group>
        <b-form-group
          label="Expense Types"
          v-if="newChart.type == 5"
          description="Only accountable charts can be used in journals or transactions. If marked as false, it can only be used to summarise child accounts."
        >
          <b-form-radio-group v-model.number="newChart.sub_type" :options="spark.enumExpense"/>
        </b-form-group>

        <b-button-toolbar class="float-right d-none d-md-block">
          <b-button-group class="ml-15">
            <b-btn
              variant="primary"
              v-shortkey="['ctrl', 'n']"
              @shortkey="onSaveNew()"
              @click="onSaveNew()"
            >
              <i class="material-icons">save</i>
              {{ $t('general.save') }}
            </b-btn>
          </b-button-group>
        </b-button-toolbar>
      </b-container>
    </b-modal>
    <b-modal id="mergeChartOfAccounts" hide-footer centered title="Merge Chart" ref="mergeModel">
      <b-container>
        <b-form-group :label="$t('accounting.fromChart')">
          <b-input-group>
            <b-input
              readonly
              type="text"
              :placeholder="$t('commercial.parent')"
              v-model="fromChart.code"
            />
            <b-input-group-append>
              <b-input readonly type="text" v-model="fromChart.name"/>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
        <b-form-group :label="$t('accounting.toChart')">
          <b-input-group>
                <select-data
                  v-bind:Id.sync="toChart"
                  :api="apiUrl"
                ></select-data>
              </b-input-group>
        </b-form-group>
      
        <b-button-toolbar class="float-right d-none d-md-block">
          <b-button-group class="ml-15">
            <b-btn
              variant="primary"
              v-shortkey="['ctrl', 'm']"
              @shortkey="onMerge()"
              @click="onMerge()"
            >
              <i class="material-icons">Merge</i>
              {{ $t('general.merge') }}
            </b-btn>
          </b-button-group>
        </b-button-toolbar>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import crud from "../../components/crud.vue";
export default {
  components: { crud },
  data: () => ({
    fromChart: "",
    toChart: "",
    parentChart: "",
    newChart: { id: 0 },
    pageUrl: "/accounting/charts",
    apiUrl: "/accounting/charts/for/non-accountables"
  }),
  computed: {
    baseUrl() {
      return (
        "/api/" + this.$route.params.taxPayer + "/" + this.$route.params.cycle
      );
    },
    formURL: function() {
      return this.$route.name.replace("List", "Form");
    },
    columns() {
      return [
        {
          key: "code",
          label: this.$i18n.t("commercial.code"),
          sortable: true
        },
        {
          key: "name",
          label: this.$i18n.t("commercial.account"),
          sortable: true
        },
        {
          key: "type",
          label: ""
        },
        {
          key: "actions",
          label: ""
        }
      ];
    }
  },
  methods: {
    onSaveNew() {
      var app = this;

      if (app.newChart.code != null && app.newChart.name != null) {
        crud.methods
          .onUpdate(app.baseUrl + app.pageUrl, app.newChart)
          .then(function(response) {
            app.$snack.success({
              text: app.$i18n.t("chart.saved", app.newChart.code)
            });
            app.$refs.accountModel.hide();
          })
          .catch(function(error) {
            app.$snack.danger({
              text: this.$i18n.t("general.errorMessage")
            });
          });
      }
    },
    onMerge() {
      var app = this;
      
      if (app.toChart.id != null && app.toChart.name != null) {
        
        crud.methods
          .onUpdate(app.baseUrl + "/accounting/charts/merge/" + app.fromChart.id + "/" + app.toChart.id )
          .then(function(response) {
            console.log(response);
            app.$snack.success({
              text: app.$i18n.t("chart.saved")
            });
            app.$refs.mergeModel.hide();
          })
          .catch(function(error) {
            app.$snack.danger({
              text: this.$i18n.t("general.errorMessage")
            });
          });
      }
    },

    createChild(data) {
      var app = this;
      app.parentChart = data;
      app.newChart.id = 0;
      app.newChart.parent_id = data.id;
      app.newChart.code = app.parentChart.code + ".0";
      app.newChart.type = app.parentChart.type;
      app.newChart.sub_type = app.parentChart.sub_type;
    },

    mergeChart(data) {
      var app = this;
      app.fromChart = data;
     
    },

    typeVariant(chartType) {
      if (chartType == 1) {
        return "light";
      } else if (chartType == 2) {
        return "dark";
      } else if (chartType == 3) {
        return "warning";
      } else if (chartType == 4) {
        return "success";
      } else if (chartType == 5) {
        return "danger";
      }
    }
  }
};
</script>
