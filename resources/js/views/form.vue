<template>
    <div>
        <div v-for="card in form.cards" v-bind:key="card.index">
            <b-card>
                <b-row v-for="row in card.rows" v-bind:key="row.index">
                    <b-col v-for="col in rows.cols" v-bind:key="col.index">
                        <b-form-group :label="col.label">
                            <div v-if="field.type == 'customer'">

                            </div>
                            <div v-else-if="field.type == 'customer'">

                            </div>
                            <b-form-input v-else :type="field.type" v-model="field.property" :required="field.required" :placeholder="field.placeholder" />
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-card>
        </div>
        <div v-for="table in form.tables" v-bind:key="table.index">
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
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>
