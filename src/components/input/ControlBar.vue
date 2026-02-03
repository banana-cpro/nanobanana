<template>
  <div class="controls">
    <div class="settings-group">
      <div class="dropdown-btn badge">
        <component :is="icons.Sparkles" class="icon-sm" />
        <span>Nano Banana Pro (🍌)</span>
        <component :is="icons.ChevronDown" class="icon-xs" />
      </div>
      <div class="dropdown-btn">
        <span>1张</span>
        <component :is="icons.ChevronDown" class="icon-xs" />
      </div>
      <div class="dropdown-btn">
        <span>尺寸选择(默认1:1)</span>
        <component :is="icons.ChevronDown" class="icon-xs" />
      </div>
    </div>

    <div class="actions-group">
      <button class="btn-clear" @click="$emit('clear')">
        <component :is="icons.Trash2" class="icon-xs" />
        一键清空
      </button>
      <button class="btn-start" @click="$emit('start')">
        开始
        <span class="cost">+ 20</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { Sparkles, ChevronDown, Trash2 } from 'lucide-vue-next';

const icons = {
  Sparkles,
  ChevronDown,
  Trash2
};

defineEmits(['clear', 'start']);
</script>

<style scoped>
.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.settings-group {
  display: flex;
  gap: 8px;
}

.dropdown-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: rgba(255, 255, 255, 0.05);
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: background 0.2s;
  border: 1px solid transparent;
}

.dropdown-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.1);
}

.dropdown-btn.badge {
  background-color: rgba(255, 255, 255, 0.1);
  color: #fbbf24; /* Amber-400 for banana/gold */
}

.icon-sm {
  width: 14px;
  height: 14px;
}

.icon-xs {
  width: 12px;
  height: 12px;
  opacity: 0.6;
}

.actions-group {
  display: flex;
  gap: 12px;
  align-items: center;
}

.btn-clear {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-muted);
  padding: 6px 12px;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  transition: all 0.2s;
}

.btn-clear:hover {
  color: var(--text-secondary);
  background-color: rgba(255, 255, 255, 0.1);
}

.btn-start {
  display: flex;
  align-items: center;
  gap: 8px;
  background:linear-gradient(135deg, #14b8a6, #0ea5e9);
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  transition: opacity 0.2s;
}

.btn-start:hover {
  opacity: 0.9;
}

.cost {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
}
</style>
