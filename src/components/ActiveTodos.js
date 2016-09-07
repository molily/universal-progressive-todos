import React from 'react';
import todosPropType from './todosPropType';
import TodoList from './TodoList';

const completedFilter = (todo) => !todo.completed;

const ActiveTodos = ({ todos }) =>
  <TodoList items={todos.filter(completedFilter)} />;

ActiveTodos.propTypes = {
  todos: todosPropType
};

export default ActiveTodos;
