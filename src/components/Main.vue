<template>
  <div class="main">
    <div class="map-container">
      <CarbonMap
        :regions-data="regionsData"
        @region-selected="handleRegionSelect"
      />
    </div>
    <div class="chart-container">
      <div v-if="loading" class="spinner-container">
        <Spinner class="spinner" />
      </div>
      <IntensityChart
        v-else
        :chartOptions="intensityChartOptions"
        class="chart"
        :chartData="intensityChartData"
      />
    </div>
    <div class="info-container">
      <IntensityInformation @clear-region="handleClearRegion" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import CarbonMap from '@/components/CarbonMap.vue'
import IntensityInformation from '@/components/IntensityInformation.vue'
import IntensityChart from '@/components/IntensityChart.vue'
import Spinner from '@/components/Spinner.vue'
import { GenerationMix } from '@/models/GenerationMix'
import store from '@/store'
import { RegionIntencity } from '@/models/RegionIntencity'
import { chartColors } from '@/config'
import { debounce } from 'lodash'

@Options({
  components: {
    CarbonMap,
    IntensityInformation,
    IntensityChart,
    Spinner,
  },
  watch: {
    generationMix: function (values) {
      if (values.length) {
        const labels = []
        const dataset = []
        for (let element of values) {
          labels.push(element.fuel)
          dataset.push(element.perc)
        }
        this.intensityChartData.datasets[0].data = dataset
        this.intensityChartData.labels = labels
      }
    },
  },
})
export default class Main extends Vue {
  public loading = true
  public show = true
  private debouncedAPICall = debounce(async (regionId: number) => {
    this.loading = true
    await store.dispatch('loadRegionGenerationMix', regionId)
    this.loading = false
  }, 500)
  public intensityChartOptions = {
    responsive: true,
    aspectRatio: 1,
    tooltips: {
      callbacks: {
        label: function (
          tooltipItem: Record<string, number>,
          data: Record<string, Record<string, Record<string, string>>>
        ): string {
          return (
            data['labels'][tooltipItem['index']] +
            ': ' +
            data['datasets'][0]['data'][tooltipItem['index']] +
            '%'
          )
        },
      },
    },
  }
  public intensityChartData = {
    datasets: [
      {
        data: [],
        backgroundColor: chartColors,
      },
    ],
  }

  get generationMix(): GenerationMix[] {
    return store.state.generationMix
  }

  get regionsData(): RegionIntencity[] {
    return store.state.regionsData
  }

  handleRegionSelect(regionId: number): void {
    if (!this.loading && this.debouncedAPICall) {
      this.debouncedAPICall(regionId)
    }
  }

  async handleClearRegion(): Promise<void> {
    this.loading = true
    await store.dispatch('loadTotalGenerationMix')
    this.loading = false
  }

  mounted(): void {
    this.loadData()
  }

  async loadData(): Promise<void> {
    this.loading = true
    await store.dispatch('loadRegionsData')
    await store.dispatch('loadTotalGenerationMix')
    this.loading = false
  }
}
</script>

<style lang="scss" scoped>
.main {
  display: grid;
  grid-template-areas:
    'map chart'
    'map info';
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 3vw;
}
.spinner-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  .spinner {
    width: 40%;
    opacity: 0.6;
  }
}
.map-container {
  grid-area: map;
  padding-left: 2rem;
  padding-right: 2rem;
}
.chart-container {
  grid-area: chart;
  width: 100%;
  height: 100%;
  .chart {
    width: 84%;
  }
}
.info-container {
  grid-area: info;
}

@media screen and (min-width: 550px) {
  .main {
    padding: 3rem;
  }
}

@media (max-width: 550px) {
  .main {
    grid-template-areas:
      'chart'
      'map'
      'info';
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr 1fr;
  }
}
</style>
