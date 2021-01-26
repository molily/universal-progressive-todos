import actionTypes from '../actions/actionTypes';
import createReducer from './createReducer';

const initialState = [];

const actionMap = {
  [actionTypes.GET_TODOS](state, action) {
    return action.payload;
  },

  [actionTypes.CREATE_TODO](state, action) {
    return state.concat(action.payload);
  },

  [actionTypes.UPDATE_TODO](state, action) {
    const todo = action.payload;
    // Create a new array with the replaced todo
    return state.reduce((result, otherTodo) => {
      result.push(otherTodo.id === todo.id ? todo : otherTodo);
      return result;
    }, []);
  },

  [actionTypes.DELETE_TODO](state, action) {
    const { id } = action.payload;
    return state.filter((otherTodo) => otherTodo.id !== id);
  },
};

export default createReducer(initialState, actionMap);
