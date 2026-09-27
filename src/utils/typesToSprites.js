import bug from '@/assets/types/bug.png'
import dark from '@/assets/types/dark.png'
import dragon from '@/assets/types/dragon.png'
import electric from '@/assets/types/electric.png'
import fairy from '@/assets/types/fairy.png'
import fighting from '@/assets/types/fighting.png'
import fire from '@/assets/types/fire.png'
import flying from '@/assets/types/flying.png'
import ghost from '@/assets/types/ghost.png'
import grass from '@/assets/types/grass.png'
import ground from '@/assets/types/ground.png'
import ice from '@/assets/types/ice.png'
import normal from '@/assets/types/normal.png'
import missing from '@/assets/types/missing.png'
import poison from '@/assets/types/poison.png'
import psychic from '@/assets/types/psychic.png'
import rock from '@/assets/types/rock.png'
import steel from '@/assets/types/steel.png'
import water from '@/assets/types/water.png'

const typeSprites = {
  bug,
  dark,
  dragon,
  electric,
  fairy,
  fighting,
  fire,
  flying,
  ghost,
  grass,
  ground,
  ice,
  normal,
  poison,
  psychic,
  rock,
  steel,
  water,
}

export function typesToSprites(type) {
  if (!type) return undefined // no type given at all — not an error, nothing to show
  if (!Object.hasOwn(typeSprites, type)) return missing // a real string, just not a recognized one — that's an actual error case
  return typeSprites[type]
}
