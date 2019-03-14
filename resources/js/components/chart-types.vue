<template>
  <div>
      <b-badge v-if="this.type == 1" variant="primary">{{ spark.enumChartType[this.type] }}</b-badge>
      <b-badge v-else-if="this.type == 2" variant="info">{{ spark.enumChartType[this.type] }}</b-badge>
      <b-badge v-else-if="this.type == 3" variant="warning" >{{ spark.enumChartType[this.type] }}</b-badge>
      <b-badge v-else-if="this.type == 4" variant="success" >{{ spark.enumChartType[this.type] }}</b-badge>
      <b-badge v-else-if="this.type == 5" variant="danger">{{ spark.enumChartType[this.type] }}</b-badge>

      <b-badge v-if="this.type == 1 && this.sub_type != null" pill>{{ spark.enumAsset[this.sub_type] }}</b-badge>
      <b-badge v-else-if="this.type == 2 && this.sub_type != null" pill>{{ spark.enumLiability[this.sub_type] }}</b-badge>
      <b-badge v-else-if="this.type == 3 && this.sub_type != null" pill>{{ spark.enumEquity[this.sub_type] }}</b-badge>
      <b-badge v-else-if="this.type == 4 && this.sub_type != null" pill>{{ spark.enumRevenue[this.sub_type] }}</b-badge>
      <b-badge v-else-if="this.type == 5 && this.sub_type != null" pill>{{ spark.enumExpense[this.sub_type] }}</b-badge>
  </div>
</template>
<script>
export default {
  props: ['type', 'sub_type'],
  data: () => ({

  })
}
</script>
