import React from 'react';
import todosPropType from './todosPropType';
import TodoList from './TodoList';

const completedFilter = (todo) => todo.completed;

const CompletedTodos = ({ todos }) =>
  <TodoList items={todos.filter(completedFilter)} />;

CompletedTodos.propTypes = {
  todos: todosPropType
};

export default CompletedTodos;
