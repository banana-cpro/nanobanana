<template>
  <div class="section-title history-title">
    <span>历史记录 (7天)</span>
    <component :is="icons.ChevronDown" class="icon-chevron" />
  </div>
  <div class="history-list">
    <div class="history-item active-history">
      <component :is="icons.Sparkles" class="icon-history" />
      <span>2026-2-3</span>
    </div>
  </div>
</template>

<script setup>
import { ChevronDown, Sparkles } from 'lucide-vue-next';
const icons = { ChevronDown, Sparkles };
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

.icon-chevron {
  width: 14px;
  height: 14px;
  cursor: pointer;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 24px;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}

.history-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
}

.active-history {
  color: var(--accent-purple);
}

.icon-history {
  width: 14px;
  height: 14px;
}
</style>
