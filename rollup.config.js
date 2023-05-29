import { terser } from 'rollup-plugin-terser';
export default {
  input: {
    'init-router': 'src/init-router.js',
    'add-route': 'src/add-route.js',
    'auto-routes': 'src/auto-routes.js',
    'organize-models': 'src/organize-models.js'
  },
  external: ['vue', 'vue-router'],
  output: {
    dir: 'dist',
    format: 'es',
    name: 'vue-router-tools',
    plugins: [terser()]
  }
};
