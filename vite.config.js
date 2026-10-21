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
<<<<<<< HEAD
    manifest: true, 
    rollupOptions: {
      input: './src/main.js',
    },
  },
});
=======
    outDir: 'dist',
    manifest: true,
    rollupOptions: {
      input: resolve(__dirname, 'src/main.js'),
      output: {
        entryFileNames: `javascripts/main.js`,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/main.css';
          }
          return 'assets/[name].[ext]';
        }
      }
    }
  }
});
>>>>>>> dev
