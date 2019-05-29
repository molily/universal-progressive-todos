// Copyright (c) 2015 Milo Mordaunt, MIT-licensed
// Source: https://github.com/bananaoomarang/isomorphic-redux/blob/master/shared/lib/fetchComponentData.js
// Changed to pass the database instance

export default (dispatch, components, params, db) => {
  const needs = components.reduce(
    (prev, current) => (current ? (current.needs || []).concat(prev) : prev),
    []
  );
  const promises = needs.map((need) => dispatch(need(params, db)));
  return Promise.all(promises);
};
