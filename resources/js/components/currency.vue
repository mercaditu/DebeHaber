<template>
    <div>
        <b-input-group>
                        <b-input-group-prepend>
                            <b-form-select v-model="sale_currency" @change="updateRate()">
                                <option
                                v-for="currency in currencies"
                                :key="currency.key"
                                :value="currency.code"
                                >{{ currency.name }}</option>
                            </b-form-select>
                        </b-input-group-prepend>
                        <b-input
                        type="text"
                        :placeholder="$t('commercial.rate')"
                        v-model.number="currency_rate"
                        />
        </b-input-group>
       
    </div>
</template>

<script>
import crud from "../components/crud.vue";
export default {
    components: { crud: crud },
    props: ['currency','rate','date','type'],
    data: () => ({
        collections:[],
        currencies: []
    }),
    computed: {

        sale_currency: {
                    // getter
                    get: function () {
                    return this.currency
                    },
                    // setter
                    set: function (newValue) {
                        this.$emit('update:currency', newValue);
                    }
        },
        currency_rate: {
                    // getter
                    get: function () {
                    return this.rate
                    },
                    // setter
                    set: function (newValue) {
                        this.$emit('update:rate', newValue);
                    }
        },
        baseUrl() {
            return (
                "/api/" + this.$route.params.taxPayer + "/" + this.$route.params.cycle
            );
        }
    },
    methods: {
        updateRate: function () {
            var app=this;
            var date=app.date;
            if(date==null)
            {
                date=moment().format("DD-MM-YYYY")
            }
            
           crud.methods
        .onRead("/api/" + this.$route.params.taxPayer + "/get-rates/by/"+ app.sale_currency + "/" + date)
        .then(function(response) {
            if(app.type==1){
                app.$emit('update:rate', response.data.sell_rate);
            }
            else{
                 app.$emit('update:rate', response.data.buy_rate);
            }
            
        });
        }
       
    },
    mounted() {
        //do something after mounting vue instance
        
        var app = this;
         crud.methods
        .onRead(app.baseUrl + "/config/currencies")
        .then(function(response) {
            app.currencies = response.data.data;
        });
    }
}
</script>
