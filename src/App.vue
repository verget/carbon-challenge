<template>
  <div class="container">
    <Main class="card" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Main from '@/components/Main.vue'

@Options({
  components: {
    Main,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
.container {
  padding-top: 0;
  padding-bottom: 5px;
  position: relative;
}
.container > * {
  max-width: 50rem;
  margin-left: auto;
  margin-right: auto;
}
</style>
