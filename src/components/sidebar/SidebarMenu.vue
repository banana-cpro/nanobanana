<template>
  <div class="menu-group">
    <div class="menu-item active">
      <span class="label">新对话</span>
      <component :is="icons.MessageSquarePlus" class="icon-right" />
    </div>
    <div class="menu-item">
      <span class="label">教程手册</span>
      <component :is="icons.HelpCircle" class="icon-right" />
    </div>
  </div>
</template>

<script setup>
import { MessageSquarePlus, HelpCircle } from 'lucide-vue-next';
const icons = { MessageSquarePlus, HelpCircle };
</script>

<style scoped>
.menu-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 32px;
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
  color: var(--text-primary);
}

.menu-item:hover, .menu-item.active {
  background-color: rgba(255, 255, 255, 0.05);
}

.icon-right {
  width: 16px;
  height: 16px;
  opacity: 0.7;
}
</style>
