<template>
  <div class="card">
    <GChart type="PieChart" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import store from '@/store'
import { GenerationMix } from '@/models/GenerationMix'
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { GChart } from 'vue-google-charts'

@Options({
  components: {
    GChart,
  },
  watch: {
    generationMix: function (value) {
      this.chartData = value.map((el: GenerationMix) => [el.fuel, el.perc])
      console.log(value)
    },
  },
})
export default class IntensityChart extends Vue {
  public chartData = []
  get chartOptions(): any {
    return {
      chart: {
        title: 'Company Performance',
        subtitle: 'Sales, Expenses, and Profit: 2014-2017',
      },
    }
  }
  get generationMix(): GenerationMix[] {
    return store.state.generationMix
  }
}
</script>

<style lang="scss" scoped></style>
