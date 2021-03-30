<template>
  <div>
    <carbon-map />
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
export default class Main extends Vue {
  msg!: string
}
</script>

<style lang="scss" scoped></style>
