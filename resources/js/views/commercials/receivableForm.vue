<template>
  <div>
    <b-row class="mb-5">
      <b-col>
        <b-btn
          class="d-none d-md-block float-left"
          v-shortkey="['esc']"
          @shortkey="onCancel()"
          @click="onCancel()"
        >
          <i class="material-icons">keyboard_backspace</i>
          {{ $t('general.return') }}
          <!-- {{ $t('welcomeMsg') }} -->
        </b-btn>
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
        <b-button-toolbar class="float-right d-md-none">
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
                <b-form-group :label="$t('commercial.value')">
                  <b-input type="number" placeholder="Value" v-model.number="data.payment_value"/>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group :label="$t('commercial.chart')">
                  <b-form-select v-model="data.chart_account_id">
                    <option
                      v-for="item in accountCharts"
                      :key="item.key"
                      :value="item.id"
                    >{{ item.name }}</option>
                  </b-form-select>
                </b-form-group>

                <b-form-group :label="$t('commercial.exchangeRate')">
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-form-select v-model="data.currency">
                        <option
                          v-for="currency in currencies"
                          :key="currency.key"
                          :value="currency.code"
                        >{{ currency.name }}</option>
                      </b-form-select>
                    </b-input-group-prepend>
                    <b-input
                      type="number"
                      :placeholder="$t('commercial.exchangeRate')"
                      :value="data.rate"
                    />
                  </b-input-group>
                </b-form-group>
                <b-form-group :label="$t('commercial.comment')">
                  <b-input
                    type="text"
                    required
                    placeholder="Missing Information"
                    v-model="data.comment"
                  />
                </b-form-group>
              </b-col>
            </b-row>
          </b-container>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import crud from "../../components/crud.vue";
export default {
  components: { crud: crud },
  data() {
    return {
      data: {
        chart_account_id: 0,
        comment: "",
        currency: "",
        date: "",
        id: 0,
        rate: 1,
        payment_value: 0
      },
      pageUrl: "/commercial/accounts-receivable",

      currencies: [],
      accountCharts: [],

      lastDeletedRow: []
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
        .onUpdate(app.baseUrl + app.pageUrl, app.data)
        .then(function(response) {
          app.$snack.success({
            text: app.$i18n.t("commercial.accountReceivableSaved")
          });
          app.$router.go(-1);
        })
        .catch(function(error) {
          app.$snack.danger({
            text: this.$i18n.t("general.errorMessage")
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
    }
  },

  mounted() {
    var app = this;

    crud.methods
      .onRead(app.baseUrl + "/config/currencies")
      .then(function(response) {
        app.currencies = response.data.data;
      });

    if (app.$route.params.id > 0) {
      crud.methods
        .onRead(app.baseUrl + app.pageUrl + "/" + app.$route.params.id)
        .then(function(response) {
          app.data = response.data.data;

          var total = 0;
          if (app.data.details != null) {
            total = app.data.details.reduce(function(sum, row) {
              return sum + new Number(row["value"]);
            }, 0);
          }

          var paid = 0;
          if (app.data.accountMovements != null) {
            paid = app.data.accountMovements.reduce(function(sum, row) {
              return sum + new Number(row["debit"]);
            }, 0);
          }

          app.data.payment_value = total - paid;
          app.data.date = new Date(Date.now()).toISOString().split("T")[0];
          app.data.chart_account_id =
            app.accountCharts[0] != null ? app.accountCharts[0].id : null;
          app.data.currency = app.spark.taxPayerData.currency;
          app.data.rate = 1;
        });
    }

    crud.methods
      .onRead(app.baseUrl + "/accounting/charts/for/money/")
      .then(function(response) {
        app.accountCharts = response.data.data;
      });
  }
};
</script>
