import path from 'node:path';
import { defineConfig } from 'vite';
import { glob } from 'glob';
import { fileURLToPath } from 'node:url';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';
import vuePlugin from '@vitejs/plugin-vue2';
export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      entry: Object.fromEntries(
        glob
          .sync('src/*.js', { ignore: 'utils/**' })
          .map((file) => [
            path.relative(
              'src',
              file.slice(0, file.length - path.extname(file).length)
            ),
            fileURLToPath(new URL(file, import.meta.url))
          ])
      ),
      formats: ['es']
    },
    rollupOptions: {
      external: ['vue', 'vue-router', '../vue/blank.vue'],
      output: {
        dir: 'dist',
        name: 'vue-router-tools',
        plugins: [
          terser(),
          copy({
            hook: 'writeBundle',
            targets: [{ src: './src/vue/**', dest: './dist/vue' }]
          })
        ]
      }
    }
  },
  plugins: [vuePlugin()]
});
