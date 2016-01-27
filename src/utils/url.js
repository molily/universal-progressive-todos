// URL configuration and helpers

export const todosPath = '/';
export const todoPathBase = '/todos/';
export const todoPathPattern = `${todoPathBase}:id`;
export const todoPath = (todo) => `${todoPathBase}${todo.id}`;
export const todoInListPath = (todo) => `${todosPath}#todo-${todo.id}`;
export const todoIdFromPath = (path) => path.replace(todoPathBase, '');
