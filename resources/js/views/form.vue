<template>
    <div>
        <div v-for="card in $route.meta.cards" v-bind:key="card.index">
            <b-card>
                <b-row v-for="row in card.rows" v-bind:key="row.index">
                    <b-col v-for="col in row.fields" v-bind:key="col.index">
                        <b-form-group :label="$t(col.label)">
                            <div v-if="col.type === 'customer' || col.type === 'supplier'">
                                    <search-taxpayer  v-bind:partner_name.sync="data[col.property[0]['name']]"  v-bind:partner_taxid.sync="data[col.property[0]['taxid']]"></search-taxpayer>
                            </div>
                            <div v-else-if="col.type === 'select'">
                                    <select-data v-bind:Id.sync="data[col.property]" :api="col.api" ></select-data>
                            </div>
                            <div v-else>
                            <b-form-input :type="col.type" v-model="data[col.property]" :required="col.required" :placeholder="col.placeholder" />
                            </div>
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-card>
        </div>
        <div>
            <b-card no-body>
                <div v-for="table in $route.meta.tables" v-bind:key="table.index">
                   
                <b-table hover :items="data['details']" :fields="table.cols">
                    
                         
                            <template v-if="column.type === 'select'" :slot="column.property" slot-scope="data">
                               <select-data v-bind:Id.sync="data[column.property]" :api="column.api" ></select-data>
                            
                            </template>
                             <template v-else :slot="column.property" slot-scope="data">
                          <b-form-input :type="column.type" v-model="data[column.property]" :required="column.required" :placeholder="column.placeholder" />
                            </template> 
                            
                    
                </b-table>
                    
                </div>
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

       
        if (app.$route.params.id > 0) {
            crud.methods
            .onRead(app.baseUrl + app.$route.meta.pageurl + "/" + app.$route.params.id)
            .then(function(response) {
                app.data = response.data.data;
            });
        } 

       
    }
}
</script>
