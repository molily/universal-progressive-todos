export default (initialState, actionMap) => (state = initialState, action) => {
  const reduceFn = actionMap[action.type];
  if (reduceFn) {
    return reduceFn(state, action);
  }
  return state;
};
