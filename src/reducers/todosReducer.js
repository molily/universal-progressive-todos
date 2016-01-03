import actionTypes from '../constants/actionTypes';
import createReducer from './createReducer';

const initialState = [];

const actionMap = {

  [actionTypes.GET_TODOS](state, action) {
    return action.payload;
  },

  [actionTypes.COMPLETE_TODO](state, action) {
    const todo = action.payload;
    const { id } = todo;
    const completedTodo = { ...todo, completed: true };
    return state.reduce((result, otherTodo) => {
      const newTodo = otherTodo.id === id ?
        completedTodo :
        otherTodo;
      result.push(newTodo);
      return result;
    }, []);
  },

  [actionTypes.DELETE_TODO](state, action) {
    const { id } = action.payload;
    return state.filter((otherTodo) => otherTodo.id !== id);
  }

};

export default createReducer(initialState, actionMap);
