<template>
  <div class="map">
    <svg
      viewBox="300 150 500 1020"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:amcharts="http://amcharts.com/ammap"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.1"
    >
      <g>
        <NorthEast
          @click="regionSelected('NorthEast')"
          :class="defineClass(4)"
        />
        <NorthWest :class="defineClass(3)" />
        <Yorkshire :class="defineClass(5)" />
        <EastMidlands :class="defineClass(9)" />
        <WestMidlands :class="defineClass(8)" />
        <EastOfEngland :class="defineClass(10)" />
        <London :class="defineClass(13)" />
        <SouthEast :class="defineClass(14)" />
        <SouthWest :class="defineClass(11)" />
        <Wales :class="defineClass(17)" />
        <Scotland :class="defineClass(16)" />
      </g>
    </svg>
    <div class="map__legend">
      <span class="text-danger">Very High</span>
      <span class="text-warning">High</span>
      <span class="text-info">Moderate</span>
      <span class="text-primary">Low</span>
      <span class="text-success">Very Low</span>
    </div>
  </div>
</template>

<script lang="ts">
import NorthEast from '@/components/regions/NorthEast.vue'
import NorthWest from '@/components/regions/NorthWest.vue'
import Yorkshire from '@/components/regions/Yorkshire.vue'
import EastMidlands from '@/components/regions/EastMidlands.vue'
import WestMidlands from '@/components/regions/WestMidlands.vue'
import EastOfEngland from '@/components/regions/EastOfEngland.vue'
import London from '@/components/regions/London.vue'
import Scotland from '@/components/regions/Scotland.vue'
import SouthEast from '@/components/regions/SouthEast.vue'
import SouthWest from '@/components/regions/SouthWest.vue'
import Wales from '@/components/regions/Wales.vue'
import store from '@/store'
import { RegionIntencity } from '@/models/RegionIntencity'
import { Options, Vue } from 'vue-class-component'

@Options({
  components: {
    NorthEast,
    NorthWest,
    Yorkshire,
    EastMidlands,
    WestMidlands,
    EastOfEngland,
    London,
    Scotland,
    SouthEast,
    SouthWest,
    Wales,
  },
  watch: {
    regionsData: function (value) {
      this.paintRegions(value)
    },
  },
})
export default class CarbonMap extends Vue {
  public loading = false
  public colorMap = new Map([[4, '']])

  get regionsData(): RegionIntencity[] {
    return store.state.regionsData
  }

  mounted(): void {
    this.loadData()
  }

  async loadData(): Promise<void> {
    this.loading = true
    await store.dispatch('loadRegionsData')
    this.loading = false
  }

  regionSelected(name: string): void {
    console.log(name)
  }

  defineClass(regionId: number): string {
    return this.colorMap.get(regionId) || ''
  }

  paintRegions(data: RegionIntencity[]): void {
    for (let element of data) {
      this.colorMap.set(
        element.regionid,
        this.determineClassName(element?.intensity?.index)
      )
    }
  }

  determineClassName(intensityIndex: string | null): string {
    switch (intensityIndex) {
      case 'very low':
        return 'very-low-level'
      case 'low':
        return 'low-level'
      case 'moderate':
        return 'moderate-level'
      case 'high':
        return 'high-level'
      case 'very high':
        return 'very-high-level'
      default:
        return ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/colors.scss';

.map {
  .map__legend {
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
  }
}
svg {
  width: 100%;
}
.land {
  fill: #cccccc;
  fill-opacity: 1;
  stroke: white;
  stroke-opacity: 1;
  stroke-width: 0.5;
  cursor: pointer;
  &:hover {
    stroke-width: 2;
  }
}
.very-low-level {
  fill: $success;
}
.low-level {
  fill: $primary;
}
.moderate-level {
  fill: $info;
}
.high-level {
  fill: $warning;
}
.very-high-level {
  fill: $danger;
}

@media screen and (max-width: 750px) {
  #app {
    padding: 4rem;
    .map {
      .map__legend {
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>
