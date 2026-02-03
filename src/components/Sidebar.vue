<template>
  <div class="sidebar">
    <SidebarLogo />
    <SidebarMenu />
    <SidebarProjects />
    <SidebarHistory />
    <div class="spacer"></div>
    <SidebarFooter />
  </div>
</template>

<script setup>
import SidebarLogo from './sidebar/SidebarLogo.vue';
import SidebarMenu from './sidebar/SidebarMenu.vue';
import SidebarProjects from './sidebar/SidebarProjects.vue';
import SidebarHistory from './sidebar/SidebarHistory.vue';
import SidebarFooter from './sidebar/SidebarFooter.vue';
</script>

<style scoped>
.sidebar {
  width: 260px;
  height: 100vh;
  background-color: var(--bg-sidebar);
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  border-right: 1px solid var(--border-color);
  color: var(--text-secondary);
}

.spacer {
  flex: 1;
}
</style>
