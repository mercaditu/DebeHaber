<template>
  <div>
    <b-row>
      <b-col>
        <b-btn
          class="d-none d-md-block float-left mr-15"
          v-shortkey="['esc']"
          @shortkey="onCancel()"
          @click="onCancel()"
        >
          <i class="material-icons">keyboard_backspace</i>
        </b-btn>
        <h3 class="upper-case">
          <img :src="$route.meta.img" alt class="mr-10" width="32">
          {{ $t($route.meta.title) }}
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
        <b-button-toolbar class="float-right d-md-none">
          <b-btn
            class="ml-15"
            v-shortkey="['ctrl', 'd']"
            @shortkey="addDetailRow()"
            @click="addDetailRow()"
          >
            <i class="material-icons">playlist_add</i>
          </b-btn>
          <b-button-group class="ml-15">
            <b-btn
              variant="primary"
              v-shortkey="['ctrl', 'n']"
              @shortkey="onSaveNew()"
              @click="onSaveNew()"
            >
              <i class="material-icons">save</i>
            </b-btn>
            <b-btn variant="danger" v-shortkey="['esc']" @shortkey="onCancel()" @click="onCancel()">
              <i class="material-icons">cancel</i>
            </b-btn>
          </b-button-group>
        </b-button-toolbar>
      </b-col>
    </b-row>
    <div v-for="card in $route.meta.cards" v-bind:key="card.index">
      <b-card>
        <b-row v-for="row in card.rows" v-bind:key="row.index">
          <b-col v-for="col in row.fields" v-bind:key="col.index">
            <b-form-group :label="$t(col.label)">
              <span v-for="property in col.properties" v-bind:key="property.index">
                <b-input-group v-if="property.type === 'partner'">
                  <search-taxpayer
                    v-bind:partner_name.sync="data[property.data[0]['name']]"
                    v-bind:partner_taxid.sync="data[property.data[0]['taxid']]"
                  ></search-taxpayer>
                </b-input-group>
                <b-input-group v-else-if="property.type === 'select'">
                  <select-data
                    v-bind:Id.sync="data[property.data]"
                    :api="property.api"
                    :options="property.options"
                  ></select-data>
                </b-input-group>
                <b-input-group v-else-if="property.type === 'payment'">
                  <payment-condition
                    v-bind:payment_condition.sync="data[property.data[0]['paymentcondition']]"
                    v-bind:chart_account_id.sync="data[property.data[0]['chartaccount']]"
                  ></payment-condition>
                </b-input-group>
                <b-input-group v-else-if="property.type === 'document'">
                  <document
                    v-bind:code.sync="data[property.data[0]['documentcode']]"
                    v-bind:code_expiry.sync="data[property.data[0]['codeexpiry']]"
                  ></document>
                </b-input-group>
                <b-input-group v-else-if="property.type === 'currency'">
                  <currency
                    :date="data[property.data[0]['date']]"
                    :type="card.module"
                    v-bind:currency.sync="data[property.data[0]['salecurrency']]"
                    v-bind:rate.sync="data[property.data[0]['currencyrate']]"
                  ></currency>
                </b-input-group>
                <b-input-group v-else-if="property.type === 'mask'">
                  <b-input
                    v-if="property.location === ''"
                    :type="property.type"
                    v-model="data[property.data]"
                    v-mask="spark.taxPayerConfig.document_mask"
                    :required="property.required"
                    :placeholder="$t(property.placeholder)"
                  />
                </b-input-group>
                
                <b-input-group v-else>
                  <b-input
                    v-if="property.location === ''"
                    :type="property.type"
                    v-model="data[property.data]"
                    :required="property.required"
                    :placeholder="$t(property.placeholder)"
                  />
                </b-input-group>
              </span>
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>
    </div>
    <div v-for="table in $route.meta.tables" v-bind:key="table.index">
      <!-- v-show="table.data==='details'" -->
      <b-btn
        class="mb-5"
        size="sm"
        v-shortkey="['ctrl', 'd']"
        @shortkey="addRow(table.data)"
        @click="addRow(table.data)"
      >
        <i class="material-icons mi-18">playlist_add</i>
        {{ $t('general.addRowDetail') }}
      </b-btn>

      <b-card>
        <!-- Labels -->
        <b-row>
          <b-col v-for="col in table.fields" v-bind:key="col.index">
            <b>{{ $t(col.label) }}</b>
          </b-col>
        </b-row>
        <!-- Rows -->
        <b-row v-for="detail in data[table.data]" v-bind:key="detail.index">
          <b-col v-for="col in table.fields" v-bind:key="col.index">
            <span v-for="property in col.properties" v-bind:key="property.index">
              <b-input-group v-if="property.type === 'select'">
                <select-data
                  v-bind:Id.sync="detail[property.data]"
                  :api="property.api"
                  :options="property.options"
                ></select-data>
              </b-input-group>
              <b-input-group v-else-if="property.type === 'transaction'">
                  <search-transaction
                    v-bind:number.sync="detail[property.data[0]['transactionnumber']]"
                    v-bind:value.sync="detail[property.data[0]['transactionvalue']]"
                  ></search-transaction>
                </b-input-group>
                <b-input-group v-else-if="property.type === 'label'">{{detail[property.data]}}</b-input-group>
              <b-input-group v-else>
                <b-input
                  :type="property.type"
                   v-model="detail[property.data]"
                  :required="property.required"
                  :placeholder="property.placeholder"
                />
              </b-input-group>
            </span>
          </b-col>
        </b-row>
      </b-card>
    </div>
  </div>
