<template>
  <div class="main">
    <div class="map-container">
      <CarbonMap />
    </div>
    <div class="chart-container">xdfsdf</div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import CarbonMap from '@/components/CarbonMap.vue'

@Options({
  components: {
    CarbonMap,
  },
})
export default class Main extends Vue {}
</script>

<style lang="scss" scoped>
.main {
  display: grid;
  grid-template-areas: 'map chart';
  grid-template-columns: 1fr 1fr;
  grid-gap: 3vw;
}
.map-container {
  grid-area: map;
}
.chart-container {
  grid-area: chart;
}

@media (max-width: 550px) {
  .main {
    grid-template-areas:
      'chart'
      'map';
    grid-template-columns: 1fr;
  }
}
</style>
