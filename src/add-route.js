import Router from 'vue-router';
export default function ({
  routes,
  router = null,
  rootName = '',
  notFound = {},
  to = {}
}) {
  const staticRoutes = [...router.options.routes];
  const resetRouter = () =>
    (router.matcher = new Router({
      mode: 'history',
      routes: staticRoutes
    }).matcher);

  const root = staticRoutes.find(({ name }) => name === rootName);

  resetRouter();
  routes.forEach((route) => {
    router.addRoute(rootName, route);
    root.children.push(route);
  });
  if (!router.getRoutes().some(({ name }) => name === 'not-found')) {
    router.addRoute(notFound);
    router.options.routes.push(notFound);
  }
  return {
    replaceTo: router.replace(to),
    rootRoute: root,
    resetRouter
  };
}
