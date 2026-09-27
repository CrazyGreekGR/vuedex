<script setup>
const props = defineProps({
  pkmnName: {
    type: String,
    default: 'NO POKEMON',
  },
})
</script>

<template>
  <h1>{{ pkmnName || 'NO POKEMON' }}'s Moves</h1>
  <div id="movesContainer">
    <div id="moves">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
#movesContainer {
  position: relative;
  top: 18vh;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  color: white;
  font-family: 'Robota';
  font-size: x-large;
  width: 100%;
}
#moves {
  align-self: stretch;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  row-gap: 3vh;
  column-gap: 4vw;
  overflow-y: auto;
  max-height: clamp(150px, 30vh, 350px);
  justify-items: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  background-color: #3b424b;

  scrollbar-width: thin;
  scrollbar-color: #616872 #2a2f36;
}
#moves::-webkit-scrollbar {
  width: 8px;
}
#moves::-webkit-scrollbar-track {
  background: #2a2f36; /* slightly darker than your card, reads as an inset groove */
  border-radius: 10px;
  margin: 4px 0; /* inset from top/bottom edges */
}
#moves::-webkit-scrollbar-thumb {
  background: #616872;
  border-radius: 10px;
  border: 2px solid #2a2f36; /* creates a subtle padding effect around the thumb */
}
#moves::-webkit-scrollbar-thumb:hover {
  background: #7a8494;
}
h1 {
  color: white;
  position: relative;
  top: clamp(40px, 20vh, 20vh);
  align-self: center;
}
</style>
