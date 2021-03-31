<template>
  <VueApexCharts
    class="chart"
    type="pie"
    :options="chartOptions"
    :series="chartData"
  />
</template>

<script lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import { chartColors } from '@/config'

import { Options, Vue } from 'vue-class-component'

@Options({
  components: {
    VueApexCharts,
  },
})
export default class IntensityChart extends Vue {
  public chartOptions = {
    labels: [
      'biomass',
      'coal',
      'imports',
      'gas',
      'nuclear',
      'other',
      'hydro',
      'solar',
      'wind',
    ],
    colors: chartColors,
    legend: {
      position: 'bottom',
    },
    plotOptions: {
      pie: {
        customScale: 1,
      },
    },
  }
  public chartData = [1]

  updateChart(data: number[], labels: string[]): void {
    this.chartData = data
    this.chartOptions = {
      ...this.chartOptions,
      labels,
    }
  }
}
</script>
<style scoped lang="scss">
.chart {
  width: 100%;
}
</style>
