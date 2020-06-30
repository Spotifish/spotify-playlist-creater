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
          states: {
            hover: {
              filter: {
                type: 'none',
              }
            },
          },
          tooltip: {
            enabled: false
          },
          xaxis: {
            categories: Object.keys(this.features)
          },
          yaxis: {
            logarithmic: false,
            min: 0,
            max: 1
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
