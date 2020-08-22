<template>
  <div>
    <b-card-group columns>
      <b-card no-body>
        <pie-transaction-items
          startDate="2018-01-01"
          endDate="2019-01-01"
          type="1"
        ></pie-transaction-items>
      </b-card>

      <b-card no-body>
        <bar-transaction-date
          startDate="2018-01-01"
          endDate="2019-01-01"
          type="1"
        ></bar-transaction-date>
      </b-card>
    </b-card-group>
    <b-card-group columns>
      <b-card no-body>
        <total-vat-debit></total-vat-debit>
      </b-card>

      <b-card no-body>
        <total-vat-credit></total-vat-credit>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
// import i18n from '../plugins/i18n';
export default {
  data() {
    return {};
  }
};
</script>
