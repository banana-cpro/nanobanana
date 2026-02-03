<template>
  <div class="input-card">
    <div class="select-group">
      <el-select v-model="aspectRatio" size="small" class="aspect-ratio-select" popper-class="my-select-dropdown">
        <el-option v-for="item in aspectRatioOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="imageSize" size="small" class="image-size-select" popper-class="my-select-dropdown">
        <el-option v-for="item in imageSizeOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
    <InputArea 
      v-model="prompt" 
      :clearImages="clearImagesFlag"
      @update:referenceImages="handleReferenceImages"
    />
    <ControlBar 
      @clear="clearPrompt" 
      @start="startGeneration"
      :loading="loading"
      :progress="progress"
      :aspectRatio="aspectRatio"
      @update:aspectRatio="aspectRatio = $event"
    />
    <!-- 进度条 -->
    <div v-if="loading && progress > 0" class="progress-container">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progress + '%' }"></div>
      </div>
      <div class="progress-text">{{ progress }}%</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import InputArea from './input/InputArea.vue';
import ControlBar from './input/ControlBar.vue';
import { generateImage } from '../api/draw.js';

const emit = defineEmits(['images-generated']);

const prompt = ref('');
const loading = ref(false);
const progress = ref(0);
const generatedImages = ref([]);
const referenceImageUrls = ref([]);
const clearImagesFlag = ref(false);
const aspectRatio = ref('auto');
const imageSize = ref('1K');

// 宽高比选项
const aspectRatioOptions = [
  { value: 'auto', label: 'auto' },
  { value: '1:1', label: '1:1' },
  { value: '2:3', label: '2:3' },
  { value: '3:2', label: '3:2' },
  { value: '3:4', label: '3:4' },
  { value: '4:3', label: '4:3' },
  { value: '4:5', label: '4:5' },
  { value: '5:4', label: '5:4' },
  { value: '9:16', label: '9:16' },
  { value: '16:9', label: '16:9' },
  { value: '9:21', label: '9:21' },
  { value: '21:9', label: '21:9' }
];

// 图片尺寸选项
const imageSizeOptions = [
  { value: '1K', label: '1K' },
  { value: '2K', label: '2K' },
  { value: '4K', label: '4K' }
];

const clearPrompt = () => {
  prompt.value = '';
  generatedImages.value = [];
  progress.value = 0;
  referenceImageUrls.value = [];
  // 触发清空参考图
  clearImagesFlag.value = !clearImagesFlag.value;
  // 通知父组件清空图片
  emit('images-generated', []);
};

const handleReferenceImages = (urls) => {
  referenceImageUrls.value = urls;
};

const startGeneration = async () => {
  if (!prompt.value || prompt.value.trim() === '') {
    alert('请输入提示词');
    return;
  }

  if (loading.value) {
    return;
  }

  try {
    loading.value = true;
    progress.value = 0;
    generatedImages.value = [];
    
    const response = await generateImage({
      prompt: prompt.value,
      urls: referenceImageUrls.value, // 传递参考图 URL
      aspectRatio: aspectRatio.value, // 传递宽高比
      imageSize: imageSize.value, // 传递图片尺寸
      onProgress: (progressValue, data) => {
        progress.value = progressValue;
        console.log('进度更新:', progressValue + '%', data);
        
        // 如果生成完成，保存图片
        if (data.status === 'succeeded' && data.results) {
          generatedImages.value = data.results.map(result => ({
            url: result.url,
            content: result.content
          }));
          // 通知父组件更新图片
          emit('images-generated', generatedImages.value);
        }
      }
    });
    
    console.log('生成成功:', response);
    
    // 确保最终结果被保存
    if (response.results) {
      generatedImages.value = response.results.map(result => ({
        url: result.url,
        content: result.content
      }));
      // 通知父组件更新图片
      emit('images-generated', generatedImages.value);
    }
    
    progress.value = 100;
  } catch (error) {
    console.error('生成失败:', error);
    
    // 提供更友好的错误提示
    let errorMessage = error.message || '生成失败，请稍后重试';
    alert(errorMessage);
  } finally {
    loading.value = false;
    // 如果进度不是100，保持显示
    if (progress.value < 100) {
      setTimeout(() => {
        progress.value = 0;
      }, 2000);
    }
  }
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
  margin: 0 auto;
  flex-shrink: 0;
}

.progress-container {
  margin-top: 16px;
  padding: 12px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #14b8a6, #0ea5e9);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 12px;
  color: var(--text-secondary);
  text-align: center;
}


.select-group {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

/* Element Plus Select 样式覆盖 */
:deep(.aspect-ratio-select),
:deep(.image-size-select) {
  width: 100px;
}

:deep(.aspect-ratio-select .el-select__wrapper),
:deep(.image-size-select .el-select__wrapper) {
  background-color: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid transparent !important;
  border-radius: 6px !important;
  box-shadow: none !important;
  padding: 6px 12px !important;
  min-height: auto !important;
}

:deep(.aspect-ratio-select .el-select__wrapper:hover),
:deep(.image-size-select .el-select__wrapper:hover) {
  background-color: rgba(255, 255, 255, 0.1) !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
}

:deep(.aspect-ratio-select .el-select__placeholder),
:deep(.image-size-select .el-select__placeholder) {
  color: var(--text-secondary) !important;
  font-size: 12px !important;
}

:deep(.aspect-ratio-select .el-select__selected-item),
:deep(.image-size-select .el-select__selected-item) {
  color: var(--text-secondary) !important;
  font-size: 12px !important;
}

:deep(.aspect-ratio-select .el-select__caret),
:deep(.image-size-select .el-select__caret) {
  color: var(--text-secondary) !important;
  opacity: 0.6 !important;
}

/* 下拉菜单样式 */
:deep(.my-select-dropdown) {
  background-color: rgba(0, 0, 0, 0.9) !important;
  backdrop-filter: blur(12px) !important;
  border: 1px solid transparent !important;
  border-radius: 6px !important;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3) !important;
}

:deep(.my-select-dropdown .el-select-dropdown__item) {
  color: var(--text-secondary) !important;
  font-size: 12px !important;
  padding: 8px 12px !important;
  background-color: transparent !important;
}

:deep(.my-select-dropdown .el-select-dropdown__item:hover) {
  background-color: rgba(255, 255, 255, 0.1) !important;
  color: var(--text-secondary) !important;
}

:deep(.my-select-dropdown .el-select-dropdown__item.is-selected) {
  background-color: rgba(20, 184, 166, 0.2) !important;
  color: #14b8a6 !important;
}
</style>
