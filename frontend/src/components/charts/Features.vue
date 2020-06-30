<template>
  <div id="features">
    <apexchart type="bar" width="100%" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
  export default {
    name: "Features",
    props: {
      features: Object
    },
    computed: {
      chartOptions: function () {
        return {
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
            categories: Object.keys(this.features)
          },
          yaxis: {
            logarithmic: false
          }
        }
      },
      series: function () {
        return [
          {
            name: "",
            data: Object.values(this.features).map(value => value.toFixed(2))
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
