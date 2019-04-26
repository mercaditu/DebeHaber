<template>
  <div>
    <b-button
      variant="link"
      v-if="$parent.currentTeam.current_billing_plan == null"
      :href="'https://debehaber.test/settings/teams/' + $parent.currentTeam.id + '#/subscription'"
    >Subscribe</b-button>
    <b-button v-else v-b-modal.modal>{{ $t('Create Taxpayer') }}</b-button>
    <b-modal id="modal" :title="$t('Create Taxpayer')">
      <b-form></b-form>
    </b-modal>
  </div>
</template>
<script>
export default {
  data: () => ({
    total: 0,
    value: 0,
    vat: 0
  }),
  methods: {
    onSaveNew() {
      var app = this;
      crud.methods
        .onUpdate(app.baseUrl + app.$route.meta.pageurl, app.data)
        .then(function(response) {
          if (response.status == 200) {
            app.$snack.success({
              text: app.$i18n.t("commercial.Saved")
            });

            app.data = [];
            app.$router.push({ name: app.$route.name, params: { id: "0" } });
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
