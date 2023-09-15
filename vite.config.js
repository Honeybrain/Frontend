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
        {
          find: "@locales",
          replacement: path.resolve(__dirname, "./src/locales"),
        },
      ],
    },
  });
};
