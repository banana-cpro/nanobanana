<template>
  <div class="sidebar-footer">
    <button class="subscription-btn">订阅与充值</button>
    <div class="user-profile">
      <div class="avatar"></div>
      <div class="user-info">
        <div class="username">名字</div>
        <div class="status">设置</div>
      </div>
      <div class="points">
        <component :is="icons.Zap" class="icon-points" />
        <span>星点 10000</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Zap } from 'lucide-vue-next';
const icons = { Zap };
</script>

<style scoped>
.sidebar-footer {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.subscription-btn {
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 10px;
  border-radius: 20px;
  font-size: 13px;
  transition: all 0.2s;
}

.subscription-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #d1d5db;
}

.user-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.username {
  font-size: 14px;
  color: var(--text-primary);
  font-weight: 500;
}

.status {
  font-size: 10px;
  color: var(--text-muted);
}

.points {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  font-size: 12px;
  color: var(--text-muted);
}

.icon-points {
  width: 12px;
  height: 12px;
  color: var(--accent-primary);
}
</style>
