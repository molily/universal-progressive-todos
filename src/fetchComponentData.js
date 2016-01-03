// Copyright (c) 2015 Milo Mordaunt, MIT-licensed
// https://github.com/bananaoomarang/isomorphic-redux/blob/master/shared/lib/fetchComponentData.js

export default (dispatch, components, params) => {
  const needs = components.reduce((prev, current) => {
    return current ? (current.needs || []).concat(prev) : prev;
  }, []);
  const promises = needs.map((need) => dispatch(need(params)));
  return Promise.all(promises);
};
