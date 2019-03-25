<template>
    <div>
        <div v-for="card in $route.meta.cards" v-bind:key="card.index">
            <b-card>
                <b-row v-for="row in card.rows" v-bind:key="row.index">
                    <b-col v-for="col in row.fields" v-bind:key="col.index">
                        <b-form-group :label="$t(col.label)">
                            <b-input-group v-for="property in col.properties" v-bind:key="property.index">
                                <b-input-group v-if="property.type === 'customer' || col.type === 'supplier'">
                                    <search-taxpayer  v-bind:partner_name.sync="data[col.property[0]['name']]"  v-bind:partner_taxid.sync="data[col.property[0]['taxid']]"></search-taxpayer>
                                </b-input-group>
                                <b-input-group v-else-if="property.type === 'select'">
                                    <select-data v-bind:Id.sync="data[col.property]" :api="col.api" ></select-data>
                                </b-input-group>
                                
                                    <b-input-group v-else>
                                        <b-input v-if="property.location === ''" :type="col.type" v-model="data[col.property]" :required="col.required" :placeholder="col.placeholder" />
                                         <b-input-group-append v-if="property.location === 'append'">
                                            <b-input :type="col.type" v-model="data[col.property]" :required="col.required" :placeholder="col.placeholder" />
                                        </b-input-group-append>
                                        <b-input-group-prepend  v-else-if="property.location === 'prepend'">
                                            <b-input :type="col.type" v-model="data[col.property]" :required="col.required" :placeholder="col.placeholder" />
                                        </b-input-group-prepend >
                                    </b-input-group>
                               
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-card>
        </div>
        <div v-for="table in $route.meta.tables" v-bind:key="table.index">
            <b-card no-body>
                <!-- Labels -->
                <b-row>
                    <b-col v-for="col in table.fields" v-bind:key="col.index">
                       {{ $t(col.label) }}
                    </b-col>
                </b-row>
                <!-- Rows -->
                    <b-row  v-for="detail in data.details" v-bind:key="detail.index">
                        <div v-for="col in table.fields" v-bind:key="col.index"> 
                            <div v-if="col.type === 'customer' || col.type === 'supplier'">
                                    <search-taxpayer  v-bind:partner_name.sync="detail[col.property[0]['name']]"  v-bind:partner_taxid.sync="detail[col.property[0]['taxid']]"></search-taxpayer>
                            </div>
                            <div v-else-if="col.type === 'select'">
                                    <select-data v-bind:Id.sync="detail[col.property]" :api="col.api" ></select-data>
                            </div>
                            <div v-else>
                                <b-form-input :type="col.type" v-model="detail[col.property]" :required="col.required" :placeholder="col.placeholder" />
                            </div>
                        </div>
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
    mounted() {
        var app = this;
        console.log(app.baseUrl + app.$route.meta.pageurl + "/" + app.$route.params.id);
        if (app.$route.params.id > 0) {
            crud.methods
            .onRead(app.baseUrl + app.$route.meta.pageurl + "/" + app.$route.params.id)
            .then(function(response) {
                console.log(response);
                app.data = response.data.data;
            });
        } 
    }
}
</script>
