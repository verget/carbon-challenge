<template>
  <div>
    <!-- <img src="@/assets/images/unitedKingdomLow.svg" alt=""> -->

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
        <NorthEast @click="regionSelected('NorthEast')" />
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
import { Options, Vue } from 'vue-class-component'
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
})
export default class CarbonMap extends Vue {
  msg!: string

  regionSelected(name: string): void {
    console.log(name)
  }
}
</script>

<style lang="scss" scoped>
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
</style>
