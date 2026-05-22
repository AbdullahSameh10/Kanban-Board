import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  resolve:{
    alias: {
      "@": "/src",
      "@assets": "/src/assets",
      "@Components": "/src/Components",
      "@Elements": "/src/Components/Elements",
      "@Layout": "/src/Components/Layout",
    },
  },
  plugins: [
    react(),
    svgr(),
  ],
})
