import initModel from './utils/init-model';

export default (modelOrigin, extend = {}) => {
  const modelOptions = {};
  const models = {};
  modelOrigin.forEach((model) => {
    const { model: modelName, options } = model;
    const modelExtend = extend[modelName] || {};
    options && (modelOptions[modelName] = options);
    const initializedModel = initModel({ ...model, ...modelExtend });
    models[modelName] = initializedModel[modelName];
  });
  return {
    modelOptions,
    models
  };
};
