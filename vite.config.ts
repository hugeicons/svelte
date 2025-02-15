import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import preprocess from 'svelte-preprocess';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    svelte({
      preprocess: preprocess(),
      compilerOptions: {
        dev: false
      }
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'HugeiconsIcon',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['svelte'],
      output: {
        globals: {
          svelte: 'Svelte'
        }
      }
    },
    sourcemap: true,
    emptyOutDir: true
  }
}); 