import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    cors: true,
    strictPort: true,
    port: 5173,
    host: '0.0.0.0',
    hmr: {
      clientPort: 5173
    }
  },
  build: {
    manifest: true, 
    rollupOptions: {
      input: './src/main.js',
    },
  },
});