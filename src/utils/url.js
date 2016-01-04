// URL configuration and helpers

const todosPath = '/';
const todoPathBase = '/todos/';
const todoPathPattern = `${todoPathBase}:id`;
const todoPath = (todo) => `${todoPathBase}${todo.id}`;
const todoIdFromPath = (path) => path.replace(todoPathBase, '');

export default {
  todosPath,
  todoPathBase,
  todoPathPattern,
  todoPath,
  todoIdFromPath
};
