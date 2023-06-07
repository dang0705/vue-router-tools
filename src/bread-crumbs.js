export default function ({ matched, first, metaNameKey = 'name' }) {
  const crumbs = [];
  matched.forEach(
    (
      {
        name: to,
        meta: { [metaNameKey]: text },
        redirect: { [metaNameKey]: redirectName } = {},
        parent: {
          [metaNameKey]: parentRoute,
          meta: { [metaNameKey]: parentName } = {}
        } = {}
      },
      index
    ) => {
      const selfCrumbs = {
        text,
        ...(index < matched.length - 1 ? { to: redirectName || to } : {})
      };
      text &&
        !crumbs.find(({ text: existText }) => existText === text) &&
        crumbs.push(
          parentName
            ? ({ text: parentName, to: parentRoute }, selfCrumbs)
            : selfCrumbs
        );
    }
  );
  first && crumbs.unshift(first);
  return crumbs;
}
