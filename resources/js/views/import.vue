<template>
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
      URL
        <b-input-group>
                <b-input
                  type="text"
                  v-model="data.url"
                
                />
              </b-input-group>
      </b-row>
      <b-row>
        KEY
        <b-input-group>
                <b-input
                  type="text"
                  v-model="data.key"
                
                />
              </b-input-group>
      </b-row>
      <b-button
                  v-shortkey="['ctrl', 'd']"
                  @shortkey="add()"
                  @click="add()"
                >
                 Send
                </b-button>
                <b-card no-body>
                <b-table :items="data.Sales" :fields="data.fields" striped>
      <template slot="show_details" slot-scope="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
        </b-button>
      </template>

      <template slot="row-details" slot-scope="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Age:</b></b-col>
            <b-col></b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Is Active:</b></b-col>
            <b-col></b-col>
          </b-row>

          <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
        </b-card>
      </template>
    </b-table>
              </b-card>
                   <b-button
                
                  @click="upload()"
                >
                 Upload
                </b-button>
  </b-card></b-tab>
 </b-tabs>
</template>

<script>
import crud from "../components/crud.vue";
import { XlsCsvParser } from "vue-xls-csv-parser";
import { version } from 'punycode';
export default {
  name: "App",
  components: {
    crud: crud,
    XlsCsvParser
  },
  data() {
    return {
      data:{
      fields: ['customer_name', 'name','net_total', 'show_details'],
      url: '45.77.95.225',
      key: 'a4282ee4824faca:a400a531726d2e6',
      Sales : [],
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
    add()
    {
      var app = this;
      console.log(app.data);
    crud.methods
        .onUpdate(app.baseUrl + "/ERPNEXT/getERPNEXTSales" , app.data)
        .then(function(response) {
        
           app.data.Sales = response.data.data;
         
        })
        .catch(function(error) {
          console.log(error);
          app.$snack.danger({
            text: this.$i18n.t("general.errorMessage") + error.message
          });
        });
    },
    upload()
    {
      var app = this;
     
    crud.methods
        .onUpdate(app.baseUrl + "/ERPNEXT/uploadERPNEXTSales" , app.data)
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