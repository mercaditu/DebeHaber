/*
 |--------------------------------------------------------------------------
 | Laravel Spark Components
 |--------------------------------------------------------------------------
 |
 | Here we will load the Spark components which makes up the core client
 | application. This is also a convenient spot for you to load all of
 | your components that you write while building your applications.
 */

require("./../spark-components/bootstrap");

Vue.component("passport-clients", require("./passport/Clients.vue").default);
Vue.component(
    "passport-authorized-clients",
    require("./passport/AuthorizedClients.vue").default
);
Vue.component(
    "passport-personal-access-tokens",
    require("./passport/PersonalAccessTokens.vue").default
);
Vue.component("search-site", require("./search-site.vue").default);
Vue.component("select-data", require("./select.vue").default);
Vue.component("create-taxpayer", require("./create-taxpayer.vue").default);
Vue.component(
    "search-transaction",
    require("./search-transaction.vue").default
);
Vue.component(
    "inventory-form",
    require("./inventoryForm.vue").default
);
Vue.component("search-taxpayer", require("./search-taxpayer.vue").default);
Vue.component("filter-data", require("./filter.vue").default);
Vue.component("payment-condition", require("./payment-condition.vue").default);
Vue.component("document", require("./document.vue").default);
Vue.component("currency", require("./currency.vue").default);
Vue.component("search-chart", require("./search-chart.vue").default);
Vue.component("search-expenses", require("./search-expenses.vue").default);

Vue.component("table-actions", require("./table/actions.vue").default);
Vue.component("table-loading", require("./table/loading.vue").default);
Vue.component("table-empty", require("./table/empty.vue").default);
Vue.component(
    "invoices-this-month-kpi",
    require("./dashboard/InvoicesThisMonthKPI.vue").default
);
Vue.component(
    "pie-transaction-items",
    require("./dashboard/TransactionsPie.vue").default
);
Vue.component("chart-types", require("./chart-types.vue").default);

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
Vue.component('v-select', vSelect)
