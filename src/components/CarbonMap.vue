<template>
  <div>
    <svg
      viewBox="300 150 500 1020"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:amcharts="http://amcharts.com/ammap"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.1"
    >
      <defs>
        <!-- All areas are listed in the line below. You can use this list in your script. -->
        <!--{id:"GB-UKC"},{id:"GB-UKD"},{id:"GB-UKE"},{id:"GB-UKF"},{id:"GB-UKG"},{id:"GB-UKH"},{id:"GB-UKI"},{id:"GB-UKJ"},{id:"GB-UKK"},{id:"GB-UKL"},{id:"GB-UKM"},{id:"GB-UKN"},{id:"GG"},{id:"JE"},{id:"IM"},{id:"IE"}-->
      </defs>
      <g>
        <NorthEast
          @click="regionSelected('NorthEast')"
          ref="NorthEast"
          class="ass"
        />
        <NorthWest />
        <Yorkshire />
        <EastMidlands />
        <WestMidlands />
        <EastOfEngland />
        <London />
        <SouthEast />
        <SouthWest />
        <Wales />
        <Scotland />
      </g>
    </svg>
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

  paintRegions(data: RegionIntencity[]) {
    ;(this.$refs['NorthEast'] as any).$el.classList.value = 'red'
    console.log(data)
  }
}
</script>

<style lang="scss" scoped>
svg {
  width: 350px;
}
.red {
  fill: #e67e22;
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
</style>
