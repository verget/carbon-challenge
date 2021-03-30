<template>
  <div class="information-block card">
    <p>Data collection interval: <br />{{ lastCallFrom }} - {{ lastCallTo }}</p>
    <p>Choose region to see detailed information</p>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import store from '@/store'

@Options({
  watch: {
    regionsData: function (value) {
      console.log(value)
    },
  },
})
export default class IntensityChart extends Vue {
  get lastCallFrom(): string {
    return store?.state?.lastCallFrom
      ? new Date(store.state.lastCallFrom).toLocaleTimeString('en-US')
      : ''
  }

  get lastCallTo(): string {
    return store.state.lastCallTo
      ? new Date(store.state.lastCallTo).toLocaleTimeString('en-US')
      : ''
  }
}
</script>

<style lang="scss" scoped></style>
