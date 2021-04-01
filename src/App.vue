<template>
  <div class="container" :class="themeClass">
    <ThemeSwitcher />
    <Main class="card" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import store from '@/store'
import Main from '@/components/Main.vue'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'

@Options({
  components: {
    Main,
    ThemeSwitcher,
  },
})
export default class App extends Vue {
  get themeClass(): 'container_light' | 'container_dark' {
    return store.state.theme === 'light' ? 'container_light' : 'container_dark'
  }
}
</script>

<style lang="scss">
.container {
  padding-top: 0;
  padding-bottom: 5px;
  position: relative;
  padding-top: 1rem;
}

.container_dark {
  background: #002d3c;
}

.container_liht {
  background: #f4fafe;
}

.container > .card {
  max-width: 50rem;
  margin-left: auto;
  margin-right: auto;
}
</style>
