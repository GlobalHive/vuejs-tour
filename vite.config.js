import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'VueJSTour',
      fileName: (format) => `VueJSTour.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        'vue',
        '@popperjs/core',
      ],
    },
    output: {
      // Provide global variables to use in the UMD build
      // for externalized deps
      globals: {
        vue: 'vue',
        '@popperjs/core': 'Popper',
      },
    },
  },
  plugins: [vue()]
})
