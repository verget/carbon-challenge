import { http } from '@/services/http'
import mockGeneralPollutionData from '../mocks/pollution-general.json'
import mockRegionalPollution from '../mocks/pollution-regional.json'
import store from '../../src/store'
jest.mock('@/services/http')

afterEach(() => {
  jest.clearAllMocks()
})

describe('Global store', () => {
  it('should load general polution data and save is as expected', async () => {
    ;(http as jest.Mock).mockImplementation(() =>
      Promise.resolve(mockGeneralPollutionData)
    )
    await store.dispatch('loadTotalGenerationMix')
    expect(http).toHaveBeenCalled()
    expect(store.state['lastCallFrom']).toEqual(
      mockGeneralPollutionData.data.from
    )
    expect(store.state['lastCallTo']).toEqual(mockGeneralPollutionData.data.to)
    expect(store.state['selectedRegion']).toEqual('')
  })

  it('should load region polution data and save is as expected', async () => {
    ;(http as jest.Mock).mockImplementation(() =>
      Promise.resolve(mockRegionalPollution)
    )
    await store.dispatch('loadRegionGenerationMix', 3)
    expect(http).toHaveBeenCalled()
    expect(store.state['lastCallFrom']).toEqual(
      mockRegionalPollution.data[0].data[0].from
    )
    expect(store.state['lastCallTo']).toEqual(
      mockRegionalPollution.data[0].data[0].to
    )
    expect(store.state['selectedRegion']).toEqual('North West England')
  })
})
