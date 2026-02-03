<template>
  <div class="input-card">
    <InputArea v-model="prompt" />
    <ControlBar 
      @clear="clearPrompt" 
      @start="startGeneration" 
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import InputArea from './input/InputArea.vue';
import ControlBar from './input/ControlBar.vue';

const prompt = ref('');

const clearPrompt = () => {
  prompt.value = '';
};

const startGeneration = () => {
  console.log('Start generation with prompt:', prompt.value);
};
</script>

<style scoped>
.input-card {
  width: 768px;
  max-width: 90%;
  background-color: rgba(19, 21, 27, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  position: relative;
}
</style>
