<template>
  <div>
    <b-input-group>
      <b-input
        type="text"
        v-model="partnerName"
        :placeholder="$t('general.searchByName')"
        @keyup="searchPartnername()"
      />
      <b-input
        prepend
        type="text"
        v-model="partnerTaxid"
        :placeholder="$t('general.searchByTaxId')"
        @keyup="searchPartnertaxid()"
      />
    </b-input-group>
    <b-list-group>
      <b-list-group-item
        v-for="taxPayer in taxPayers"
        @click="select(taxPayer)"
        :key="taxPayer.id"
      >
        <b>{{ taxPayer.name }}</b>
        | {{ taxPayer.taxid }}
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import crud from "../components/crud.vue";
export default {
  components: { crud: crud },
  props: ["partner_name", "partner_taxid"],
  data: () => ({
    searchname: "",
    searchtaxid: "",
    selected: [],
    taxPayers: []
  }),

  computed: {
    partnerName: {
      // getter
      get: function() {
        return this.partner_name;
      },
      // setter
      set: function(newValue) {
        this.searchname = newValue;
        this.$emit("update:partner_name", newValue);
      }
    },

    partnerTaxid: {
      // getter
      get: function() {
        return this.partner_taxid;
      },
      // setter
      set: function(newValue) {
        this.searchtaxid = newValue;
        this.$emit("update:partner_taxid", newValue);
      }
    },
    baseUrl() {
      return (
        "/api/" + this.$route.params.taxPayer + "/" + this.$route.params.cycle
      );
    }
  },

  methods: {
    updateValue: function(value) {
      this.$emit("update:partner_name", value.name);
      this.$emit("update:partner_taxid", value.taxid);
      this.selected = value;
    },

    select(taxPayer) {
      var app = this;
      app.updateValue(taxPayer);
      app.taxPayers = [];
      app.searchname = taxPayer.name;
      app.searchtaxid = taxPayer.taxid;
    },

    searchPartnername() {
      var app = this;
      if (app.searchname.length < 3) {
        app.taxPayers = [];
      } else {
        crud.methods
          .onRead(app.baseUrl + "/search/partnerName/" + app.searchname)
          .then(function(response) {
            app.taxPayers = response.data;
          });
      }
    },

    searchPartnertaxid() {
      var app = this;
      if (app.searchtaxid.length < 3) {
        app.taxPayers = [];
      } else {
        crud.methods
          .onRead(app.baseUrl + "/search/partnerTaxid/" + app.searchtaxid)
          .then(function(response) {
            app.taxPayers = response.data;
          });
      }
    }
  },

  mounted() {
    var app = this;
  }
};
</script>
