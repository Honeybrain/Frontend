import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: '0.0.0.0', // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.API_URL ? process.env.API_URL : 'http://localhost:8000/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});