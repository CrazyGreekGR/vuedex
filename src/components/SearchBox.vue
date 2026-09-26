<script setup>
import { ref } from 'vue'
const query = ref('')

const emit = defineEmits(['query'])
</script>

<template>
  <div>
    <input
      :value="query"
      @input="query = $event.target.value"
      @keyup.enter="
        () => {
          emit('query', query)
        }
      "
    />
    <button
      @click="
        () => {
          emit('query', query)
        }
      "
    >
      Search
    </button>
  </div>
</template>

<style scoped>
div {
  display: flex;
}
input {
  height: 40px;
  width: 300px;
  position: relative;
  background-color: #474e58;
  color: white;
  font-family: 'Roboto';
  font-size: x-large;
  border-style: none;
  left: 15px;
  border-radius: 10px;
}
button {
  position: relative;
  left: 30px;
  border-style: none;
  border-radius: 10px;
  width: 80px;
  background-color: #616b78;
  cursor: default;
  transition: background-color 0.2s;
  color: white;
}

button:hover {
  background-color: #272b30;
  transition: background-color 0.2s;
  cursor: pointer;
}
</style>
