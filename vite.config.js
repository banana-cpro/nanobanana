import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'static',
    emptyOutDir: false,
    rollupOptions: {
      input: './index.html'
    }
  },
  server: {
    port: 5174,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true
      },
      '/generate': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    }
  }
});
