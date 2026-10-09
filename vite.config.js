import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    manifest: true,
    rollupOptions: {
      input: resolve(import.meta.dirname, 'src/main.js'),
    },
  },
});