import { resolve } from 'path';
import { defineConfig } from 'vite';
import dtsPlugin from 'vite-plugin-dts';
import vue from '@vitejs/plugin-vue';
const dtsOptions = {
  insertTypesEntry: true,
  cleanVueFileName: true,
};
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/vuejs-tour.ts'),
      name: 'VueJSTour',
      formats: ['es', 'umd'],
      fileName: 'vuejs-tour',
    },
    rollupOptions: {
      external: ['vue', 'nanopop', 'jump.js'],
      output: {
        globals: {
          vue: 'Vue',
          nanopop: 'nanopop',
          'jump.js': 'jump',
        },
      },
    },
    minify: 'esbuild',
    sourcemap: true,
    target: 'es2020',
  },
  plugins: [
    vue({
      script: {
        defineModel: true,
      },
    }),
    dtsPlugin(dtsOptions),
  ],
  server: {
    open: true,
    port: 3000,
  },
  preview: {
    port: 4173,
  },
});
