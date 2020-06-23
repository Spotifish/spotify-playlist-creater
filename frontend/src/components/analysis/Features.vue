<template>
  <div id="features">
    <apexchart type="bar" width="100%" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
  export default {
    name: "Features",
    data: function () {
      return {
        chartOptions: {
          chart: {
            id: 'features-chart',
            toolbar: {
              show: false
            }
          },
          legend: {
            show: false
          },
          plotOptions: {
            bar: {
              horizontal: true
            }
          },
          xaxis: {
            categories: ['Danceability', 'Mood']
          }
        },
        series: [
          {
            name: 'Danceability',
            data: [30]
          },
          {
            name: 'Mood',
            data: [40]
          }
        ]
      }
    },
    async beforeMount() {
      await this.$store.dispatch("loadAudioFeatures");
    }
  }
</script>

<style scoped lang="scss">
  #features {
    width: 100%;
    padding-right: 16px;
  }
</style>
