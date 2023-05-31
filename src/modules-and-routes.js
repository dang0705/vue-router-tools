import initModel from './utils/init-model.js';
import modules2Routes from './utils/modules-2-routes.js';

export default ({
  models,
  modelsExtend = {},
  pages = import.meta.glob('/src/views/admin/**/**/*.vue'),
  modulesViewRoot = '/src/views/admin',
  debug
}) => {
  const modules = {};
  const moduleOptions = {};
  models.forEach((model) => {
    const { model: modelName, options } = model;
    const modelExtend = modelsExtend[modelName] || {};
    options && (moduleOptions[modelName] = options);
    const initializedModel = initModel({ ...model, ...modelExtend });
    modules[modelName] = initializedModel[modelName];
  });

  return {
    routes: modules2Routes({
      modules,
      pages,
      modulesViewRoot
    }),
    modules,
    moduleOptions
  };
};
