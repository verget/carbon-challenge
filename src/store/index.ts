import { http } from '@/services/http'
import { createStore } from 'vuex'

const baseURL = 'https://api.carbonintensity.org.uk'

export default createStore({
  state: {
    regionsData: [],
  },
  mutations: {
    SET_REGIONS_DATA(state, data) {
      state.regionsData = data || []
    },
  },
  actions: {
    async loadRegionsData({ commit }) {
      try {
        const response = await http({
          url: `${baseURL}/regional`,
          method: 'get',
        })
        commit('SET_REGIONS_DATA', response?.data[0]?.regions)
      } catch (error) {
        console.error(error)
      }
    },
  },
  modules: {},
})
