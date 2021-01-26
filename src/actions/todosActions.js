import {
  CREATE_TODO,
  DELETE_TODO,
  GET_TODOS,
  UPDATE_TODO,
} from './actionTypes';
import { isServer } from '../utils/universal';
import * as api from '../data/api';

export const getTodos = (_params, db) => {
  const promise = isServer ? db.getAll() : api.fetchTodos();
  return {
    type: GET_TODOS,
    payload: promise,
  };
};

export const createTodo = (rawTodo, db) => {
  const todo = {
    ...rawTodo,
    text: rawTodo.text || '',
    completed: Boolean(rawTodo.completed),
  };
  const promise = isServer ? db.put(todo.id, todo) : api.createTodo(todo);
  return {
    type: CREATE_TODO,
    payload: promise,
  };
};

export const updateTodo = (todo, db) => {
  const promise = isServer
    ? db.put(todo.id, todo)
    : api.updateTodo(todo).then(() => todo);
  return {
    type: UPDATE_TODO,
    payload: promise,
  };
};

export const deleteTodo = (todo, db) => {
  const payload = isServer
    ? db.delete(todo.id)
    : api.deleteTodo(todo).then(() => todo);
  return {
    type: DELETE_TODO,
    payload,
  };
};
