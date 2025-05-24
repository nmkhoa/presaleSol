import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import legacy from "@vitejs/plugin-legacy";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    nodePolyfills(),
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
  ],
  base: "./",
  resolve: {
    alias: {
      buffer: "buffer",
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@public": path.resolve(__dirname, "./public"),
    },
  },
  optimizeDeps: {
    include: ["buffer"],
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
