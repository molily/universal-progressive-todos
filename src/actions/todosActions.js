import partial from '../partial';
import actionTypes from '../constants/actionTypes';
import { isServer } from '../universal';

const jsonMime = 'application/json';

// Serializes an object to an application/x-www-form-urlencoded string
const serialize = (object) => {
  const pairs = [];
  for (const property in object) {
    if (!object.hasOwnProperty(property)) continue;
    const value = object[property];
    pairs.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
  }
  return pairs.join('&');
};

// Sends a HTTP request that emulates the non-JS form behavior.
// Sends PUT and DELETE requests as POST with a _method parameter.
// This is not a generic Ajax function.
const httpRequest = (method, url, payload) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      console.log('xhr onload', xhr);
      const { responseText } = xhr;
      const response = xhr.getResponseHeader('Content-Type') === jsonMime ?
        JSON.parse(responseText) :
        responseText;
      resolve(response);
    };
    xhr.onerror = () => {
      reject(new Error('XMLHttpRequest error'));
    };
    const emulateMethod = method === 'PUT' || method === 'DELETE';
    const httpMethod = emulateMethod ? 'POST' : method;
    xhr.open(httpMethod, url);
    // We No Speak HTML
    xhr.setRequestHeader('Accept', jsonMime);
    // Create POST body
    let postBody;
    if (payload || emulateMethod) {
      xhr.setRequestHeader(
        'Content-Type', 'application/x-www-form-urlencoded; charset=utf-8'
      );
      // Transmit the original method in the body
      const eventualPayload = {
        ...payload,
        _method: method
      };
      postBody = serialize(eventualPayload);
    }
    console.log('postBody', postBody);
    console.log('xhr', xhr);
    xhr.send(postBody);
  });
};

const todosPath = '/';
const todoPath = (todo) => `/todos/${todo.id}`;

const fetchTodos = partial(httpRequest, 'GET', todosPath);

const httpPutTodo = (todo) => {
  return httpRequest('PUT', todoPath(todo), todo);
};
const httpDeleteTodo = (todo) => {
  return httpRequest('DELETE', todoPath(todo));
};

export const getTodos = () => {
  let promise;
  if (isServer) {
    promise = new Promise((resolve, reject) => {
      global.db.getAll((err, todos) => {
        if (err) {
          reject(err);
        } else {
          resolve(todos);
        }
      });
    });
  } else {
    promise = fetchTodos();
  }
  return {
    type: actionTypes.GET_TODOS,
    payload: promise
  };
};

export const completeTodo = (todo) => {
  const completedTodo = { ...todo, completed: true };
  if (isServer) {
    global.db.put(todo.id, completedTodo);
  } else {
    httpPutTodo(completedTodo);
  }
  return {
    type: actionTypes.COMPLETE_TODO,
    payload: todo
  };
};

export const deleteTodo = (todo) => {
  if (isServer) {
    global.db.delete(todo.id);
  } else {
    httpDeleteTodo(todo);
  }
  return {
    type: actionTypes.DELETE_TODO,
    payload: todo
  };
};
