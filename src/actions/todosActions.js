import actionTypes from './actionTypes';
import { isServer } from '../utils/universal';
import * as api from '../data/api';
import rethrow from '../utils/rethrow';

export const getTodos = (params, db) => {
  const payload = isServer ?
    db.getAll() :
    api.fetchTodos();
  return {
    type: actionTypes.GET_TODOS,
    payload
  };
};

export const createTodo = (todo, db) => {
  const payload = isServer ?
    db.put(todo.id, todo) :
    // TODO: Improve
    api.createTodo(todo).then(() => todo, rethrow);
  return {
    type: actionTypes.CREATE_TODO,
    payload
  };
};

export const updateTodo = (todo, db) => {
  const payload = isServer ?
    db.put(todo.id, todo) :
    api.updateTodo(todo).then(() => todo, rethrow);
  return {
    type: actionTypes.UPDATE_TODO,
    payload
  };
};

export const deleteTodo = (todo, db) => {
  const payload = isServer ?
    db.delete(todo.id) :
    api.deleteTodo(todo).then(() => todo, rethrow);
  return {
    type: actionTypes.DELETE_TODO,
    payload
  };
};
