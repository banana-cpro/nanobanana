<template>
  <div class="app-container">
    <Sidebar />
    <div class="main-content">
      <InputCard />
    </div>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue';
import InputCard from './components/InputCard.vue';
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
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at 10% 20%, #2e1065 0%, transparent 40%),
              radial-gradient(circle at 90% 80%, #115e59 0%, transparent 40%),
              linear-gradient(to bottom right, #0f172a, #000000);
  position: relative;
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
