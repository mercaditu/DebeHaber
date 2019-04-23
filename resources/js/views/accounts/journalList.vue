<template>
    <div>
        <b-row v-if="$route.name.includes('List')">
            <b-col>
                <b-card-group deck>
                    <b-card bg-variant="dark" text-variant="white">
                        <h4 class="upper-case">
                            <img :src="$route.meta.img" alt="" class="ml-5 mr-5" width="26">
                            {{ $t($route.meta.title) }}
                        </h4>
                        <p class="lead" v-if="$route.name.includes('List')">
                            {{ $t($route.meta.description) }}, <router-link :to="{ name: formURL, params: { id: 0}}">Create</router-link>
                        </p>
                    </b-card>

                    <invoices-this-month-kpi class="d-none d-xl-block"></invoices-this-month-kpi>
                    <invoices-this-month-kpi class="d-none d-xl-block"></invoices-this-month-kpi>

                    <b-card no-body>
                        <b-list-group-item href="#" @click="GenerateJournal()">
                            <i class="material-icons">help</i>
                            {{ $t('general.GenerateJournal') }}
                        </b-list-group-item>
                        <b-list-group-item href="#">
                            <i class="material-icons">help</i>
                            {{ $t('general.manual') }}
                        </b-list-group-item>
                        <b-list-group-item :to="{ name: uploadURL }">
                            <i class="material-icons">cloud_upload</i>
                            {{ $t('general.uploadFromExcel') }}
                        </b-list-group-item>
                        <b-list-group-item :to="{ name: formURL, params: { id: 0}}">
                            <i class="material-icons md-light">add_box</i>
                            {{ $t('general.createNewRecord') }}
                        </b-list-group-item>
                    </b-list-group>
                </b-card>
            </b-card-group>
        </b-col>
    </b-row>
    <b-row>
        <b-col>
            <div v-if="$route.name.includes('List')">
                <crud :columns="columns" inline-template>
                    <b-card no-body>
                        <b-table hover responsive :items="items" :fields="columns" :current-page="current_page">

                            <template slot="date" slot-scope="data">
                                {{ new Date(data.item.date).toLocaleDateString() }}
                            </template>

                            <template slot="total" slot-scope="data">
                                <span class="float-right">
                                    {{ new Number(sum(data.item.details, 'debit')).toLocaleString() }}
                                    <small class="text-success text-uppercase" v-if="data.item.currency != null">{{ data.item.currency.code }}</small>
                                </span>
                            </template>

                            <template slot="row-details" slot-scope="row">
                                <b-row>
                                    <b-col col="6" colspan="2"><b>{{ $t('accounting.chartOfAccounts') }}</b></b-col>
                                    <b-col col="3" class="text-sm-right"><b>{{ $t('general.debit') }}</b></b-col>
                                    <b-col col="3" class="text-sm-right"><b>{{ $t('general.credit') }}</b></b-col>
                                </b-row>
                                <b-row v-for="detail in row.item.details" :key="detail.key">
                                    <b-col col="1"><i>{{ detail.chart.code }}</i></b-col>
                                    <b-col col="5">
                                        {{ detail.chart.name }}
                                        <chart-types :type="detail.chart.type" :sub_type="detail.chart.sub_type"/>
                                    </b-col>
                                    <b-col col="3" class="text-sm-right">{{ new Number(detail.debit).toLocaleString() }}</b-col>
                                    <b-col col="3" class="text-sm-right">{{ new Number(detail.credit).toLocaleString() }}</b-col>
                                </b-row>
                            </template>
                             <template slot="hasDetails" slot-scope="row">
                                <b-button-group size="sm" class="show-when-hovered">
                                    <b-button @click="row.toggleDetails"><i class="material-icons md-19">remove_red_eye</i></b-button>
                                </b-button-group>
                            </template>
                            
                            <template slot="actions" slot-scope="data">
                                <table-actions :row="data.item"></table-actions>
                            </template>

                            <div slot="table-busy">
                                <table-loading></table-loading>
                            </div>

                            <template slot="empty" slot-scope="scope">
                                <table-empty></table-empty>
                            </template>
                        </b-table>
                        <b-pagination align="center" :total-rows="meta.total" :per-page="meta.per_page"  @change="onList()"></b-pagination>
                    </b-card>
                </crud>
            </div>
            <router-view v-else></router-view>
        </b-col>
    </b-row>
</div>
</template>

<script>
import crud from '../../components/crud.vue'
export default {
    components: { crud },
    data: () => ({
        cycle:[]
    }),
    computed: {

        formURL: function () {
            return this.$route.name.replace('List', 'Form');
        },
        columns()
        {
            return  [ {
                key: 'date',
                sortable: true
            },
            {
                key: 'comment',
                label: this.$i18n.t('general.comment'),
                sortable: true
            },
            {
                key: 'debit',
                label: this.$i18n.t('commercial.value'),
                sortable: true
            },
            {
                key: 'hasDetails',
                label: '',
                sortable: false
            },
            {
                key: 'actions',
                label: '',
                sortable: false
            }];
        },
        baseUrl() {
            return '/api/' + this.$route.params.taxPayer + '/' + this.$route.params.cycle;
        },
    },
    methods: {

        GenerateJournal() {
            var app = this;

            crud.methods
            .onRead(app.baseUrl + "/generate-journals/"+ app.cycle.start_date + "/" + app.cycle.end_date)
            .then(function (response) {
                app.$snack.success({
                    text: app.$i18n.t('commercial.GenerateJournal'),
                });
            });
        }


    },
    mounted() {
        var app = this;

        crud.methods
        .onRead(app.baseUrl  + '/config/cycles/' + this.$route.params.cycle)
        .then(function (response) {
            app.cycle = response.data.data;
        });



    }
}
</script>
