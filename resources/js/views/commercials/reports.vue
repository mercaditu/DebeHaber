<template>
    <div>
        <b-row>
            <b-col>
                <b-card>
                    <b-button-group>
                        <b-button>Last Month</b-button>
                        <b-button>This Year</b-button>
                        <b-button>Last Year</b-button>
                    </b-button-group>
                    <b-form inline horizontal>
                        <b-form-group label="Start Date">
                            <b-form-input type="date" v-model="startDate"/>
                        </b-form-group>
                        <b-form-group label="End Date">
                            <b-form-input type="date" v-model="endDate"/>
                        </b-form-group>
                    </b-form>
                </b-card>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-card-group deck>
                    <b-card no-body>
                        <b-list-group flush>
                            <b-list-group-item href="#" @click="generateReport('sales')">
                                <b-img src="/img/apps/sales.svg" width="32"/>
                                {{ $t('commercial.salesBook') }}
                                <b-img src="/img/apps/excel.svg" width="32" @click="generateReport('sales',1)"/>
                            </b-list-group-item>
                            <b-list-group-item href="#" @click="generateReport('sales-byCustomers')">
                                <b-img src="/img/apps/sales.svg" width="32"/>
                                {{ $t('commercial.salesBookByCustomers') }}
                                <b-img src="/img/apps/excel.svg" width="32" @click="generateReport('sales-byCustomers',1)"/>
                            </b-list-group-item>
                            <b-list-group-item href="#" @click="generateReport('sales-byChart')">
                                <b-img src="/img/apps/sales.svg" width="32"/>
                                {{ $t('commercial.salesBookByItems') }}
                                <b-img src="/img/apps/excel.svg" width="32" @click="generateReport('sales-byChart',1)"/>
                            </b-list-group-item>
                            <b-list-group-item href="#" @click="generateReport('sales-byVATs')">
                                <b-img src="/img/apps/sales.svg" width="32"/>
                                {{ $t('commercial.salesBookByVat') }}
                                <b-img src="/img/apps/excel.svg" width="32" @click="generateReport('sales-byVATs',1)"/>
                            </b-list-group-item>
                        </b-list-group>
                    </b-card>

                    <b-card no-body>
                        <b-list-group flush>
                            <b-list-group-item href="#" @click="generateReport('purchases')">
                                <b-img src="/img/apps/purchase-v1.svg" width="32"/>
                                {{ $t('commercial.purchaseBook') }}
                                <b-img src="/img/apps/excel.svg" width="32" @click="generateReport('purchases',1)"/>
                            </b-list-group-item>
                            <b-list-group-item href="#" @click="generateReport('purchases-bySupplier')">
                                <b-img src="/img/apps/purchase-v1.svg" width="32"/>
                                {{ $t('commercial.purchaseBookBySuppliers') }}
                                <b-img src="/img/apps/excel.svg" width="32" @click="generateReport('purchases-bySupplier',1)"/>
                            </b-list-group-item>
                            <b-list-group-item href="#" @click="generateReport('purchases-byChart')">
                                <b-img src="/img/apps/purchase-v1.svg" width="32"/>
                                {{ $t('commercial.purchaseBookByItems') }}
                                <b-img src="/img/apps/excel.svg" width="32" @click="generateReport('purchases-byChart',1)"/>
                            </b-list-group-item>
                            <b-list-group-item href="#" @click="generateReport('purchases-byVAT')">
                                <b-img src="/img/apps/purchase-v1.svg" width="32"/>
                                {{ $t('commercial.purchaseBookByVat') }}
                                <b-img src="/img/apps/excel.svg" width="32" @click="generateReport('purchases-byVAT',1)"/>
                            </b-list-group-item>
                        </b-list-group>
                    </b-card>
                </b-card-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-card-group deck>
                    <b-card no-body>
                        <b-list-group flush>
                            <b-list-group-item href="#" @click="generateReport('credit_notes')">
                                <b-img src="/img/apps/credit-note.svg" width="32"/>
                                {{ $t('commercial.creditNote') }}
                                <b-img src="/img/apps/excel.svg" width="32" @click="generateReport('credit_notes',1)"/>
                            </b-list-group-item>
                        </b-list-group>
                    </b-card>

                    <b-card no-body>
                        <b-list-group flush>
                            <b-list-group-item href="#" @click="generateReport('debit_notes')">
                                <b-img src="/img/apps/debit-note.svg" width="32"/>
                                {{ $t('commercial.debitNote') }}
                                <b-img src="/img/apps/excel.svg" width="32" @click="generateReport('debit_notes',1)"/>
                            </b-list-group-item>
                        </b-list-group>
                    </b-card>
                </b-card-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-card-group deck>
                    <b-card no-body>
                        <b-list-group flush>
                            <b-list-group-item href="#" @click="generateReport('PRY/hechauka')">
                                <b-img src="/img/apps/cloud.svg" width="32"/>
                                    Hechauka
                            </b-list-group-item>
                        </b-list-group>
                    </b-card>
                </b-card-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-card-group deck>
                    <b-card no-body>
                        <b-list-group flush>
                        <h3> Aranduka </h3>
                        <br />
                        <xls-csv-parser :columns="arandukaColumns" @on-validate="onValidate"  lang="en"></xls-csv-parser>
                        <br />
                        <br />
                        <div class="results" v-if="results">
                        <b-col>
                          <b-button @click="arundukaUpload('PRY/aranduka')">Start Import</b-button>
                        </b-col>
                        </div>
                        </b-list-group>
                    </b-card>
                </b-card-group>
            </b-col>
        </b-row>

    </div>
