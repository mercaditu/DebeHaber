<template>
</template>

<script>
import crud from "../components/crud.vue";
export default {
    components: { crud },
    data: () => ({
        collections:[]
    }),
    mounted() {
      
        //do something after mounting vue instance
        var app = this;
          axios({
                method: "post",
                url: "http://45.77.230.101/api/resource/Item",
                responseType: "json",
                data: $data,
                Authorization:"token bfaa68e561c944f:0d1087164f4542f"
                })
        .then(function(response) {
             console.log(response);
          return response;
        })
        .catch(function(error) {
          console.log(error.response);
          return error.response;
        });
    }
}
</script>
