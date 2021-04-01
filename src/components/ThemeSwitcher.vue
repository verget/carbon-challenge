<template>
  <div class="theme-switcher-container">
    <label class="theme-switcher" for="checkbox">
      <input
        type="checkbox"
        id="checkbox"
        @change="changeTheme"
        :checked="isDark"
      />
      <span class="slider round"></span>
    </label>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import store from '@/store'

export default class Spinner extends Vue {
  get isDark(): boolean {
    return store.state.theme === 'dark'
  }

  created(): void {
    if (window.matchMedia) {
      const lighThemeMatch = window.matchMedia('(prefers-color-scheme: light)')
      if (lighThemeMatch?.matches) {
        this.setTheme('light')
      }
    }
  }

  changeTheme(event: Event): void {
    this.setTheme((event.target as HTMLInputElement).checked ? 'dark' : 'light')
  }

  setTheme(value: 'dark' | 'light'): void {
    store.commit('SET_THEME', value)
  }
}
</script>
<style lang="scss" scoped>
.theme-switcher-container {
  display: flex;
  justify-content: flex-end;
}
.theme-switcher {
  display: inline-block;
  margin-right: 50px;
  height: 34px;
  position: relative;
  width: 60px;
  input {
    display: none;
  }
  .slider {
    display: block;
    background-color: #000;
    bottom: 0;
    cursor: pointer;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: 0.4s;
    &:before {
      background-color: #fff;
      bottom: 4px;
      content: '';
      height: 26px;
      left: 4px;
      position: absolute;
      transition: 0.4s;
      width: 26px;
    }
    &:after {
      content: '🌙';
      display: block;
      position: absolute;
      top: 12px;
      right: 5px;
      font-size: 13px;
      line-height: 13px;
    }
  }
  .slider.round {
    border-radius: 34px;
    &::before {
      border-radius: 50%;
    }
  }
}

.theme-switcher input:checked + .slider:after {
  content: '☀️';
  right: auto;
  left: 7px;
  font-size: 16px;
}
.theme-switcher input:checked + .slider:before {
  transform: translateX(26px);
}
</style>
