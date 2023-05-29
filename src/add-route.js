import Router from 'vue-router';
export default function ({
  routes,
  router = null,
  rootName = '',
  notFound = {},
  to = {}
}) {
  const staticRoutes = [...router.options.routes];
  const root = staticRoutes.find(({ name }) => name === rootName);
  const resetRouter = () => {
    root.children = [];
    router.matcher = new Router({
      mode: 'history',
      routes: staticRoutes
    }).matcher;
  };

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
    replaceTo: () => router.replace(to),
    resetRouter
  };
}
