import React from 'react';
import PropTypes from 'prop-types';
import todosPropType from './todosPropType';
import TodoList from './TodoList';
import CreateTodoForm from './CreateTodoForm';

// eslint-disable-next-line object-curly-newline
const CompletedTodos = ({ todos, createTodo, updateTodo, deleteTodo }) => (
  <main>
    <TodoList
      todos={todos.filter((todo) => todo.completed)}
      updateTodo={updateTodo}
      deleteTodo={deleteTodo}
    />
    <CreateTodoForm createTodo={createTodo} />
  </main>
);

CompletedTodos.propTypes = {
  todos: todosPropType.isRequired,
  createTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default CompletedTodos;
