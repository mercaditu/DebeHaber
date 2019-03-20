<template>
    <div>
         <b-form-select v-model="document_id">
            <option v-for="doc in collections" :key="doc.key"  :value="doc.id">{{ doc.name }}</option>
        </b-form-select>
       
    </div>
</template>

<script>
import crud from "../components/crud.vue";
export default {
    components: { crud: crud },
    props: ['Id','api','label','value'],
    data: () => ({
        collections:[]
    }),
    computed: {

        document_id: {
                    // getter
                    get: function () {
                    return this.Id
                    },
                    // setter
                    set: function (newValue) {
                        this.$emit('update:Id', newValue);
                    }
        },
        baseUrl() {
            return (
                "/api/" + this.$route.params.taxPayer + "/" + this.$route.params.cycle
            );
        }
    },
    mounted() {
        //do something after mounting vue instance
        var app = this;
         crud.methods
        .onRead(app.baseUrl + app.api)
        .then(function(response) {
            app.collections = response.data.data;
        });
    }
}
</script>
