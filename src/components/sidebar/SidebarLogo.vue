<template>
  <div class="sidebar-header">
    <div class="logo">
      <component :is="icons.Sparkles" class="logo-icon" />
      <span class="logo-text">星遇</span>
      <span class="logo-sub">STAR ENCOUNTER</span>
    </div>
  </div>
</template>

<script setup>
import { Sparkles } from 'lucide-vue-next';
const icons = { Sparkles };
</script>

<style scoped>
.sidebar-header {
  margin-bottom: 32px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-primary);
  font-weight: 600;
}

.logo-icon {
  width: 24px;
  height: 24px;
}

.logo-text {
  font-size: 18px;
}

.logo-sub {
  font-size: 10px;
  color: var(--text-muted);
  margin-top: 4px;
  margin-left: 4px;
}
</style>
