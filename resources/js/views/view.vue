<template>
  <div>
    <b-row>
      <b-col cols="9">
        <h2 text-variant="dark">
          <img :src="$route.meta.img" alt class="mr-10" width="32" />
          {{ $t($route.meta.title) }}
        </h2>
      </b-col>
      <b-col cols="3">
        <!-- <b-dropdown :text="$t('general.actions')" variant="primary" right>
          <b-dropdown-item
            @shortkey="onSaveNew()"
            @click="onSaveNew()"
            v-shortkey="['ctrl', 's']"
            style="width: 220px"
          >
            <i class="material-icons md-18">save</i>
            {{ $t('general.save') }}
            <small class="text-secondary float-right">cntrl-s</small>
          </b-dropdown-item>
          <b-dropdown-item @shortkey="onCancel()" @click="onCancel()" v-shortkey="['esc']">
            <i class="material-icons md-18">cancel</i>
            {{ $t('general.cancel') }}
            <small class="text-secondary float-right">esc</small>
          </b-dropdown-item>
        </b-dropdown>-->
         <b-button-toolbar class="float-right" v-if="spark.teamRoleType == 1 || spark.teamRoleType == 2">
          <b-button :to="{ name: formURL, params: { id: data.id }}" variant="primary">
            <i class="material-icons md-18">edit</i>
          </b-button>
        </b-button-toolbar>
      </b-col>
    </b-row>
    <!-- Cards & Headers -->
    <div
      v-for="card in $route.meta.cards"
      v-bind:key="card.index"
      :title="card.title"
    >
      <b-card>
        <b-row v-for="row in card.rows" v-bind:key="row.index">
          <b-col v-for="col in row.fields" v-bind:key="col.index">
            <b-form-group :label="$t(col.label)">
              <span
                v-for="property in col.properties"
                v-bind:key="property.index"
              >
                <b-input-group v-if="property.type === 'partner'">
                 {{data[property.data[0]['name']]}}
                </b-input-group>
           
                <b-input-group v-else-if="property.type === 'label'">{{
                  data[property.data]
                }}</b-input-group>
                
                <b-input-group v-else-if="property.type === 'payment'">
                  {{ data[property.data[0]['paymentcondition']]}}
                 
                </b-input-group>
                <b-input-group v-else-if="property.type === 'document'">
                  {{data[property.data[0]['documentcode']]}}-{{ data[property.data[0]['codeexpiry']]}}
                 
                </b-input-group>
                <b-input-group v-else-if="property.type === 'currency'">
                  {{  data[property.data[0]['salecurrency']]}}-{{data[property.data[0]['currencyrate']]}}
                  
                </b-input-group>
                <b-input-group v-else>
                  <b-input
                    v-if="property.location === ''"
                    :type="property.type"
                    v-model="data[property.data]"
                    :required="property.required"
                    :placeholder="$t(property.placeholder)"
                  />
                </b-input-group>
              </span>
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>
    </div>

    <!-- Special Components -->
  

    <!-- Details -->
    <div v-for="table in $route.meta.tables" v-bind:key="table.index">

     

      <b-card>
        <!-- Labels -->
        <b-row>
          <b-col
            v-for="col in table.fields"
            v-bind:key="col.index"
            :cols="col.cols"
          >
            <small>{{ $t(col.label) }}</small>
          </b-col>
        </b-row>
        <!-- Rows -->
        <b-row v-for="detail in data[table.data]" v-bind:key="detail.index">
          <b-col
            v-for="col in table.fields"
            v-bind:key="col.index"
            :cols="col.cols"
          >
            <span
              v-for="property in col.properties"
              v-bind:key="property.index"
            >
              <span v-if="property.type === 'select'">
                {{  detail[property.data]['name']}}
               
              </span>
                <span v-if="property.type === 'label'">
                {{  detail[property.data]}}
               
              </span>
             
            
             
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
      changed: false,
      data: {
        date: new Date(Date.now()).toISOString().split("T")[0],
        expenses: [],
        transactions: [],
        details: []
      }
    };
  },
  computed: {
    baseUrl() {
      return (
        "/api/" + this.$route.params.taxPayer + "/" + this.$route.params.cycle
      );
    },
    formURL: function() {
      return this.$route.name.replace("View", "Form");
    },
  },
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

    onCancel() {
      if (this.changed) {
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
      } else {
        console.log(this.changed);
        this.$router.go(-1);
      }
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
    },

    deleteRow(item, table, api) {
      var app = this;
      if (item.id > 0) {
        crud.methods
          .onDelete(app.baseUrl + api, item.id)
          .then(function(response) {});
      }

      app.lastDeletedRow = item;
      app.data[table].splice(app.data[table].indexOf(item), 1);
      this.$forceUpdate();

      this.$snack.success({
        text: this.$i18n.t("general.rowDeleted"),
        button: this.$i18n.t("general.undo")
      });
    },

    undoDeletedRow(table) {
      if (this.lastDeletedRow.id > 0) {
        crud.methods
          .onUpdate(
            app.baseUrl + app.$route.meta.pageurl + "/details",
            this.lastDeletedRow
          )
          .then(function(response) {});
      }
      this.data[table].push(this.lastDeletedRow);
    }
  },
  watch: {
    data: function(val) {
      this.changed = true;
    }
  },
  mounted() {
    var app = this;
    var url = "";
    if (app.$route.params.id > 0) {
      url = app.baseUrl + app.$route.meta.pageurl + "/" + app.$route.params.id;
      crud.methods.onRead(url).then(function(response) {
        app.data = response.data.data;
      });
    }
    app.data.type = app.$route.meta.type;
  }
};
</script>
