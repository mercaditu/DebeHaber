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
        <b-btn
          class="ml-15"
          v-shortkey="['ctrl', 'd']"
          @shortkey="addDetailRow()"
          @click="addDetailRow()"
        >
          <i class="material-icons">playlist_add</i>
          {{ $t('general.addRowDetail') }}
        </b-btn>
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
    <div v-for="card in $route.meta.cards" v-bind:key="card.index">
      <b-card>
        <b-row v-for="row in card.rows" v-bind:key="row.index">
          <b-col v-for="col in row.fields" v-bind:key="col.index">
            <b-form-group :label="$t(col.label)">
              <span v-for="property in col.properties" v-bind:key="property.index">
                <b-input-group v-if="property.type === 'customer' || col.type === 'supplier'">
                  <search-taxpayer
                    v-bind:partner_name.sync="data[property.data[0]['name']]"
                    v-bind:partner_taxid.sync="data[property.data[0]['taxid']]"
                  ></search-taxpayer>
                </b-input-group>
                <b-input-group v-else-if="property.type === 'select'">
                  <select-data v-bind:Id.sync="data[property.data]" :api="property.api"></select-data>
                </b-input-group>
                <b-input-group v-else>
                  <b-input
                    v-if="property.location === ''"
                    :type="col.type"
                    v-model="data[property.data]"
                    :required="col.required"
                    placeholder="col.placeholder0"
                  />
                  <b-input-group-append v-if="property.location === 'append'">
                    <b-input
                      :type="col.type"
                      v-model="data[property.data]"
                      :required="col.required"
                      placeholder="col.placeholder1"
                    />
                  </b-input-group-append>
                  <b-input-group-prepend v-else-if="property.location === 'prepend'">
                    <b-input
                      :type="col.type"
                      v-model="data[property.data]"
                      :required="col.required"
                      placeholder="col.placeholder2"
                    />
                  </b-input-group-prepend>
                </b-input-group>
              </span>
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>
    </div>
    <div v-for="table in $route.meta.tables" v-bind:key="table.index">
      <b-card no-body>
        <!-- Labels -->
        <b-row>
          <b-col v-for="col in table.fields" v-bind:key="col.index">{{ $t(col.label) }}</b-col>
        </b-row>
        <!-- Rows -->
        <b-row v-for="detail in data.details" v-bind:key="detail.index">
          <div v-for="col in table.fields" v-bind:key="col.index">
            <span v-for="property in col.properties" v-bind:key="property.index">
              <b-input-group v-if="property.type === 'customer' || col.type === 'supplier'">
                <search-taxpayer
                  v-bind:partner_name.sync="detail[property.data[0]['name']]"
                  v-bind:partner_taxid.sync="data[property.data[0]['taxid']]"
                ></search-taxpayer>
              </b-input-group>
              <b-input-group v-else-if="property.type === 'select'">
                <select-data v-bind:Id.sync="detail[property.data]" :api="property.api"></select-data>
              </b-input-group>
              <b-input-group v-else>
                <b-input
                  v-if="property.location === ''"
                  :type="col.type"
                  v-model="detail[property.data]"
                  :required="col.required"
                  placeholder="col.placeholder0"
                />
                <b-input-group-append v-if="property.location === 'append'">
                  <b-input
                    :type="col.type"
                    v-model="detail[property.data]"
                    :required="col.required"
                    placeholder="col.placeholder1"
                  />
                </b-input-group-append>
                <b-input-group-prepend v-else-if="property.location === 'prepend'">
                  <b-input
                    :type="col.type"
                    v-model="detail[property.data]"
                    :required="col.required"
                    placeholder="col.placeholder2"
                  />
                </b-input-group-prepend>
              </b-input-group>
            </span>
          </div>
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
      data: {}
    };
  },
  computed: {
    baseUrl() {
      return (
        "/api/" + this.$route.params.taxPayer + "/" + this.$route.params.cycle
      );
    }
  },
  mounted() {
    var app = this;
    console.log(
      app.baseUrl + app.$route.meta.pageurl + "/" + app.$route.params.id
    );
    if (app.$route.params.id > 0) {
      crud.methods
        .onRead(
          app.baseUrl + app.$route.meta.pageurl + "/" + app.$route.params.id
        )
        .then(function(response) {
          //console.log(response);
          app.data = response.data.data;
        });
    }
  }
};
</script>
