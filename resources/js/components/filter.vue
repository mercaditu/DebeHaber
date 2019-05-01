<template>
  <div>
    <b-input-group v-for="form in forms" v-bind:key="form.key">
      <b-input-group-prepend>
        <b-form-select size="sm" v-model="form.column">
          <option
            v-for="column in $route.meta.columns.filter(c => c.searchable)"
            v-bind:key="column.index"
            :value="column.key"
          >{{$t(column.label)}}</option>
        </b-form-select>
      </b-input-group-prepend>

      <b-form-input size="sm" v-model="form.query" :placeholder="$t('general.search')"></b-form-input>

      <b-input-group-append v-if="form.query != ''">
        <b-button size="sm" variant="success" @click="apply(form)">
          <i class="material-icons md-18">check_circle_outline</i>
        </b-button>
        <b-button size="sm" variant="dark" @click="add()">
          <i class="material-icons md-18">add</i>
        </b-button>
        <b-button size="sm" variant="light" @click="remove(form)">
          <i class="material-icons md-18">cancel</i>
        </b-button>
      </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script>
import crud from "../components/crud.vue";
export default {
  components: { crud: crud },
  data: () => ({
    filters: [],
    forms: [{ column: "", query: "" }]
  }),

  methods: {
    apply(form) {
      var app = this;
      app.filters.push({ column: form.column, query: form.query });
    },
    add() {
      this.forms.push({
        column: "",
        query: ""
      });
    },
    remove(form) {
      var app = this;
      app.filters.splice(this.filters.indexOf(form));
      app.forms.splice(this.forms.indexOf(form));
    }
  },
  watch: {
    filters: function(val) {
      var app = this;
      var query = "";

      app.filters.forEach(element => {
        if (query == "") {
          query += "filter[" + element.column + "]=" + element.query;
        } else {
          query += "&filter[" + element.column + "]=" + element.query;
        }
      });

      app.$parent.refresh("/api" + app.$route.path + "?" + query);
    }
  }
};
</script>
