import { createRouteModel } from './create-route-model.js';
import c2k from './camel-case-2-kebab-case.js';

export default ({
  modules = {},
  pages = import.meta.glob('/src/views/admin/**/**/*.vue'),
  modulesViewRoot = '/src/views/admin'
}) => {
  const routes = [];
  Object.keys(modules).forEach((model) => {
    const { children, name: menuName, view = null, ...extend } = modules[model];
    let modelChildren = [];
    const viewPath = ({
      customView = '',
      customModel = '',
      type = 'list',
      child
    } = {}) =>
      pages[
        `${modulesViewRoot}/${c2k(view || model)}/${
          child
            ? `children/${customView || customModel}/${type}.vue`
            : `${type}.vue`
        }`
      ];
    if (children) {
      for (const child in children) {
        const { model, name, view } = children[child];
        modelChildren.push({
          model,
          menuName: name,
          list: viewPath({
            customView: view,
            customModel: model,
            child: true
          }),
          detail: viewPath({
            customView: view,
            customModel: model,
            type: 'detail',
            child: true
          })
        });
      }
    }
    routes.push(
      createRouteModel({
        model,
        menuName,
        list: viewPath(),
        detail: viewPath({ type: 'detail' }),
        ...(modelChildren.length ? { children: modelChildren } : {}),
        ...extend
      })
    );
  });
  return routes;
};
