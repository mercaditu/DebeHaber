<template>
  <b-card-body>
    <b-row class="text-center">
      <b-col>
        <h6>{{ $t('general.total') }}</h6>
        <h6 class="text-primary">{{ total }}</h6>
      </b-col>
      <b-col>
        <h6>{{ $t('commercial.value') }}</h6>
        <h6 class="text-success">{{ value }}</h6>
      </b-col>
      <b-col>
        <h6>{{ $t('commercial.vat') }}</h6>
        <h6 class="text-danger">{{ vat }}</h6>
      </b-col>
    </b-row>
  </b-card-body>
</template>
<script>
export default {
  data: () => ({
    total: "",
    value: "",
    vat: "",
    name: ""
  }),
  computed: {
    formURL: function() {
      return this.$route.name.replace("List", "Form");
    },
    viewURL: function() {
      return this.$route.name.replace("List", "View");
    }
  },
  methods: {
    get_data() {
      var app = this;
      axios
        .get(app.spark.baseURl + "/api" + app.$route.path + "/kpi")
        .then(({ data }) => {
          app.total = new Number(data[0].total).toLocaleString();
          app.value = new Number(data[0].value).toLocaleString();
          app.vat = new Number(data[0].vat).toLocaleString(undefined, {
            maximumFractionDigits: 0
          });
        });
    }
  },
  watch: {
    viewURL: function() {
      var app = this;
      app.get_data();
    }
  },
  mounted() {
    var app = this;
    app.name = this.viewURL;
    app.get_data();
  }
};
</script>
