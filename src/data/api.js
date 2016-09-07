import partial from '../utils/partial';
import { todosPath, todoPath, todoIdFromPath } from '../utils/url';

const jsonMime = 'application/json';

const hasOwnProperty = (object, property) =>
    Object.prototype.hasOwnProperty.call(object, property);

// Serializes an object to an application/x-www-form-urlencoded string
const serialize = (object) => {
  const pairs = [];
  for (const property in object) {
    if (hasOwnProperty(object, property)) {
      const value = object[property];
      const encodedProperty = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(value);
      pairs.push(`${encodedProperty}=${encodedValue}`);
    }
  }
  return pairs.join('&');
};

// Sends a HTTP request that emulates the non-JS form behavior.
// Sends PUT and DELETE requests as POST with a _method parameter.
// This is not a generic Ajax function.
const httpRequest = (method, path, payload) => {
  return new Promise((resolve, reject) => {
    const xhr = new window.XMLHttpRequest();
    xhr.onload = () => {
      const { responseText } = xhr;
      let response = responseText;
      if (method === 'POST') {
        // The response to POST is 201 Created, Location header, empty body.
        // Use the Location header as result.
        response = xhr.getResponseHeader('Location');
      } else if (xhr.getResponseHeader('Content-Type') === jsonMime) {
        // Parse JSON response body
        response = JSON.parse(responseText);
      }
      resolve(response);
    };
    xhr.onerror = () => {
      reject(new Error('XMLHttpRequest error'));
    };
    const emulateMethod = method === 'PUT' || method === 'DELETE';
    const httpMethod = emulateMethod ? 'POST' : method;
    xhr.open(httpMethod, path);
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
    xhr.send(postBody);
  });
};

export const fetchTodos = partial(httpRequest, 'GET', todosPath);

export const updateTodo = (todo) =>
  httpRequest('PUT', todoPath(todo), todo);

export const deleteTodo = (todo) =>
  httpRequest('DELETE', todoPath(todo));

// Creates a new to-do on the server, returns a promise for the to-do
// with the new ID.
export const createTodo = (todo) => {
  return httpRequest('POST', todosPath, todo).then(
    (locationHeader) => ({
      ...todo,
      // Extract the new ID
      id: todoIdFromPath(locationHeader)
    })
  );
};
