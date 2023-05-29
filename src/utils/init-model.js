import toCamelCase from './kebab-case-2-camel-case';

export default function initModel({
  model,
  name = '',
  includes = [],
  actions = {},
  children = null,
  customModel = {},
  excludes = [],
  view = null,
  options = {},
  ...extend
}) {
  const {
    list = '',
    detail = '',
    add = '',
    edit = '',
    delete: del = ''
  } = customModel;

  const apisTemplate = {
    list: `${list || 'index'}`,
    detail: `${detail || 'info'}`,
    create: `${add || 'add'}`,
    update: `${edit || 'edit'}`,
    delete: `${del || 'delete'}`
  };

  let apis = {};
  if (includes.length) {
    includes.forEach(
      (type) => apisTemplate[type] && (apis[type] = apisTemplate[type])
    );
  } else if (excludes.length) {
    excludes.forEach((type) => apisTemplate[type] && delete apisTemplate[type]);
    apis = apisTemplate;
  } else {
    apis = apisTemplate;
  }
  let childrenModels = {};
  children?.forEach(
    ({
      model = '',
      actions = {},
      children = null,
      includes = [],
      excludes = [],
      name = '',
      view = null,
      ...extend
    }) =>
      (childrenModels[toCamelCase(model)] = initModel({
        model,
        actions,
        children,
        includes,
        excludes,
        name,
        ...(view ? { view } : {}),
        ...extend
      })[model])
  );
  return {
    [model]: {
      name,
      actions,
      apis,
      ...(children ? { children: childrenModels } : {}),
      ...(view ? { view } : {}),
      ...extend
    }
  };
}
