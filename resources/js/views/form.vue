<template>
    <div>
        <div v-for="card in $route.meta.cards" v-bind:key="card.index">
            <b-card>
                <b-row v-for="row in card.rows" v-bind:key="row.index">
                    <b-col v-for="col in row.fields" v-bind:key="col.index">
                        <b-form-group :label="$t(col.label)">
                            <div v-if="col.type == 'customer' || col.type == 'supplier'">
                                    <search-taxpayer  v-bind:partner_name.sync="data[col.property]"  v-bind:partner_taxid.sync="data.partner_taxid"></search-taxpayer>
                            </div>
                            <b-form-input v-else   :type="col.type" v-model="data[col.property]" :required="col.required" :placeholder="col.placeholder" />
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-card>
        </div>
        <!-- <div v-for="table in form.tables" v-bind:key="table.index">
            <b-card no-body>
                <b-table>
                    
                </b-table>
                <b-row v-for="row in card.rows" v-bind:key="row.index">
                    <b-col v-for="col in rows.cols" v-bind:key="col.index">
                        <b-form-group :label="col.label">
                            <div v-if="field.type == 'customer'">
                                
                            </div>
                            <b-form-input v-else :type="field.type" v-model="field.property" :required="field.required" :placeholder="field.placeholder" />
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-card>
        </div> -->
    </div>
</template>

<script>
export default {
    data: function(){
            return {
            data: {
                partner_name:'',
                partner_taxid:'',
            }}; 
        },
}
</script>
