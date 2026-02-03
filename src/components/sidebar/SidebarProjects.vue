<template>
  <div class="section-title">
    <span>项目列表</span>
    <component :is="icons.Plus" class="icon-add" />
  </div>
  <div class="project-list">
    <div class="list-item">
      <component :is="icons.Folder" class="icon-folder" />
      <span>新的项目</span>
    </div>
    <div class="list-item">
      <component :is="icons.Folder" class="icon-folder" />
      <span>测试项目</span>
    </div>
    <div class="list-item">
      <component :is="icons.Folder" class="icon-folder" />
      <span>项目新手册</span>
    </div>
  </div>
</template>

<script setup>
import { Plus, Folder } from 'lucide-vue-next';
const icons = { Plus, Folder };
</script>

<style scoped>
.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 12px;
  padding: 0 12px;
  cursor: pointer;
}

.icon-add {
  width: 14px;
  height: 14px;
  cursor: pointer;
}

.project-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 24px;
}

.list-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}

.list-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
}

.icon-folder {
  width: 16px;
  height: 16px;
}
</style>
