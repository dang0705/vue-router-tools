import Vue from 'vue';
import Router from 'vue-router';

export default ({
  beforeEach = null,
  afterEach = null,
  beforeResolve = null,
  mode = 'history',
  ...opts
}) => {
  Vue.use(Router);
  const router = new Router({ mode, ...opts });
  const callHooks = (hooks, arg) => {
    const next = arg[2]; //next
    hooks ? hooks.call(router, ...arg) : next && next();
  };
  router.beforeEach((...arg) => callHooks(beforeEach, arg));
  router.beforeResolve((...arg) => callHooks(beforeResolve, arg));
  router.afterEach((...arg) => callHooks(afterEach, arg));
  return router;
};
