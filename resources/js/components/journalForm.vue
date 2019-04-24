<template>
  <div>
    <b-row class="mb-5">
      <b-col>
        <h3 class="upper-case">
          <img :src="$route.meta.img" alt class="mr-10" width="32">
          {{ $route.meta.title }}
        </h3>
      </b-col>
      <b-col>
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
            <b-btn variant="danger" v-shortkey="['esc']" @shortkey="onCancel()" @click="onCancel()">
              <i class="material-icons">cancel</i>
              {{ $t('general.cancel') }}
            </b-btn>
          </b-button-group>
        </b-button-toolbar>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <b-card>
          <b-container>
            <b-row>
              <b-col>
                <b-form-group :label="$t('commercial.date')">
                  <b-input
                    type="date"
                    required
                    placeholder="Missing Information"
                    v-model="data.date"
                  />
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group :label="$t('commercial.number')">
                  <b-input
                    type="text"
                    placeholder="Invoice Number"
                    v-mask="spark.taxPayerConfig.document_mask"
                    v-model="data.number"
                  />
                </b-form-group>
              </b-col>
            </b-row>
          </b-container>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <b-card>
          <b-container>
            <b-row>
              <b-col>
                <b-form-group :label="$t('general.comment')">
                  <b-input type="text" :placeholder="$t('general.comment')" v-model="data.comment"/>
                </b-form-group>
              </b-col>
            </b-row>
          </b-container>
        </b-card>
      </b-col>
      <b-col>
        <b-card>
          <b-container>
            <b-row>
              <b-col>
                <b-form-group :label="$t('accounting.template')">
                  <b-form-select v-model="data.template">
                    <option v-for="item in templates" :key="item.key" :value="item">{{ item.name }}</option>
                  </b-form-select>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group :label="$t('commercial.value')">
                  <b-input-group-append>
                    <b-input type="text" placeholder="Value" v-model="data.value"/>
                    <b-btn
                      variant="primary"
                      @click="onGenerateDetail()"
                    >{{ $t('general.generate') }}</b-btn>
                  </b-input-group-append>
                </b-form-group>
              </b-col>
            </b-row>
          </b-container>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <b-btn
          class="mb-5"
          size="sm"
          v-shortkey="['ctrl', 'd']"
          @shortkey="addDetailRow(data.details)"
          @click="addDetailRow(data.details)"
        >
          <i class="material-icons mi-18">playlist_add</i>
          {{ $t('general.addRowDetail') }}
        </b-btn>

        <b-card no-body>
          <b-table hover :items="data.details" :fields="columns">
            <template slot="chart_id" slot-scope="data">
              <b-form-select v-model="data.item.chart_id">
                <option
                  v-for="item in accountCharts"
                  :key="item.key"
                  :value="item.id"
                >{{ item.name }}</option>
              </b-form-select>
            </template>
            <template slot="debit" slot-scope="data">
              <!-- mask?? -->
              <b-input type="text" v-model="data.item.debit" placeholder="Debit"/>
            </template>
            <template slot="credit" slot-scope="data">
              <!-- mask?? -->
              <b-input type="text" v-model="data.item.credit" placeholder="credit"/>
            </template>
            <template slot="actions" slot-scope="data">
              <b-button variant="link" @click="deleteRow(data.item)">
                <i class="material-icons text-danger">delete_outline</i>
              </b-button>
            </template>
          </b-table>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import crud from "../components/crud.vue";
