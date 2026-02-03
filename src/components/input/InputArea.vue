<template>
  <div class="input-area">
    <textarea 
      placeholder="输入你的提示词..."
      v-model="prompt"
    ></textarea>
    
    <!-- 隐藏的文件输入 -->
    <input 
      ref="fileInput"
      type="file" 
      accept="image/*" 
      multiple
      @change="handleFileSelect"
      style="display: none"
    />
    
    <!-- 参考图预览区域 -->
    <div v-if="referenceImages.length > 0" class="reference-images">
      <div 
        v-for="(image, index) in referenceImages" 
        :key="index"
        class="reference-image-item"
      >
        <img :src="image.url" :alt="`参考图 ${index + 1}`" />
        <button 
          class="remove-btn" 
          @click="removeImage(index)"
          title="删除"
        >
          ×
        </button>
      </div>
      <div 
        class="upload-placeholder add-more"
        @click="triggerFileInput"
      >
        <span>+</span>
      </div>
    </div>
    
    <!-- Upload Reference -->
    <div v-else class="upload-btn">
      <div 
        class="upload-placeholder"
        @click="triggerFileInput"
      >
        <span>+添加参考图</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  clearImages: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue', 'update:referenceImages']);

const prompt = ref(props.modelValue);
const fileInput = ref(null);
const referenceImages = ref([]);

// 同步 prop 到本地 ref
watch(() => props.modelValue, (newVal) => {
  prompt.value = newVal;
});

// 监听清空信号
watch(() => props.clearImages, (shouldClear) => {
  if (shouldClear && referenceImages.value.length > 0) {
    clearAllImages();
  }
});

// 同步本地 ref 到父组件
watch(prompt, (newVal) => {
  emit('update:modelValue', newVal);
});

// 触发文件选择
const triggerFileInput = () => {
  fileInput.value?.click();
};

// 处理文件选择
const handleFileSelect = (event) => {
  const files = Array.from(event.target.files || []);
  
  if (files.length === 0) return;
  
  files.forEach(file => {
    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      alert(`${file.name} 不是有效的图片文件`);
      return;
    }
    
    // 验证文件大小（限制为 10MB）
    if (file.size > 10 * 1024 * 1024) {
      alert(`${file.name} 文件过大，请选择小于 10MB 的图片`);
      return;
    }
    
    // 读取文件并创建预览
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = {
        url: e.target.result, // base64 或 object URL
        file: file,
        name: file.name
      };
      
      referenceImages.value.push(imageData);
      updateReferenceImages();
    };
    
    reader.onerror = () => {
      alert(`读取 ${file.name} 失败`);
    };
    
    // 使用 FileReader 读取为 Data URL (base64)
    reader.readAsDataURL(file);
  });
  
  // 清空 input，允许重复选择同一文件
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

// 删除图片
const removeImage = (index) => {
  // 如果是 object URL，需要释放
  const image = referenceImages.value[index];
  if (image.url && image.url.startsWith('blob:')) {
    URL.revokeObjectURL(image.url);
  }
  
  referenceImages.value.splice(index, 1);
  updateReferenceImages();
};

// 清空所有图片
const clearAllImages = () => {
  // 释放所有 object URL
  referenceImages.value.forEach(image => {
    if (image.url && image.url.startsWith('blob:')) {
      URL.revokeObjectURL(image.url);
    }
  });
  referenceImages.value = [];
  updateReferenceImages();
};

// 更新参考图到父组件
const updateReferenceImages = () => {
  // 将图片转换为 URL 数组传递给父组件
  // 如果是 base64，直接传递；如果是 object URL，也传递（但可能需要先上传到服务器）
  const urls = referenceImages.value.map(img => img.url);
  emit('update:referenceImages', urls);
};
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
  transition: all 0.2s;
  user-select: none;
}

.upload-placeholder:hover {
  border-color: var(--text-secondary);
  color: var(--text-secondary);
  background-color: rgba(255, 255, 255, 0.05);
}

.reference-images {
  position: absolute;
  bottom: 16px;
  left: 16px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  max-width: calc(100% - 32px);
}

.reference-image-item {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.reference-image-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.remove-btn {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 1;
  padding: 0;
  transition: background-color 0.2s;
}

.remove-btn:hover {
  background-color: rgba(239, 68, 68, 0.9);
}

.upload-placeholder.add-more {
  width: 80px;
  height: 80px;
  font-size: 20px;
}
</style>
