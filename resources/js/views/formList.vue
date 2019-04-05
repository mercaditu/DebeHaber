<template>
  <div>
      <b-row>
    <b-col>
      <b-btn class="d-none d-md-block float-left"
        v-shortkey="['esc']"
        @shortkey="onCancel()"
        @click="onCancel()"
      >
        <i class="material-icons">keyboard_backspace</i>
        {{ $t('general.return') }}
        <!-- {{ $t('welcomeMsg') }} -->
      </b-btn>
      <h3 class="upper-case">
        <img :src="$route.meta.img" alt class="mr-10" width="32">
        {{ $route.meta.title }}
      </h3>
    </b-col>
    <b-col>
      <b-button-toolbar class="float-right d-none d-md-block">
        
        <b-button-group class="ml-15">
          <b-btn
            variant="primary"
            v-shortkey="['ctrl', 'n']"
            @shortkey="onSaveNew()"
            @click="onSaveNew()"
          >
            <i class="material-icons">save</i>
            {{ $t('general.save') }}
          </b-btn>
          <b-btn variant="danger" v-shortkey="['esc']" @shortkey="onCancel()" @click="onCancel()">
            <i class="material-icons">cancel</i>
            {{ $t('general.cancel') }}
          </b-btn>
        </b-button-group>
      </b-button-toolbar>
      <b-button-toolbar class="float-right d-md-none">
        <b-btn
          class="ml-15"
          v-shortkey="['ctrl', 'd']"
          @shortkey="addDetailRow()"
          @click="addDetailRow()"
        >
          <i class="material-icons">playlist_add</i>
        </b-btn>
        <b-button-group class="ml-15">
          <b-btn
            variant="primary"
            v-shortkey="['ctrl', 'n']"
            @shortkey="onSaveNew()"
            @click="onSaveNew()"
          >
            <i class="material-icons">save</i>
          </b-btn>
          <b-btn variant="danger" v-shortkey="['esc']" @shortkey="onCancel()" @click="onCancel()">
            <i class="material-icons">cancel</i>
          </b-btn>
        </b-button-group>
      </b-button-toolbar>
    </b-col>
      </b-row>
    <div v-for="table in $route.meta.tables" v-bind:key="table.index">
      <b-card no-body>
        <!-- Labels -->
        <b-row>
          <b-col v-for="col in table.fields" v-bind:key="col.index"><b>{{ $t(col.label) }}</b></b-col>
        </b-row>
        <!-- Rows -->
        <b-row v-for="detail in data" v-bind:key="detail.index">
          <b-col v-for="col in table.fields" v-bind:key="col.index">
              <span v-for="property in col.properties" v-bind:key="property.index">
                 <b-input-group v-if="property.type === 'label'">
                 {{detail[property.data]}}
                </b-input-group>
                <b-input-group v-if="property.type === 'select'">
                  <select-data v-bind:Id.sync="detail[property.data]" :api="property.api" :options="property.options"></select-data>
                </b-input-group>
                <b-input-group v-else>
                  
                      <b-input
                        v-if="detail[property.location]"
                        :type="property.type"
                        v-model="detail[property.data]"
                        :required="property.required"
                        :placeholder="property.placeholder"
                      />
                  
                 
                </b-input-group>
              </span>
          </b-col>
         
          
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
   methods: {
        onSaveNew() {
            var app = this;
            crud.methods
            .onUpdate(app.baseUrl + app.$route.meta.pageurl, app.data)
            .then(function(response) {
                app.$snack.success({
                    text: app.$i18n.t("commercial.invoiceSaved")
                });
                
               
            })
            .catch(function(error) {
                console.log(error);
                app.$snack.danger({ text: this.$i18n.t("general.errorMessage") + error.message });
            });
        },

        onCancel() {
            this.$swal
            .fire({
                title: this.$i18n.t("general.cancel"),
                text: this.$i18n.t("general.cancelVerification"),
                type: "warning",
                showCancelButton: true,
                confirmButtonText: this.$i18n.t("general.cancelConfirmation"),
                cancelButtonText: this.$i18n.t("general.cancelRejection")
            })
            .then(result => {
                if (result.value) {
                    this.$router.go(-1);
                }
            });
        }

    },
  mounted() {
    var app = this;
    
    var url="";
       url=app.baseUrl + app.$route.meta.pageurl
       console.log(url);
       crud.methods
        .onRead(
          url
        )
        .then(function(response) {
          //console.log(response);
          app.data = response.data.data;
        });
    

    
  }
  
    
  
};
</script>