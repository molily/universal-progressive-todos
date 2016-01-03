// Based on work by Milo Mordaunt
// Changed to emit Flux Standard Actions
// Copyright (c) 2015 Milo Mordaunt, MIT-licensed
// https://github.com/bananaoomarang/isomorphic-redux/blob/master/shared/lib/promiseMiddleware.js

const isPromise = (obj) => obj && typeof obj.then === 'function';

export default () => {
  return (next) => (action) => {
    const { type, payload } = action;

    if (!isPromise(payload)) {
      return next(action);
    }

    const PENDING = type + '_PENDING';
    const SUCCESS = type;
    const FAILURE = type + '_FAILURE';

    next({ type: PENDING });

    return payload
      .then((result) => {
        next({ type: SUCCESS, payload: result });
        return true;
      })
      .catch((error) => {
        next({ type: FAILURE, error: true, payload: error });
        console.log(error);
        return false;
      });
  };
};
