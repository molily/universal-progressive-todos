/* global XMLHttpRequest */
import partial from '../utils/partial';
import { todosPath, todoPath, todoIdFromPath } from '../utils/url';

const jsonMime = 'application/json';

// Serializes an object to an application/x-www-form-urlencoded string
const serialize = (object) => {
  const pairs = [];
  Object.entries(object).forEach(([property, value]) => {
    const encodedProperty = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(value);
    pairs.push(`${encodedProperty}=${encodedValue}`);
  });
  return pairs.join('&');
};

// Sends a HTTP request that emulates the non-JS form behavior.
// The form data is encoding with application/x-www-form-urlencoded.
// Requests JSON from the server. Sends PUT and DELETE requests as POST
// with an additional _method parameter.
// Note, this is not a generic Ajax function.
// Returns a promise that is resolved with the server response.
const sendForm = (method, path, payload) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
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
        'Content-Type',
        'application/x-www-form-urlencoded; charset=utf-8',
      );
      // Transmit the original method in the body
      const eventualPayload = {
        ...payload,
        _method: method,
      };
      postBody = serialize(eventualPayload);
    }
    xhr.send(postBody);
  });

export const fetchTodos = partial(sendForm, 'GET', todosPath);

export const updateTodo = (todo) => sendForm('PUT', todoPath(todo), todo);

export const deleteTodo = (todo) => sendForm('DELETE', todoPath(todo));

// Creates a new to-do on the server, returns a promise for the to-do
// with the new ID.
export const createTodo = (todo) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  sendForm('POST', todosPath, todo).then((locationHeader) => ({
    ...todo,
    // Extract the new ID
    id: todoIdFromPath(locationHeader),
  }));
