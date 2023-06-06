import Vue, { nextTick } from 'vue';
import Router from 'vue-router';
function useNext(next, location, resolve, reject) {
  if (resolve || reject) return next.call(this, location, resolve, reject);
  return next.call(this, location).catch((e) => {});
}
const { push, replace } = Router.prototype;
Router.prototype.push = function (...arg) {
  useNext.call(this, push, ...arg);
};
Router.prototype.replace = function (...arg) {
  useNext.call(this, replace, ...arg);
};
export default ({
  beforeEach = null,
  afterEach = null,
  beforeResolve = null,
  mode = 'history',
  usePinia = false,
  ...opts
}) => {
  Vue.use(Router);
  const router = new Router({ mode, ...opts });
  const useHooks = (hooks, arg) => {
    const next = arg[2]; //next
    hooks
      ? usePinia
        ? nextTick(() => hooks.call(router, ...arg))
        : hooks.call(router, ...arg)
      : next && next();
  };
  router.beforeEach((...arg) => useHooks(beforeEach, arg));
  router.beforeResolve((...arg) => useHooks(beforeResolve, arg));
  router.afterEach((...arg) => useHooks(afterEach, arg));
  return router;
};
