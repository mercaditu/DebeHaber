<template>
    <GChart :type="selectedType" :data="chartData" :options="chartOptions" />
</template>
<script>
import crud from '../../components/crud.vue';

export default {
    props: ['type', 'startDate', 'endDate'],
    components: { 'crud': crud },
    data () {
        return {
            // Array will be automatically processed with visualization.arrayToDataTable function
            chartData: [
        ["Item", "Value"],
      
      
        
      
      ],
            selectedType: "ColumnChart",
            chartTypes: [
                "PieChart",
                "LineChart",
                "BarChart"
            ],
            chartOptions: {
                chart: {
                    title: 'Breakdown',
                    sliceVisibilityThreshold: 0.13
                }
            }
        }
    },

    computed: {
        baseUrl() {
            var app = this;
            return '/api/' + app.$route.params.taxPayer + '/kpi/transactionsByDate/' + app.type + '/' + app.startDate + '/' + app.endDate;
        },
    },

    mounted() {
        var app = this;
        //do something after mounting vue instance
        // alert(app.baseUrl + '/transactions/' + this.type + '/' + this.startDate + '/' + this.endDate);
        crud.methods
        .onRead(app.baseUrl)
        .then(function (response) {
            console.log(response,'asd');
            response.data.forEach(element => {
                console.log(element)
                app.chartData.push([String(element.Item),Number(element.Value)])
            });

        });
    }
}
</script>
