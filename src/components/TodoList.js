import { h } from 'preact';
import PropTypes from 'prop-types';
import todosPropType from './todosPropType';
import TodoListItem from './TodoListItem';
import compareTodos from '../utils/compareTodos';

const TodoList = ({ todos, updateTodo, deleteTodo }) => {
  const items = todos.slice().sort(compareTodos).map((todo) =>
    <TodoListItem
      key={todo.id}
      todo={todo}
      updateTodo={updateTodo}
      deleteTodo={deleteTodo}
    />
  );
  return <ul className='todos'>{items}</ul>;
};

TodoList.propTypes = {
  todos: todosPropType.isRequired,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired
};

export default TodoList;
