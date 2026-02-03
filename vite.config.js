import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist',
    emptyOutDir: true
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
      },
      // 如果遇到 CORS 问题，可以取消注释下面的配置使用代理
      // '/v1': {
      //   target: 'https://grsaiapi.com',
      //   changeOrigin: true,
      //   secure: true,
      //   rewrite: (path) => path
      // }
    }
  }
});
