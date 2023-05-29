export function createRouteModel({
  model,
  menuName,
  list = null,
  detail = null,
  children = [],
  isMinors = false,
  ...extend
}) {
  // console.log(children, model);
  const traverseId = () => {
    let ids = '';
    for (let idKey in children.ids) {
      ids += `${children.ids[idKey]}`;
    }
    return ids;
  };
  const childrenIds = children?.ids ? traverseId() : ':id?';
  const meta = {
    menuName,
    ...(isMinors ? { isMinors: true } : {})
  };
  const detailView = () =>
    Array.isArray(detail)
      ? detail
      : detail
      ? [
          {
            path: 'detail/:id?',
            name: `${model}.detail`,
            component: detail,
            meta: { ...meta, ...extend?.meta?.detail }
          }
        ]
      : [];
  const moduleRoot = {
    path: `${isMinors ? '' : '/'}${model}`,
    name: `${model}.index`,
    component: () => import('@router/layout/blank.vue'),
    redirect: { name: `${model}.list` }, // 默认显示主列表
    meta: {
      menuName
    }
  };
  const moduleList = {
    path: `list/${childrenIds}`,
    name: `${model}.list`,
    component: list,
    meta: { ...meta, ...extend?.meta?.list }
  };

  return {
    ...moduleRoot,
    children: [
      // 模块默认列表
      moduleList,
      ...detailView(),
      // 子模块
      ...children.map(({ model, list, detail, menuName, children }) =>
        createRouteModel({
          model,
          menuName,
          list,
          detail,
          children,
          isMinors: true
        })
      )
    ]
  };
}
