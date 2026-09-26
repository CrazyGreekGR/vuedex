<script setup>
import Header from '@/components/Header.vue'
import PkmnInfo from './PkmnInfo.vue'
import SearchBox from './SearchBox.vue'
import { ref } from 'vue'

const pkmnName = ref('')
const pkmnSprite = ref('')

async function handleQuery(value) {
  try {
    const fetched = await fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
    if (!fetched.ok) {
      console.error(`Response status: ${fetched.status}`)
      if (fetched.status === 404) {
        pkmnName.value = 'No such Pokemon found!'
        pkmnSprite.value = ''
      }
      return
    }

    const result = await fetched.json()
    pkmnName.value = String(result.name).charAt(0).toUpperCase() + String(result.name).slice(1)
    if (pkmnName.value === 'Undefined') {
      pkmnName.value = 'Empty text box!'
    }
    pkmnSprite.value = result.sprites.front_default
  } catch (error) {
    console.error(error.message)
  }
}
</script>

<template>
  <div id="DexContainer">
    <Header />
    <SearchBox @query="handleQuery" />
    <PkmnInfo :sprite-url="pkmnSprite" :pkmn-name="pkmnName" />
  </div>
</template>

<style scoped>
#DexContainer {
  width: 27rem;
  height: 35rem;
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
