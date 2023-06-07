import Router from 'vue-router';
export default function ({
  routes,
  router = null,
  parentName = '',
  notFound = null,
  to = {}
}) {
  const staticRoutes = [...router.options.routes];
  const root = staticRoutes.find(({ name }) => name === parentName);
  const resetRouter = () => {
    root.children = [];
    router.matcher = new Router({
      mode: router.mode,
      routes: staticRoutes
    }).matcher;
  };

  resetRouter();
  routes.forEach((route) => {
    router.addRoute(parentName, route);
    root.children.push(route);
  });
  if (
    notFound &&
    !router.getRoutes().some(({ name }) => name === 'not-found')
  ) {
    router.addRoute(notFound);
    router.options.routes.push(notFound);
  }
  return {
    replaceTo: () => router.replace(to),
    resetRouter
  };
}
