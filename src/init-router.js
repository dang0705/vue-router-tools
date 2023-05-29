import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

export default ({
  beforeEach = null,
  afterEach = null,
  mode = 'history',
  ...opts
}) => {
  const router = new Router({ mode, ...opts });
  const callHooks = (hooks, arg) => hooks && hooks.call(router, ...arg);
  router.beforeEach((...arg) => callHooks(beforeEach, arg));
  router.afterEach((...arg) => callHooks(afterEach, arg));
  return router;
};