</template>

<script>
import crud from "../components/crud.vue";
export default {
  components: { crud: crud },
  data() {
    return {
      data: {
        date : new Date(Date.now()).toISOString().split("T")[0]
      }
    };
  },
  computed: {
    baseUrl() {
      return (
        "/api/" + this.$route.params.taxPayer + "/" + this.$route.params.cycle
      );
    }
  },
  methods: {
    onSaveNew() {
      var app = this;
      crud.methods
        .onUpdate(app.baseUrl + app.$route.meta.pageurl, app.data)
        .then(function(response) {
          if (response.status == 200) {
            app.$snack.success({
              text: app.$i18n.t("commercial.Saved")
            });

            app.data = [];
            app.$router.push({ name: app.$route.name, params: { id: "0" } });
          }
        })
        .catch(function(error) {
          console.log(error);
          app.$snack.danger({
            text: this.$i18n.t("general.errorMessage") + error.message
          });
        });
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

    addRow(table) {
      var app = this;
      if (app.data[table] === undefined) {
        app.data[table] = [];
      }

      app.data[table].push({
        // index: this.data.details.length + 1,
        id: 0
      });
      this.$forceUpdate();
    },

    deleteRow(item, table) {
      var app = this;
      if (item.id > 0) {
        crud.methods
          .onDelete(app.baseUrl + app.$route.meta.pageurl + "/details", item.id)
          .then(function(response) {});
      }

      app.lastDeletedRow = item;
      app.data[table].splice(app.data[table].indexOf(item), 1);
      this.$forceUpdate();

      this.$snack.success({
        text: this.$i18n.t("general.rowDeleted"),
        button: this.$i18n.t("general.undo")
        //action: app.undoDeletedRow(table)
      });
    },

    undoDeletedRow(table) {
      if (this.lastDeletedRow.id > 0) {
        crud.methods
          .onUpdate(
            app.baseUrl + app.$route.meta.pageurl + "/details",
            this.lastDeletedRow
          )
          .then(function(response) {});
        //axios code to insert detail again??? or let save do it.
      }
      this.data[table].push(this.lastDeletedRow);
    }
  },
  mounted() {
    var app = this;
    var url = "";
    if (app.$route.params.id > 0) {
      url = app.baseUrl + app.$route.meta.pageurl + "/" + app.$route.params.id;
      crud.methods.onRead(url).then(function(response) {
        //console.log(response);
        app.data = response.data.data;
      });
    }
    app.data.type = app.$route.meta.type;
  }
};
</script>