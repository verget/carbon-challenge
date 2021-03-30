<template>
  <Main />
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
#app {
  background: #fff;
  max-width: 68rem;
  margin: 1rem auto 3rem auto;
  padding: 1rem;
  padding-top: 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2.5rem 5rem 0 rgba(0, 0, 0, 0.1);
}
@media screen and (min-width: 550px) {
  #app {
    padding: 2rem;
  }
}
#app > * {
  max-width: 50rem;
  margin-left: auto;
  margin-right: auto;
}
</style>
