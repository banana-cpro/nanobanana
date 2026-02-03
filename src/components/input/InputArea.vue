<template>
  <div class="input-area">
    <textarea 
      placeholder="输入你的提示词..."
      v-model="prompt"
    ></textarea>
    
    <!-- Upload Reference -->
    <div class="upload-btn">
      <div class="upload-placeholder">
        <span>+添加参考图</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const prompt = ref('');
const emit = defineEmits(['update:modelValue']);
const props = defineProps(['modelValue']);

watch(prompt, (newVal) => {
  emit('update:modelValue', newVal);
});

// Sync from prop if needed (though v-model usually covers it)
</script>

<style scoped>
.input-area {
  position: relative;
  height: 240px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  margin-bottom: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

textarea {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  resize: none;
  color: var(--text-primary);
  font-size: 15px;
  outline: none;
  padding-bottom: 80px; /* Space for upload button */
}

textarea::placeholder {
  color: var(--text-muted);
}

.upload-btn {
  position: absolute;
  bottom: 16px;
  left: 16px;
}

.upload-placeholder {
  width: 80px;
  height: 80px;
  border: 1px dashed var(--border-color);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: var(--text-muted);
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.02);
  transition: border-color 0.2s;
}

.upload-placeholder:hover {
  border-color: var(--text-secondary);
  color: var(--text-secondary);
}
</style>
