<template>
  <b-input-group>
    <b-input type="text" :placeholder="$t('commercial.code')" v-model="document_code"/>
    <b-input-group-append>
      <b-input type="date" :placeholder="$t('commercial.expiryDate')" v-model="document_expiry"/>
    </b-input-group-append>
  </b-input-group>
</template>

<script>
import crud from "../components/crud.vue";
export default {
  components: { crud: crud },
  props: ["code", "code_expiry"],
  data: () => ({
    collections: []
  }),
  computed: {
    document_code: {
      // getter
      get: function() {
        return this.code;
      },
      // setter
      set: function(newValue) {
        this.$emit("update:code", newValue);
      }
    },
    document_expiry: {
      // getter
      get: function() {
        return this.code_expiry;
      },
      // setter
      set: function(newValue) {
        this.$emit("update:code_expiry", newValue);
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
  }
};
</script>
