import { resolve } from 'path';
import { defineConfig, type Plugin } from 'vite';
import dtsPlugin from 'vite-plugin-dts';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
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
    vue(),
    dtsPlugin({
      include: ['src/**/*.ts', 'src/**/*.vue'],
      exclude: ['src/**/*.spec.ts', 'test/**', 'node_modules/**'],
      entryRoot: 'src',
    }) as Plugin,
  ],
  server: {
    open: true,
    port: 3000,
  },
  preview: {
    port: 4173,
  },
});
