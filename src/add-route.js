import Router from 'vue-router';
export default ({
  routes,
  router = this,
  rootName = '',
  notFound = {},
  to = {}
}) => {
  const staticRoutes = [...this.options.routes];
  const resetRouter = () =>
    (this.matcher = new Router({
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
    this.options.routes.push(notFound);
  }
  return {
    to: router.replace(to),
    resetRouter
  };
};
