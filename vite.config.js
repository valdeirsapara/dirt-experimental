import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react({
      // Configuração específica para resolver o erro de preamble
      include: '**/*.disabled',
      jsxImportSource: 'react',
    })
  ],
  root: resolve('./www'),
  base: '/static/',
  server: { host: '0.0.0.0', port: 5173 },
    resolve: {
        alias: {
        '@': resolve('./www/src'),
        }
    },
  build: {
    outDir: resolve('./www/dist'),
    manifest: true,
    rollupOptions: {
      input: { main: resolve('./www/src/main.jsx') },
      output: {
        chunkFileNames: undefined,
      }
    }
  }
});