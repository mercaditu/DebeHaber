<template>
  <div>
    <b-button
      variant="link"
      v-if="$parent.currentTeam.current_billing_plan == null"
      :href="'/settings/teams/' + $parent.currentTeam.id + '#/subscription'"
    >Subscribe</b-button>
    <b-button v-else v-b-modal.modal>{{ $t('Create Taxpayer') }}</b-button>
    <b-modal id="modal" :title="$t('Create Taxpayer')"
     @ok="onSaveNew">
      <b-form>
         <b-row>
          <b-col>
                <b-form-group label="Name" >
                  <b-input
                    type="text"
                    v-model="data.name"
                  />
                </b-form-group>
                <b-form-group label="TaxId" >
                  <b-input
                    type="text"
                    v-model="data.taxid"
                  />
                </b-form-group>
          </b-col>
         </b-row>
      </b-form>
    </b-modal>
  </div>
</template>
<script>
import crud from "../components/crud.vue";
export default {
  components: { crud: crud },
 data() {
    return {
      data: {
       name: '',
       taxid: ''
      }
    };
  },
  
  methods: {
    onSaveNew() {
      var app = this;
      crud.methods
        .onUpdate("/api/" + 'taxpayer/store', app.data)
        .then(function(response) {
          console.log(response);
          if (response.status == 200) {
            app.$snack.success({
              text: app.$i18n.t("commercial.Saved")
            });

            window.location.href = app.$route.path ;
          }
        })
        .catch(function(error) {
          console.log(error);
          app.$snack.danger({
            text: this.$i18n.t("general.errorMessage") + error.message
          });
        });
    }
  },
  mounted() {
    var app = this;
  }
};
</script>
