import { createRouteModel } from './utils/create-route-model.js';
import c2k from './utils/camel-case-2-kebab-case.js';

export default ({
  models = {},
  pages = import.meta.glob('/src/views/admin/**/**/*.vue'),
  modelViewRoot = '/src/views/admin'
}) => {
  const routes = [];
  Object.keys(models).forEach((model) => {
    const { children, name: menuName, view = null, ...extend } = models[model];
    let modelChildren = [];
    const viewPath = ({
      customView = '',
      customModel = '',
      type = 'list',
      child
    } = {}) =>
      pages[
        `${modelViewRoot}/${c2k(view || model)}/${
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
