<template>
    <div>
         <b-form-select v-model="document_id" :options="collections">
        </b-form-select>
       
    </div>
</template>

<script>
export default {
    data: () => ({
        collections:[]
    }),
    mounted() {
        
        //do something after mounting vue instance
        var app = this;
        console.log(app.label);
         crud.methods
        .onRead(app.baseUrl + app.api)
        .then(function(response) {
                
            if (app.value === 'code')
            {
            
                response.data.data.forEach(element => {
                     app.collections.push({
                            // index: this.data.details.length + 1,
                            value: element.code,
                            text: element.name
                        });
                });
               
            } 
            else{
               response.data.data.forEach(element => {
                   
                     app.collections.push({
                            // index: this.data.details.length + 1,
                            value: element.id,
                            text: element.name
                        });
                });
            }
           
             console.log(app.collections);
        });
    }
}
</script>
