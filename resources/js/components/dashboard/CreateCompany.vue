<template>
    <div>
        <b-button @click="CreateCompany">$t('New Company)</b-button>
    </div>
</template>
<script>
export default {
    data: () => ({
        total: 0,
        value: 0,
        vat: 0,
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
    },
    },
    mounted() {
        var app = this;
       
    }
}
</script>
