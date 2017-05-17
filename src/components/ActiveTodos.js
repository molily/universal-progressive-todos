import { h } from 'preact';
import PropTypes from 'prop-types';
import todosPropType from './todosPropType';
import TodoList from './TodoList';
import CreateTodoForm from './CreateTodoForm';

const ActiveTodos = ({ todos, updateTodo, deleteTodo, createTodo }) =>
  <main>
    <TodoList todos={todos.filter((todo) => !todo.completed)}
      updateTodo={updateTodo} deleteTodo={deleteTodo} />
    <CreateTodoForm createTodo={createTodo} />
  </main>;

ActiveTodos.propTypes = {
  todos: todosPropType.isRequired,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  createTodo: PropTypes.func.isRequired
};

export default ActiveTodos;