export default {
  components: { crud: crud },
  data() {
    return {
      data: {
        date: "",
        details: [],
        id: 0,
        number: "",
        comment: "",
        template_id: "",
        template: "",
        value: ""
      },
      pageUrl: "/accounting/journals",

      accountCharts: [],

      templates: [],

      lastDeletedRow: []
    };
  },
  computed: {
    columns() {
      return [
        {
          key: "chart_id",
          label: this.$i18n.t("commercial.account"),
          sortable: true
        },
        {
          key: "credit",
          label: this.$i18n.t("general.credit"),
          sortable: true
        },
        {
          key: "debit",
          label: this.$i18n.t("general.debit"),
          sortable: true
        },
        {
          key: "actions",
          label: "",
          sortable: false
        }
      ];
    },
    Balance() {
      var debit = 0;
      var credit = 0;
      this.data.details.forEach(e => {
        debit += e.debit;
        credit += e.credit;
        console.log(e);
      });

      return debit - credit;
    },

    baseUrl() {
      return (
        "/api/" + this.$route.params.taxPayer + "/" + this.$route.params.cycle
      );
    }
  },
  methods: {
    onSave() {
      var app = this;

      if (app.Balance < 0) {
        crud.methods
          .onUpdate(app.baseUrl + app.pageUrl, app.data)
          .then(function(response) {
            app.$snack.success({
              text: app.$i18n.t("commercial.JournalSaved")
            });
            app.$router.go(-1);
          })
          .catch(function(error) {
            app.$snack.danger({ text: "Error OMG!: " + error });
          });
      }
    },

    onSaveNew() {
      var app = this;

      if (app.Balance === 0) {
        crud.methods
          .onUpdate(app.baseUrl + app.pageUrl, app.data)
          .then(function(response) {
            app.$snack.success({
              text: app.$i18n.t("commercial.JournalSaved")
            });
            (app.data.date = ""),
              (app.data.details = []),
              (app.data.id = 0),
              (app.data.number = ""),
              (app.data.comment = ""),
              (app.data.template_id = ""),
              (app.data.template = ""),
              (app.data.value = "");
            app.$router.push({ name: app.$route.name, params: { id: "0" } });
          })
          .catch(function(error) {
            app.$snack.danger({
              text: this.$i18n.t("general.errorMessage")
            });
          });
      }
    },

    onCancel() {
      this.$swal
        .fire({
          title: this.$i18n.t("general.cancel"),
          text: this.$i18n.t("general.cancelVerification"),
          type: "warning",
          showCancelButton: true,
          confirmButtonText: this.$i18n.t("general.cancelConfirmation"),
          cancelButtonText: this.$i18n.t("general.cancelRejection")
        })
        .then(result => {
          if (result.value) {
            this.$router.go(-1);
          }
        });
    },

    addDetailRow() {
      this.data.details.push({
        // index: this.data.details.length + 1,
        id: 0,
        chart_id: this.accountCharts[0].id,
        debit: "0",
        credit: "0"
      });
    },

    deleteRow(item) {
      if (item.id > 0) {
        var app = this;

        crud.methods
          .onDelete(app.baseUrl + app.pageUrl + "/details", item.id)
          .then(function(response) {});
      }

      this.lastDeletedRow = item;

      this.$snack.success({
        text: this.$i18n.t("general.rowDeleted"),
        button: this.$i18n.t("general.undo"),
        action: this.undoDeletedRow
      });

      this.data.details.splice(this.data.details.indexOf(item), 1);
    },

    undoDeletedRow() {
      if (this.lastDeletedRow.id > 0) {
        crud.methods
          .onUpdate(app.baseUrl + app.pageUrl + "/details", this.lastDeletedRow)
          .then(function(response) {});
        //axios code to insert detail again??? or let save do it.
      }

      this.data.details.push(this.lastDeletedRow);
    },

    onGenerateDetail() {
      var app = this;
      app.data.template_id = app.data.template.id;
      app.data.template.details.forEach(element => {
        app.data.details.push({
          id: 0,
          chart_id: element.chart_id,
          debit: app.data.value * element.debit_coef,
          credit: app.data.value * element.credit_coef
        });
      });
    }
  },

  mounted() {
    var app = this;

    if (app.$route.params.id > 0) {
      crud.methods
        .onRead(app.baseUrl + app.pageUrl + "/" + app.$route.params.id)
        .then(function(response) {
          app.data = response.data.data;
        });
    } else {
      app.data.date = new Date(Date.now()).toISOString().split("T")[0];
    }

    crud.methods
      .onRead(app.baseUrl + "/accounting/charts/for/accountables/")
      .then(function(response) {
        app.accountCharts = response.data.data;
      });

    crud.methods
      .onRead(app.baseUrl + "/accounting/journal-templates")
      .then(function(response) {
        app.templates = response.data.data;
      });
  }
};
</script>

