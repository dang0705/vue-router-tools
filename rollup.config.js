import path from 'node:path';
import vue from 'rollup-plugin-vue';
import { fileURLToPath } from 'node:url';
import { glob } from 'glob';
import { terser } from 'rollup-plugin-terser';

export default {
  input: Object.fromEntries(
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
  external: ['vue', 'vue-router'],
  output: {
    dir: 'dist',
    format: 'es',
    name: 'vue-router-tools',
    plugins: [terser()]
  },
  plugins: [vue()]
};
