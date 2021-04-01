import { http } from '@/services/http'
import { createStore } from 'vuex'

const baseURL = 'https://api.carbonintensity.org.uk'

export default createStore({
  state: {
    regionsData: [],
    generationMix: [],
    lastCallFrom: '',
    lastCallTo: '',
    selectedRegion: '',
    theme: 'dark',
  },
  mutations: {
    SET_REGIONS_DATA(state, data) {
      state.regionsData = data || []
    },
    SET_GENERATION_MIX(state, data) {
      state.generationMix = data || []
    },
    SET_LAST_CALL_FROM(state, data) {
      state.lastCallFrom = data || ''
    },
    SET_LAST_CALL_TO(state, data) {
      state.lastCallTo = data || ''
    },
    SET_SELECTED_REGION(state, data) {
      state.selectedRegion = data || ''
    },
    SET_THEME(state, data) {
      state.theme = data || ''
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
        commit('SET_LAST_CALL_FROM', response?.data[0]?.from)
        commit('SET_LAST_CALL_TO', response?.data[0]?.to)
      } catch (error) {
        console.error(error)
      }
    },

    async loadTotalGenerationMix({ commit }) {
      try {
        const response = await http({
          url: `${baseURL}/generation`,
          method: 'get',
        })
        commit('SET_GENERATION_MIX', response?.data?.generationmix)
        commit('SET_LAST_CALL_FROM', response?.data?.from)
        commit('SET_LAST_CALL_TO', response?.data?.to)
        commit('SET_SELECTED_REGION', '')
      } catch (error) {
        console.error(error)
      }
    },

    async loadRegionGenerationMix({ commit }, regionId) {
      try {
        const response = await http({
          url: `${baseURL}/regional/regionid/${regionId}`,
          method: 'get',
        })
        commit('SET_GENERATION_MIX', response?.data[0]?.data[0]?.generationmix)
        commit('SET_LAST_CALL_FROM', response?.data[0]?.data[0]?.from)
        commit('SET_LAST_CALL_TO', response?.data[0]?.data[0]?.to)
        commit('SET_SELECTED_REGION', response?.data[0]?.shortname)
      } catch (error) {
        console.error(error)
      }
    },
  },
  modules: {},
})
