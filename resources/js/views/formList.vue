<template>
  <div>
    <b-row>
      <b-col>
        <h3 class="upper-case">
          <img :src="$route.meta.img" alt class="mr-10" width="32">
          {{ $t($route.meta.title) }}
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
      <b-card>
        <!-- Labels -->
        <b-row>
          <b-col v-for="col in table.fields" v-bind:key="col.index" :cols="col.cols">
            <b>{{ $t(col.label) }}</b>
          </b-col>
        </b-row>
        <!-- Rows -->
        <div v-for="detail in data" v-bind:key="detail.index">
          <b-row>
            <b-col v-for="col in table.fields" v-bind:key="col.index" :cols="col.cols">
              <span v-for="property in col.properties" v-bind:key="property.index">
                <b-input-group v-if="property.type === 'label'">
                  <span v-if="detail['is_accountable']">
                    {{ detail[property.data] }}
                    <chart-types
                      :type="detail[property.data[0]['type']]"
                      :sub_type="detail[property.data[0]['subtype']]"
                    />
                  </span>
                  <b v-else>{{ detail[property.data] }}</b>
                </b-input-group>

                <b-input-group v-if="property.type === 'select'">
                  <select-data
                    v-bind:Id.sync="detail[property.data]"
                    :api="property.api"
                    :options="property.options"
                  ></select-data>
                </b-input-group>

                <b-input-group v-else>
                  <b-input
                    v-if="detail[property.location]"
                    :type="property.type"
                    v-model="detail[property.data]"
                    :required="property.required"
                    :placeholder="$t(property.placeholder)"
                  />
                </b-input-group>
              </span>
            </b-col>
          </b-row>
        </div>
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
      data: {},
      name: ""
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
          app.$snack.danger({
            text: this.$i18n.t("general.errorMessage") + error.message
          });
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
    },
    addRow(table) {
      var app = this;
      if (app.data[table] === undefined) {
        app.data[table] = [];
      }

      app.data[table].push({
        // index: this.data.details.length + 1,
        id: 0
      });
      this.$forceUpdate();
    }
  },
  beforeUpdate() {
    //var app = this;
    var app = this;

    var url = "";
    url = app.baseUrl + app.$route.meta.pageurl;
    if (this.name != url) {
      app.name = url;
      crud.methods.onRead(url).then(function(response) {
        //console.log(response);
        app.data = response.data.data;
      });
    }
  },
  mounted() {
    var app = this;

    var url = "";
    url = app.baseUrl + app.$route.meta.pageurl;
    app.name = url;
    crud.methods.onRead(url).then(function(response) {
      //console.log(response);
      app.data = response.data.data;
    });
  }
};
</script>