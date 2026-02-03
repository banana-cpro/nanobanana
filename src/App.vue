<template>
  <div class="app-container">
    <Sidebar />
    <div class="main-content">
      <!-- 图片展示区域（上方，可滚动） -->
      <div class="images-container">
        <div v-if="generatedImages.length > 0" class="result-container">
          <div 
            v-for="(image, index) in generatedImages" 
            :key="index" 
            class="result-image"
          >
            <img :src="image.url" :alt="`生成的图片 ${index + 1}`" />
            <a :href="image.url" target="_blank" class="download-btn">查看大图</a>
          </div>
        </div>
        <div v-else class="empty-state">
          <p>生成的图片将显示在这里</p>
        </div>
      </div>
      <!-- 输入卡片（固定在底部） -->
      <div class="input-wrapper">
        <InputCard @images-generated="handleImagesGenerated" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Sidebar from './components/Sidebar.vue';
import InputCard from './components/InputCard.vue';

const generatedImages = ref([]);

const handleImagesGenerated = (images) => {
  generatedImages.value = images;
};
</script>

<style scoped>
.app-container {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: var(--bg-dark);
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: radial-gradient(circle at 10% 20%, #2e1065 0%, transparent 40%),
              radial-gradient(circle at 90% 80%, #115e59 0%, transparent 40%),
              linear-gradient(to bottom right, #0f172a, #000000);
  position: relative;
  overflow: hidden;
}

.images-container {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  padding-bottom: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 0;
}

.input-wrapper {
  flex-shrink: 0;
  padding: 24px;
  padding-top: 0;
  display: flex;
  justify-content: center;
  background: linear-gradient(to top, 
    radial-gradient(circle at 50% 0%, #2e1065 0%, transparent 40%),
    radial-gradient(circle at 90% 80%, #115e59 0%, transparent 40%),
    linear-gradient(to bottom right, #0f172a, #000000));
}

.result-container {
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  padding-bottom: 24px;
}

.result-image {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background-color: rgba(19, 21, 27, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.result-image img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 12px;
}

.download-btn {
  display: block;
  margin-top: 12px;
  padding: 10px 16px;
  background-color: rgba(20, 184, 166, 0.2);
  color: #14b8a6;
  text-align: center;
  text-decoration: none;
  border-radius: 8px;
  font-size: 13px;
  transition: background-color 0.2s;
  border: 1px solid rgba(20, 184, 166, 0.3);
}

.download-btn:hover {
  background-color: rgba(20, 184, 166, 0.3);
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: var(--text-muted);
  font-size: 14px;
}

/* Add a subtle overlay for grain or texture if needed */
.main-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
}
</style>
