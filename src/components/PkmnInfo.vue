<script setup>
import { ref, watchEffect, computed } from 'vue'
import { trimSprite } from '@/utils/trimSprite'
import { typesToSprites } from '@/utils/typesToSprites'
import Missing from '@/assets/pokemonmissing.svg?url'

const props = defineProps({
  spriteUrl: {
    type: String,
    default: Missing,
  },
  pkmnName: {
    type: String,
    default: 'NO POKEMON',
  },
  pkmnType: {
    type: String,
    default: 'NO POKEMON',
  },
})

const displaySrc = ref(props.spriteUrl)
const pkmnType1Sprite = ref('')
const pkmnType2Sprite = ref('')

//process type for typesToSprites

const typeParts = computed(() => {
  const raw = props.pkmnType || ''
  return raw.split('/').map((s) => s.toLowerCase().trim())
})

const type1 = computed(() => typeParts.value[0] || 'notype')
const type2 = computed(() => typeParts.value[1] || undefined)

watchEffect(() => {
  pkmnType1Sprite.value = typesToSprites(type1.value)
  if (typeof pkmnType2Sprite.value !== undefined) {
    pkmnType2Sprite.value = typesToSprites(type2.value)
  }
})

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
        <p id="pkmnName" :key="pkmnName">{{ pkmnName || 'NO POKEMON' }}</p>
      </Transition>
      <div class="pkmnTypes">
        <Transition name="type-fade" mode="out-in">
          <img :key="pkmnType1Sprite" class="pkmn1Type" :src="pkmnType1Sprite" alt="pkmn type" />
        </Transition>
        <Transition name="type-fade" mode="out-in">
          <img
            v-if="pkmnType2Sprite"
            :key="pkmnType2Sprite"
            class="pkmn2Type"
            :src="pkmnType2Sprite"
            alt="pkmn type"
          />
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
p {
  margin: 8px 0px 0px 0px;
  color: white;
  font-family: 'Roboto';
  position: relative;
  left: 7px;
  top: 5px;
}

#overallBox {
  background-color: aqua;
  position: absolute;
  top: 5vh;
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
  font-size: clamp(1.3rem, 7vw, 2rem);
  white-space: nowrap;
  bottom: 5px;
}

.pkmn1Type {
  image-rendering: pixelated;
  width: clamp(24px, 60px, 60px);
  position: relative;
  top: 1.5vh;
  left: clamp(0.5vw, 7px, 1.2vw);
}

.pkmn2Type {
  image-rendering: pixelated;
  width: clamp(24px, 60px, 60px);
  position: relative;
  top: 1.5vh;
  left: clamp(0.5vw, 55px, 1.2vw);
}

.pkmnTypes {
  display: flex;
  flex-direction: row;
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

.type-fade-enter-active,
.type-fade-leave-active {
  transition: opacity 0.25s ease;
}

.type-fade-enter-from,
.type-fade-leave-to {
  opacity: 0;
}
</style>
