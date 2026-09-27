<script setup>
const props = defineProps({
  pkmnName: {
    type: String,
    default: 'NO POKEMON',
  },
})
</script>

<template>
  <div id="movesContainer">
    <h1>{{ pkmnName }}'s Moves</h1>
    <div id="moves">
      <p>HELLO</p>
      <p>THERE</p>
      <p>MOVES</p>
      <p>COMING SOON</p>
    </div>
  </div>
</template>

<style scoped>
#movesContainer {
  position: relative;
  top: 23vh;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}
h1 {
  font-family: 'Robota';
  color: white;
}
</style>
