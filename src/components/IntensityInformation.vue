<template>
  <div class="information-block card">
    <p v-if="selectedRegion">
      {{ selectedRegion }}
      <img
        class="information-block__cancel-icon"
        src="@/assets/images/cancel.svg"
        alt="Cancel"
        @click="cancelRegionSelection"
      />
    </p>
    <p v-else>Choose region to see detailed information</p>
    <p>
      Data collection interval:
      <br />
      {{ lastCallFromFormated }} - {{ lastCallToFormated }}
    </p>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import store from '@/store'

export default class IntensityChart extends Vue {
  get lastCallFromFormated(): string {
    return store?.state?.lastCallFrom
      ? new Date(store.state.lastCallFrom).toLocaleTimeString('en-US')
      : ''
  }

  get lastCallToFormated(): string {
    return store?.state?.lastCallTo
      ? new Date(store.state.lastCallTo).toLocaleTimeString('en-US')
      : ''
  }

  get selectedRegion(): string {
    return store.state.selectedRegion
  }

  cancelRegionSelection(): void {
    this.$emit('clearRegion')
  }
}
</script>
<style lang="scss" scoped>
.information-block__cancel-icon {
  height: 14px;
  margin-left: 5px;
  cursor: pointer;
}
</style>
