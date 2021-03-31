import { shallowMount } from '@vue/test-utils'
import CarbonMap from '@/components/CarbonMap.vue'
import NorthEast from '@/components/regions/NorthEast.vue'

const regionsDataMock = [
  {
    regionid: 4,
    intensity: {
      index: 'very low',
    },
  },
  {
    regionid: 3,
    intensity: {
      index: 'moderate',
    },
  },
  {
    regionid: 5,
    intensity: {
      index: 'high',
    },
  },
]

describe('CarbonMap.vue', () => {
  const wrapper = shallowMount(CarbonMap)

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain('svg')
    expect(wrapper.html()).toContain('<div class="map">')
    expect(wrapper.html()).toContain('<div class="map__legend">')
  })

  it('forms the correct color map from props', async () => {
    await wrapper.setProps({ regionsData: regionsDataMock })
    expect(wrapper.vm.colorMap.get(5)).toEqual('high-level')
  })

  it('paints regions according given information', async () => {
    await wrapper.setProps({ regionsData: regionsDataMock })
    expect(wrapper.findComponent(NorthEast).classes()).toContain(
      'very-low-level'
    )
  })
})
