import { h } from 'preact';
import PropTypes from 'prop-types';
import todosPropType from './todosPropType';
import TodoList from './TodoList';
import CreateTodoForm from './CreateTodoForm';

const AllTodos = ({ todos, updateTodo, deleteTodo, createTodo }) =>
  <main>
    <TodoList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
    <CreateTodoForm createTodo={createTodo} />
  </main>;

AllTodos.propTypes = {
  todos: todosPropType.isRequired,
  createTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired
};

export default AllTodos;
