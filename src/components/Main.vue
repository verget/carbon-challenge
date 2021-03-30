<template>
  <div class="main">
    <div class="map-container">
      <CarbonMap />
    </div>
    <div class="chart-container"><IntensityChart /></div>
    <div class="info-container">
      <IntensityInformation />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import CarbonMap from '@/components/CarbonMap.vue'
import IntensityInformation from '@/components/IntensityInformation.vue'
import IntensityChart from '@/components/IntensityChart.vue'
import store from '@/store'

@Options({
  components: {
    CarbonMap,
    IntensityInformation,
    IntensityChart,
  },
})
export default class Main extends Vue {
  public loading = false
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
.map-container {
  grid-area: map;
}
.chart-container {
  grid-area: chart;
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
  }
}
</style>
