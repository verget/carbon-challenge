import { GenerationMix } from './GenerationMix'
import { Intencity } from './Intencity'

export interface RegionIntencity {
  dnoregion: string
  generationmix: GenerationMix[]
  intensity: Intencity
  regionid: number
  shortname: string
}
