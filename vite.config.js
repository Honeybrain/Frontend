import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
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
    plugins: [
      react(),
    ],
    resolve: {
      alias: [
        {
          find: "@types",
          replacement: path.resolve(__dirname, "./src/types"),
        },
        {
          find: "@pages",
          replacement: path.resolve(__dirname, "./src/pages"),
        },
        {
          find: "@components",
          replacement: path.resolve(__dirname, "./src/components"),
        },
        {
          find: "@hooks",
          replacement: path.resolve(__dirname, "./src/hooks"),
        },
        {
          find: "@contexts",
          replacement: path.resolve(__dirname, "./src/contexts"),
        },
        {
          find: "@providers",
          replacement: path.resolve(__dirname, "./src/providers"),
        },
        {
          find: "@protos",
          replacement: path.resolve(__dirname, "./src/protos"),
        },
      ],
    },
  });
};
