import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'VueJsTour',
      fileName: 'vuejs-tour',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        'vue',
        '@popperjs/core',
        'jump.js'
      ],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'vue',
          '@popperjs/core': 'popper',
          'jump.js': 'jump'
        },
      },
    },
  },
  plugins: [vue()],
})