</template>

<script>
import { XlsCsvParser } from "vue-xls-csv-parser";
export default {
components: {
  XlsCsvParser
},
    name: "",
    data: () => ({
        startDate: "",
        endDate: "",
        arandukaColumns: [
          { name: "document_type", value: "document_type" },
          { name: "document_name", value: "document_name" },
          { name: "date", value: "date" },
          { name: "id_type", value: "id_type" },
          { name: "partner_taxid", value: "partner_taxid" },
          { name: "partner_name", value: "partner_name" },
          { name: "letterhead_number", value: "letterhead_number" },
          { name: "document_number", value: "number" },
          { name: "payment_condition", value: "payment_condition" },
          { name: "total", value: "total" },
          { name: "number", value: "receiptnumber" },
          { name: "type", value: "type" },
          { name: "typetext", value: "typetext" },
          { name: "sub_type", value: "sub_type" },
          { name: "chart_name", value: "chart_name" }
        ],
        results: null,
    }),
    methods: {
        generateReport(path) {
            var app = this;
            window.open(
                app.$route.path + "/" +  path + "/" +  app.startDate + "/" + app.endDate,
                '_blank'
            );
        },arundukaUpload(path) {
          var app = this;
          axios({
            method: "post",
            url: app.$route.path + "/" +  path + "/" +  app.startDate + "/" + app.endDate,
            responseType:
            'arraybuffer',
            data: app.$data
          })
            .then(function(response) {
            try{
              app.forceFileDownload(response)
            }
            catch (e) {
              app.$snack.danger({
               text: "Data Not Available"
             });
           }
            })
            .catch(function(error) {
            app.$snack.danger({
             text: "Data Not Available"
           });
            });
        },
        forceFileDownload(response){
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'file.zip') //or any other extension
          document.body.appendChild(link)
          link.click()
        },
        onValidate(results) {
          this.results = results;
        },
    },
    mounted() {
        var app = this;
        app.startDate = moment().subtract(1, 'months').startOf('month').format("YYYY-MM-DD");
        app.endDate = moment().subtract(1, 'months').endOf('month').format("YYYY-MM-DD");
    }
};
</script>
