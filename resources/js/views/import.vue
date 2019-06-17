<template>
  <b-card no-body>
    <b-tabs pills card vertical>
      <b-tab title="File Import" active>
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
      <b-tab title="Online Service Import">
          <b-row>
            <b-col>
              <b-form-group label="Start Date">
                <b-input type="date" v-model="data.start_date"/>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="End Date">
                <b-input type="date" v-model="data.end_date"/>
              </b-form-group>
            </b-col>
          </b-row>
        <b-button v-b-modal.integration-form>Create new Integration Service</b-button>
           <b-table :items="data.integrationservice" :fields="data.integrationfields"  striped>
            <template slot="actions" slot-scope="data">
            
                    <b-button
                    @click="get_data(data.item)"
            >Fetch Data</b-button>
            </template>
          </b-table>

        <b-modal id="integration-form" title="Integration Service Form" size="lg">
          <b-row>
            <b-col>
              <b-form-group label="Service Name">
                <b-input type="text" v-model="data.name"/>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Template">
                <b-select v-model="data.template">
                  <option value="1">ERPNext</option>
                </b-select>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Module">
                <b-select v-model="data.module">
                  <option value="1">Sales</option>
                  <option value="1">Purcahse</option>
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
                <b-input type="text" v-model="data.api_key"/>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="API Secrete">
                <b-input type="password" v-model="data.api_secrete"/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group label="Run Every Days">
                <b-input type="text" v-model="data.run_every_xdays"/>
              </b-form-group>
            </b-col>
            
          </b-row>

          <div slot="modal-footer">
            <b-button
              v-shortkey="['ctrl', 'd']"
              @shortkey="save_configuration()"
              @click="save_configuration()"
            >Save Configuration</b-button>
          </div>
        </b-modal>

        <!-- <b-button v-shortkey="['ctrl', 'd']" @shortkey="get_data()" @click="get_data()">Get Data</b-button> -->

        <b-card no-body v-if="data.data.length > 0">
            <b-col>
              <b-form-group label="Columns" >
              <b-form-select v-model="data.selected" :options="data.fields"></b-form-select>
              </b-form-group>
                <b-form-group label="Value">
               <b-form-input v-model="data.value" type="text"></b-form-input>
                <b-button @click="update()">Update</b-button>
              </b-form-group>
            </b-col>
          <b-table :items="data.data" :fields="data.integrationservice" striped>
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
        integrationfields: ["template","module", "name", "url","actions"],
        fields: ["Code","Comment"],
        name: "",
        url: "",
        api_key: "",
        api_secrete: "",
        template: 0,
        module: 0,
        run_every_xdays: 15,
        data: '',
        integrationservice : [],
        selectedIntegration : '',
        start_date : '',
        end_date : '',
        selected: '',
        value: ''
      },

      //for excel 
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
    //////Integration Services Methods Controller

    //list services for my taxpayer + module
    onLoad() {
      var app= this;
      crud.methods.onRead(app.baseUrl + "/config/integration-service").then(function(response) {
      app.data.integrationservice = response.data.data;
    });
    },
    //save services
    save_configuration()
    {
      var app= this;
      console.log(app.data);
      crud.methods
        .onUpdate(app.baseUrl + "/config/integration-service" , app.data)
        .then(function(response) {
           app.onLoad();
           app.$snack.success({
              text: app.$i18n.t("commercial.Saved")
            });
              app.$bvModal.hide('integration-form');
        })
        .catch(function(error) {
          console.log(error);
          app.$snack.danger({
            text: this.$i18n.t("general.errorMessage") + error.message
          });

        });
      
    },

    select_configuration(data)
    {
      var app= this;
      app.data.selectedIntegration = data;
      app.test_server();
    },

    test_server()
    {
      var app= this;
     //IntegrationController: test service
     if (app.data.selectedIntegration != '')
     {
     crud.methods
        .onUpdate(app.baseUrl + "/Integration/Test" , app.data.selectedIntegration)
        .then(function(response) {
         if (response.status === 200) {
            app.$snack.danger({
            text: "Test Succesfully..."
          });
         }
         else
         {
           app.$snack.danger({
            text: "Something is Wrong..."
          });
         }
        
         
        })
        .catch(function(error) {
          console.log(error);
          app.$snack.danger({
            text: this.$i18n.t("general.errorMessage") + error.message
          });
        });
     }
     else{
        app.$snack.danger({
            text: "Please Select Integration..."
          });
     }
    },
    
    get_data(data)
    {
      var app= this;
      data.start_date =  app.data.start_date;
      data.end_date =  app.data.end_date;
      
     //IntegrationController: test service
    //  if (data != '')
    //  {
      app.$snack.danger({
            text: "Data Fetching..."
          });
     crud.methods
        .onUpdate(app.baseUrl + "/Integration/GetData" , data)
        .then(function(response) {
         if (response.status === 200) {
          
           app.data.data = response.data;
           
           console.log(app);
         }
         else
         {
           app.$snack.danger({
            text: "Something is Wrong..."
          });
         }
        
         
        })
        .catch(function(error) {
          console.log(error);
          app.$snack.danger({
            text: this.$i18n.t("general.errorMessage") + error.message
          });
        });
    //  }
    //  else{
    //     app.$snack.danger({
    //         text: "Please Select Integration..."
    //       });
    //  }
    },

     upload()
    {
      var app= this;
      crud.methods
        .onUpdate(app.baseUrl + "/Integration/UploadData" ,  app.data.data)
        .then(function(response) {
         
           if (response.status === 200) {
          
            app.$snack.danger({
            text: "Uploaded..."
          });
         }
         else
         {
           app.$snack.danger({
            text: "Something is Wrong..."
          });
         }
         
        
        
         
        })
        .catch(function(error) {
          console.log(error);
          app.$snack.danger({
            text: this.$i18n.t("general.errorMessage") + error.message
          });
        });
 
    },
    //Fetch Data
    //Go into server, call data, map data, and show user withour column names

    //Store Data
    //Use existing Store function
      update() {
        var app= this;
       app.data.data.forEach(element =>  {
       if(element[app.data.selected] ===  '')
       {
          element[app.data.selected] = app.data.value;
       }
      });
    },
    onValidate(results) {
      this.results = results;
    }
  },

  mounted() {
    var app= this;
    app.onLoad();
    app.data.start_date = moment().subtract(1, 'months').startOf('month').format("YYYY-MM-DD");
    app.data.end_date = moment().subtract(1, 'months').endOf('month').format("YYYY-MM-DD");
    //list integration services stored in database.
    //get list of templates
  }
};
</script>