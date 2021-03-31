import { shallowMount } from '@vue/test-utils'
import Main from '@/components/Main.vue'
import CarbonMap from '@/components/CarbonMap.vue'
import store from '../../src/store'

jest.mock('../../src/store', () => ({
  state: {
    generationMix: '',
  },
  dispatch: jest.fn(),
}))

describe('Main.vue', () => {
  const wrapper = shallowMount(Main)

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain('<div class="main">')
    expect(wrapper.html()).toContain('<div class="map-container">')
    expect(wrapper.html()).toContain('<div class="chart-container">')
    expect(wrapper.html()).toContain('<div class="info-container">')
  })

  it('region selection should trigger action call', () => {
    wrapper.findComponent(CarbonMap).vm.$emit('region-selected', 2)
    expect(store.dispatch).toHaveBeenCalled()
  })
})
