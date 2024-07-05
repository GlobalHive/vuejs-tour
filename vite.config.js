import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import vue from '@vitejs/plugin-vue';
export default defineConfig({
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
                    'vue': 'vue',
                    'nanopop': 'nanopop',
                    'jump.js': 'jump.js'
                },
            },
        },
    },
    plugins: [dts(), vue()]
});
