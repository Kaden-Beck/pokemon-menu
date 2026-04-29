import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src/',

  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(fileURLToPath(import.meta.url), 'src/index.html'),
        pokemon: resolve(fileURLToPath(import.meta.url), 'src/pokemon/index.html'),
      },
    },
  },
});
