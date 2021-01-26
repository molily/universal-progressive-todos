// Copyright (c) 2015 Milo Mordaunt, MIT-licensed
// Source: https://github.com/bananaoomarang/isomorphic-redux/blob/master/shared/lib/promiseMiddleware.js
// Changed to emit Flux Standard Actions

const isPromise = (obj) => obj && typeof obj.then === 'function';

export default () => (next) => (action) => {
  const { type, payload } = action;

  if (!isPromise(payload)) {
    return next(action);
  }

  const PENDING = `${type}_PENDING`;
  const SUCCESS = type;
  const FAILURE = `${type}_FAILURE`;

  next({ type: PENDING });

  return payload
    .then((result) => {
      next({ type: SUCCESS, payload: result });
      return true;
    })
    .catch((error) => {
      next({ type: FAILURE, error: true, payload: error });
      /* eslint-disable no-console */
      console.error(error);
      /* eslint-enable no-console */
      return false;
    });
};
