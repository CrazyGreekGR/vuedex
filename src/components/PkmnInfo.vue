<script setup>
import { ref, watchEffect } from 'vue'
import { trimSprite } from '@/utils/trimSprite'
import Missing from '@/assets/pokemonmissing.svg'

const props = defineProps({
  spriteUrl: {
    type: String,
    default: Missing,
  },
  pkmnName: {
    type: String,
    default: 'NO PKMN',
  },
})

const displaySrc = ref(props.spriteUrl)

watchEffect(async () => {
  const src = props.spriteUrl || Missing
  displaySrc.value = await trimSprite(src)
})
</script>

<template>
  <div id="overallBox">
    <div id="imgBox">
      <Transition name="sprite-fade" mode="out-in">
        <img :key="displaySrc" :src="displaySrc" alt="Sprite" />
      </Transition>
    </div>
    <div id="textBox">
      <Transition name="name-fade" mode="out-in">
        <p id="pkmnName" :key="pkmnName">{{ pkmnName || 'NO PKMN' }}</p>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
#overallBox {
  background-color: aqua;
  position: relative; /* establishes the reference frame for imgBox + textBox */
}

#imgBox {
  display: flex;
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: #616872;
  border-radius: 5px;
  top: 160px;
  left: 40px;
  overflow: hidden;
  box-shadow: 0px 0px 8px 1px #121212;
}

img {
  width: 100%;
  height: 100%;
  display: block;
  image-rendering: pixelated;
  object-fit: contain; /* now safe since padding is gone */
  object-position: center;
}

#textBox {
  position: absolute;
  top: 160px; /* aligned with imgBox's top */
  left: 150px; /* imgBox's left (40) + imgBox's width (100) + 10px gap */
  display: flex;
  flex-direction: column;
}

#pkmnName {
  color: white;
  font-family: 'Roboto';
  font-size: xx-large;
  position: relative;
  left: 20px;
  bottom: 5px;
}

.sprite-fade-enter-active,
.sprite-fade-leave-active {
  transition: opacity 0.25s ease;
}

.sprite-fade-enter-from,
.sprite-fade-leave-to {
  opacity: 0;
}

.name-fade-enter-active,
.name-fade-leave-active {
  transition: opacity 0.25s ease;
}

.name-fade-enter-from,
.name-fade-leave-to {
  opacity: 0;
}
</style>
