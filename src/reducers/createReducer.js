export default (initialState, actionMap) => {
  return (state = initialState, action) => {
    const reduceFn = actionMap[action.type];
    if (reduceFn) {
      return reduceFn(state, action);
    }
    return state;
  };
};
