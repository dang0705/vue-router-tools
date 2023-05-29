import initModel from './utils/init-model';

export default (models, extend = {}) => {
  const modules = {};
  const moduleOptions = {};
  models.forEach((model) => {
    const { model: modelName, options } = model;
    const modelExtend = extend[modelName] || {};
    options && (moduleOptions[modelName] = options);
    const initializedModel = initModel({ ...model, ...modelExtend });
    modules[modelName] = initializedModel[modelName];
  });
  return {
    modules,
    moduleOptions
  };
};
