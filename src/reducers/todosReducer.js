import {
  CREATE_TODO,
  DELETE_TODO,
  GET_TODOS,
  UPDATE_TODO,
} from '../actions/actionTypes';
import createReducer from './createReducer';

const initialState = [];

const actionMap = {
  [GET_TODOS](_todos, action) {
    return action.payload;
  },

  [CREATE_TODO](todos, action) {
    return todos.concat(action.payload);
  },

  [UPDATE_TODO](todos, action) {
    const todo = action.payload;
    // Create a new array with the replaced todo
    return todos.map(
      // Use existing or new todo
      (otherTodo) => (otherTodo.id === todo.id ? todo : otherTodo),
    );
  },

  [DELETE_TODO](todos, action) {
    const { id } = action.payload;
    return todos.filter((otherTodo) => otherTodo.id !== id);
  },
};

export default createReducer(initialState, actionMap);
