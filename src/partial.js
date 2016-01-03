export default (f, ...args1) => {
  return (...args2) => {
    const finalArgs = [ ...args1, ...args2 ];
    return f(...finalArgs);
  };
};
