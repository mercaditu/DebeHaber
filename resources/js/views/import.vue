<template>
  <b-card>
    <b-tabs content-class="mt-3">
      <b-tab title="Excel" active>
        <b-card class="app">
          <h3>Example - Import file with required login, firstname, lastname and optional values</h3>
          <br>
          <xls-csv-parser :columns="columns" @on-validate="onValidate" :help="help" lang="en"></xls-csv-parser>
          <br>
          <br>
          <div class="results" v-if="results">
            <h3>Results:</h3>
            <pre>{{ JSON.stringify(results, null, 2) }}</pre>
          </div>
        </b-card>
      </b-tab>
      <b-tab title="API">
        <b-card class="app">
          <b-row>
            <b-col>
              <b-form-group label="API Name">
                <b-input type="text" v-model="data.name"/>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Template">
                <b-select v-model="data.template">
                  <option value="ERPNext">ERPNext</option>
                </b-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group label="Domain or IP Address">
                <b-input type="text" v-model="data.url"/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group label="API Key">
                <b-input type="text" v-model="data.key"/>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="API Secrete">
                <b-input type="text" v-model="data.secrete"/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-button
            v-shortkey="['ctrl', 'd']"
            @shortkey="save_configuration()"
            @click="save_configuration()"
          >Save Configuration</b-button>
          <b-button v-shortkey="['ctrl', 'd']" @shortkey="add()" @click="add()">Get Data</b-button>
          <b-card no-body v-if="data.data.length > 0">
            <b-table :items="data.data" :fields="data.fields" striped>
              <template slot="show_details" slot-scope="row">
                <b-button
                  size="sm"
                  @click="row.toggleDetails"
                  class="mr-2"
                >{{ row.detailsShowing ? 'Hide' : 'Show'}} Details</b-button>
              </template>

              <template slot="row-details" slot-scope="row">
                <b-card>
                  <b-row class="mb-2">
                    <b-col sm="3" class="text-sm-right">
                      <b>Age:</b>
                    </b-col>
                    <b-col></b-col>
                  </b-row>

                  <b-row class="mb-2">
                    <b-col sm="3" class="text-sm-right">
                      <b>Is Active:</b>
                    </b-col>
                    <b-col></b-col>
                  </b-row>

                  <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
                </b-card>
              </template>
            </b-table>
            <b-button @click="upload()">Upload</b-button>
          </b-card>
        </b-card>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import crud from "../components/crud.vue";
import { XlsCsvParser } from "vue-xls-csv-parser";
import { version } from "punycode";
export default {
  name: "App",
  components: {
    crud: crud,
    XlsCsvParser
  },
  data() {
    return {
      data: {
        fields: ["customer_name", "name", "net_total", "show_details"],
        name: "",
        url: "",
        key: "",
        secrete: "",
        template: "",
        data: []
      },

      columns: [
        { name: "type", value: "type" },
        { name: "partner_taxid", value: "partner_taxid" },
        { name: "partner_name", value: "partner_name" },
        { name: "document_type", value: "document_type" },
        { name: "currency", value: "currency" },
        { name: "rate", value: "rate" },
        { name: "payment_condition", value: "payment_condition" },
        { name: "date", value: "date" },
        { name: "number", value: "number" },
        { name: "code", value: "code" },
        { name: "code_expiry", value: "code_expiry" },
        { name: "is_deductible", value: "is_deductible" },
        { name: "sub_type", value: "sub_type" }
      ],
      results: null,
      help: "Necessary columns are: login, firstname and lastname"
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
    onValidate(results) {
      this.results = results;
    },

    //get list of api templates saved online local server

    //fetch data from remote server

    //get template map from our server

    //store remote data to our server using map

    add() {
      var app = this;
      crud.methods
        .onUpdate(app.baseUrl + "/ERPNEXT/getERPNEXTSales", app.data)
        .then(function(response) {
          app.data.sales = response.data.data;
        })
        .catch(function(error) {
          console.log(error);
          app.$snack.danger({
            text: this.$i18n.t("general.errorMessage") + error.message
          });
        });
    },

    upload() {
      var app = this;

      crud.methods
        .onUpdate(app.baseUrl + "/ERPNEXT/uploadERPNEXTSales", app.data)
        .then(function(response) {
          app.$snack.success({
            text: app.$i18n.t("commercial.Saved")
          });
        })
        .catch(function(error) {
          console.log(error);
          app.$snack.danger({
            text: this.$i18n.t("general.errorMessage") + error.message
          });
        });
    }
  }
};
</script>