import { createApp } from 'vue'
import './assets/styles/style.scss'
import App from './App.vue'
import store from './store'

createApp(App).use(store).mount('#app')
