<template>
  <div class="main">
    <div class="map-container">
      <CarbonMap
        :regions-data="regionsData"
        @region-selected="handleRegionSelect"
      />
    </div>
    <div class="chart-container">
      <IntensityChart ref="chart" />
    </div>
    <div class="info-container">
      <IntensityInformation @clear-region="handleClearRegion" />
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import { Options, Vue } from 'vue-class-component'
import CarbonMap from '@/components/CarbonMap.vue'
import IntensityInformation from '@/components/IntensityInformation.vue'
import IntensityChart from '@/components/IntensityChart.vue'
import { GenerationMix } from '@/models/GenerationMix'
import { RegionIntencity } from '@/models/RegionIntencity'

@Options({
  components: {
    CarbonMap,
    IntensityInformation,
    IntensityChart,
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
        this.$refs.chart.updateChart(dataset, labels)
      }
    },
  },
})
export default class Main extends Vue {
  get generationMix(): GenerationMix[] {
    return store.state.generationMix
  }

  get regionsData(): RegionIntencity[] {
    return store.state.regionsData
  }

  mounted(): void {
    this.loadData()
  }

  async handleRegionSelect(regionId: number): Promise<void> {
    await store.dispatch('loadRegionGenerationMix', regionId)
  }

  async handleClearRegion(): Promise<void> {
    await store.dispatch('loadTotalGenerationMix')
  }

  async loadData(): Promise<void> {
    await store.dispatch('loadRegionsData')
    await store.dispatch('loadTotalGenerationMix')
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
  grid-template-rows: 3fr 2fr;
  grid-gap: 3vw;
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
}
.info-container {
  grid-area: info;
}

@media screen and (min-width: 550px) {
  .main {
    padding: 3rem;
  }
}

@media (max-width: 700px) {
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
