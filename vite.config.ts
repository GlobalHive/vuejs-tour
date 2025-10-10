import { resolve } from 'path';
import { defineConfig, type Plugin } from 'vite';
import dtsPlugin, {
  type PluginOptions as DtsPluginOptions,
} from 'vite-plugin-dts';
import vue from '@vitejs/plugin-vue';

const dtsOptions: DtsPluginOptions = {
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
  plugins: [vue(), dtsPlugin(dtsOptions) as Plugin],
  server: {
    open: true,
    port: 3000,
  },
  preview: {
    port: 4173,
  },
});
