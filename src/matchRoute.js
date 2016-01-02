export default (routes, path) => {
  for (let i = 0, l = routes.length; i < l; i++) {
    const route = routes[i];
    const matches = route.path.exec(path);
    if (matches) {
      return { route, matches };
    }
  }
  return null;
};
