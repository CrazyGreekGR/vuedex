<script setup>
import Header from '@/components/Header.vue'
import PkmnInfo from './PkmnInfo.vue'
import SearchBox from './SearchBox.vue'
import MovesContainer from './MovesContainer.vue'

import { ref } from 'vue'
import { capitalizeFirst } from '@/utils/capitalizeFirst.js'
import { formatMoves } from '@/utils/formatMoves.js'

const pkmnName = ref('')
const pkmnSprite = ref('')
const pkmnType = ref('')
const pkmnMoves = ref([])

async function handleQuery(value) {
  try {
    const fetched = await fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
    if (!fetched.ok) {
      console.error(`Response status: ${fetched.status}`)
      if (fetched.status === 404) {
        pkmnName.value = 'No such Pokemon!'
        pkmnSprite.value = ''
        pkmnType.value = 'No such Pokemon!'
      }
      return
    }

    const result = await fetched.json()
    pkmnName.value = capitalizeFirst(result.name)
    if (pkmnName.value === 'Undefined') {
      pkmnName.value = 'Empty text box!'
      pkmnType.value = 'Empty text box!'
    }
    pkmnSprite.value = result.sprites.front_default
    pkmnType.value = capitalizeFirst(result.types[0].type.name)
    if ((result.types.length = 2)) {
      pkmnType.value = pkmnType.value + `/${capitalizeFirst(result.types[1].type.name)}`
    }
    pkmnMoves.value = result.moves
      .slice(0, result.moves.length)
      .map((m) => formatMoves(m.move.name))
    console.log(`${pkmnName.value} has ${pkmnMoves.value.length} moves`)
  } catch (error) {
    console.error(error.message)
  }
}
</script>

<template>
  <div id="DexContainer">
    <Header />
    <SearchBox @query="handleQuery" />
    <PkmnInfo :sprite-url="pkmnSprite" :pkmn-name="pkmnName" :pkmn-type="pkmnType" />
    <MovesContainer v-if="pkmnMoves.length > 0" :pkmn-name="pkmnName">
      <p v-for="move in pkmnMoves" :key="move">{{ move }}</p>
    </MovesContainer>
  </div>
</template>

<style scoped>
#DexContainer {
  width: clamp(300px, 90vw, 27rem);
  height: clamp(400px, 90vh, 35rem);
  display: flex;
  flex-direction: column;
  background-color: #3f4650;
  overflow: hidden;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 8px 6px #121212;
  border-radius: 20px;
}
</style>
