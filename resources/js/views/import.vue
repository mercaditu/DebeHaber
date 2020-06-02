<template>
  <div>
    <b-card no-body>
      <b-tabs pills card vertical>
        <b-tab title="Aranduka Import">
          <b-card class="app">
            <h3>Example - Import Aranduka </h3>
            <br />
            <input
            ref="excel-upload-input"
            type="file"
            accept=".xlsx, .xls, .csv"
            @change="handleClick"
            />
            <div >
              <table>

                <tr v-for="result in excelData.results" :key="result.index">
                <td> {{ result["Clasificación de Egreso"]}}</td>
                <td> {{ result["Clasificación de Egreso (Texto)"]}}</td>
                <td> {{ result["Condición de la Venta"]}}</td>
                <td> {{ result["Fecha"]}}</td>
                <td> {{ result["Monto Total"]}}</td>
                <td> {{ result["Nombres y Apellidos o Razón Social"]}}</td>
                <td> {{ result["Número de Documento"]}}</td>
                <td> {{ result["Número de Identificación"]}}</td>
                <td> {{ result["Número de Timbrado"]}}</td>
                <td> {{ result["Tipo de Documento"]}}</td>
                <td> {{ result["Tipo de Documento (Texto)"]}}</td>
                <td> {{ result["Tipo de Egreso"]}}</td>
                <td> {{ result["Tipo de Egreso (Texto)"]}}</td>
                <td> {{ result["Tipo de Identificación"]}}</td>
                </tr>
              </table>

            </div>
            <br />
            <br />
            <div class="results" v-if="excelData.results">
              <b-col>
                <b-button  @click="arundukaUpload()">Start Import</b-button>
              </b-col>
            </div>
          </b-card>
        </b-tab>
        <b-tab title="File Import">
          <b-card class="app">
            <h3>Example - Import file with required login, firstname, lastname and optional values</h3>
            <br />
            <xls-csv-parser :columns="columns" @on-validate="onValidate" :help="help" lang="en"></xls-csv-parser>
            <br />
            <br />
            <div class="results" v-if="results">
              <h3>Results:</h3>
              <pre>{{ JSON.stringify(results, null, 2) }}</pre>
            </div>
          </b-card>
        </b-tab>
        <b-tab title="Online Service Import" active>
          <b-row>
            <b-col>
              <h3>List of Integration Services</h3>
            </b-col>
            <b-col>
              <b-button v-b-modal.integration-form class="float-right">Create Integration</b-button>
            </b-col>
          </b-row>
          <b-table :items="data.integrationservice" :fields="data.integrationfields" striped>
            <template v-slot:cell(actions)="data">
              <b-button @click="get_data(data.item)">Fetch Data</b-button>
              <b-button @click="delete_configuration(data.item)">Delete</b-button>
            </template>
          </b-table>

          <b-row>
            <b-col>
              <b-form-group label="Start Date">
                <b-input type="date" v-model="data.start_date" />
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="End Date">
                <b-input type="date" v-model="data.end_date" />
              </b-form-group>
            </b-col>
          </b-row>

          <b-modal id="integration-form" title="Integration Service Form" size="lg">
            <b-row>
              <b-col>
                <b-form-group label="Service Name">
                  <b-input type="text" v-model="data.name" />
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Template">
                  <b-select v-model="data.template">
                    <option value="1">ErpNext</option>
                  </b-select>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Module">
                  <b-select v-model="data.module">
                    <option value="1">Sales</option>
                    <option value="2">Purcahse</option>
                  </b-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group label="Domain or IP Address">
                  <b-input type="text" v-model="data.url" />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group label="API Key">
                  <b-input type="text" v-model="data.api_key" />
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="API Secrete">
                  <b-input type="password" v-model="data.api_secrete" />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group label="Run Every Days">
                  <b-input type="text" v-model="data.run_every_xdays" />
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
        </b-tab>
      </b-tabs>
    </b-card>
    <b-card v-if="data.data.length > 0">
      <b-row>
        <b-col>
          <b-form-group label="Columns">
            <b-form-select v-model="data.selected" :options="data.updatefields"></b-form-select>
          </b-form-group>
          <b-form-group label="Value">
            <b-form-input v-model="data.value" type="text"></b-form-input>
            <b-button @click="update()">Update</b-button>
          </b-form-group>
        </b-col>
        <b-col>
          <b-button @click="upload()">Start Import</b-button>
        </b-col>
      </b-row>
      <b-table :items="data.data" :fields="data.datafields" striped>
        <template v-slot:cell(type)="data">
          <div v-if="data.item.Type === 2">Sales</div>
          <div v-else>Purchase</div>
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script>
import crud from "../components/crud.vue";
import { XlsCsvParser } from "vue-xls-csv-parser";
import { version } from "punycode";
import XLSX from "xlsx";
export default {
  name: "App",
  props: {
    beforeUpload: Function, // eslint-disable-line
    onSuccess: Function, // eslint-disable-line
  },
  components: {
    crud: crud,
    XlsCsvParser
  },
  data: () => ({
    data: {
      integrationfields: ["name", "url", "lastrun_on", "actions"],
      updatefields: ["Code", "CodeExpiry"],
      datafields: [
        "Type",
        "CustomerName",
        "CustomerTaxID",
        "Date",
        "Number",
        "Code",
        "CodeExpiry"
      ],
      id: 0,
      name: "",
      url: "",
      data: [],
      api_key: "",
      api_secrete: "",
      template: 1,
      module: 1,
      run_every_xdays: 15,
      integrationservice: [],
      selectedIntegration: "",
      start_date: "",
      end_date: "",
      selected: "",
      limit_start: 0,
      value: "",
      transaction: []
    },
    pageUrl: "/config/integration-service",

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
    help: "Necessary columns are: login, firstname and lastname",
    excelData: {
          header: null,
          results: null,
        }
  }),
  computed: {
    baseUrl() {
      return (
        this.spark.mainUrl +
        "/api/" +
        this.$route.params.taxPayer +
        "/" +
        this.$route.params.cycle
      );
    }
  },
  methods: {
    //////Integration Services Methods Controller

    //list services for my taxpayer + module
    onLoad() {
      var app = this;
      crud.methods.onRead(app.baseUrl + app.pageUrl).then(function(response) {
        app.data.integrationservice = response.data.data;
      });
    },
    //save services
    save_configuration() {
      var app = this;
      crud.methods
      .onUpdate(app.baseUrl + app.pageUrl, app.data)
      .then(function(response) {
        console.log(response.responseText);
        app.onLoad();
        app.$snack.success({
          text: app.$i18n.t("commercial.Saved")
        });
        app.$bvModal.hide("integration-form");
      })
      .catch(function(error) {
        console.log(error.responseText);
        app.$snack.danger({
          text: this.$i18n.t("general.errorMessage") + error.message
        });
      });
    },
    delete_configuration(item) {
      var app = this;

      if (item.id > 0) {
        var app = this;

        crud.methods
        .onDelete(app.baseUrl + app.pageUrl, item.id)
        .then(function(response) {});
      }

      this.lastDeletedRow = item;

      this.$snack.success({
        text: this.$i18n.t("general.rowDeleted"),
        button: this.$i18n.t("general.undo"),
        action: this.undoDeletedRow
      });

      this.data.integrationservice.splice(
        this.data.integrationservice.indexOf(item),
        1
      );
    },
    select_configuration(data) {
      var app = this;
      app.data.selectedIntegration = data;
      app.test_server();
    },

    test_server() {
      var app = this;
      //IntegrationController: test service
      if (app.data.selectedIntegration != "") {
        crud.methods
        .onUpdate(
          app.baseUrl + "/Integration/Test",
          app.data.selectedIntegration
        )
        .then(function(response) {
          if (response.status === 200) {
            app.$snack.danger({
              text: "Test Succesfully..."
            });
          } else {
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
      } else {
        app.$snack.danger({
          text: "Please Select Integration..."
        });
      }
    },

    get_data(data) {
      var app = this;
      data.startDate = app.data.start_date;
      data.endDate = app.data.end_date;
      data.limit_Start = app.data.limit_start;
      if (data.template === 1) {
        data.templateName = "ErpNext";
      }

      app.$snack.show({
        text: "Fetching Data, Hang on..."
      });

      crud.methods
      .onUpdate(app.baseUrl + "/Integration/GetData", data)
      .then(function(response) {
        if (response.status === 200) {
          console.log(response);
          if (response.data != null) {
            response.data.forEach(element => {
              app.data.data.push(element);
            });
            app.data.limit_start += 20;

            if (response.data.length > 0) {
              app.get_data(data);
            }
          }
        } else {
          app.$snack.danger({
            text: "Something is Wrong..."
          });
        }
        app.$snack.show({
          text: "Data Fetched..."
        });
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
      .onUpdate(app.baseUrl + "/Integration/UploadData", app.data.data)
      .then(function(response) {
        if (response.status === 200) {
          app.data.transaction = response.data;
          app.$snack.danger({
            text: "Uploaded..."
          });
        } else {
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
      var app = this;
      app.data.data.forEach(element => {
        if (element[app.data.selected] === "") {
          element[app.data.selected] = app.data.value;
        }
      });
    },
    onValidate(results) {
      this.results = results;
    },
    forceFileDownload(response){
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'file.zip') //or any other extension
      document.body.appendChild(link)
      link.click()
    },
    arundukaUpload() {
      var app = this;
      axios({
        method: "post",
        url: app.baseUrl + "/Integration/ArandukaUploadData",
        responseType:
        'json',
        data: app.excelData
      })
      .then(function(response) {
        if (response.status === 200) {
          app.data.transaction = response.data;
          app.$snack.danger({
            text: "Uploaded..."
          });
        } else {
          app.$snack.danger({
            text: "Something is Wrong..."
          });
        }

      })
      .catch(function(error) {
        console.log(error.response);
        app.$snack.danger({
          text: this.$i18n.t("general.errorMessage") + error.message
        });
      });
    },
    generateData({ header, results }) {
     this.excelData.header = header;
     this.excelData.results = results;
     this.onSuccess && this.onSuccess(this.excelData);
   },

   handleClick(e) {
     const files = e.target.files;
     const rawFile = files[0]; // only use files[0]
     if (!rawFile) return;
     this.upload(rawFile);
   },
   upload(rawFile) {
     this.$refs["excel-upload-input"].value = null; // fix can't select the same excel

     if (!this.beforeUpload) {
       this.readerData(rawFile);
       return;
     }
     const before = this.beforeUpload(rawFile);
     if (before) {
       this.readerData(rawFile);
     }
   },
   readerData(rawFile) {
     this.loading = true;
     return new Promise((resolve, reject) => {
       const reader = new FileReader();
       reader.onload = (e) => {
         const data = e.target.result;
         const workbook = XLSX.read(data, { type: "array" });
         const firstSheetName = workbook.SheetNames[0];
         const worksheet = workbook.Sheets[firstSheetName];
         const header = this.getHeaderRow(worksheet);
         const results = XLSX.utils.sheet_to_json(worksheet);
         this.generateData({ header, results });
         this.loading = false;
         resolve();
       };
       reader.readAsArrayBuffer(rawFile);
     });
   },
   getHeaderRow(sheet) {
     const headers = [];
     const range = XLSX.utils.decode_range(sheet["!ref"]);
     let C;
     const R = range.s.r;
     /* start in the first row */
     for (C = range.s.c; C <= range.e.c; ++C) {
       /* walk every column in the range */
       const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
       /* find the cell in the first row */
       let hdr = "UNKNOWN " + C; // <-- replace with your desired default
       if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
       headers.push(hdr);
     }
     return headers;
   },
   isExcel(file) {
     return /\.(xlsx|xls|csv)$/.test(file.name);
   },
  },

  mounted() {
    var app = this;
    app.onLoad();
    app.data.start_date = moment()
    .subtract(1, "months")
    .startOf("month")
    .format("YYYY-MM-DD");
    app.data.end_date = moment()
    .subtract(1, "months")
    .endOf("month")
    .format("YYYY-MM-DD");
    //list integration services stored in database.
    //get list of templates
  }
};
</script>
