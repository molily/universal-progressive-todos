import { h } from 'preact';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import todoPropType from './todoPropType';
import CompleteTodoForm from './CompleteTodoForm';
import DeleteTodoForm from './DeleteTodoForm';
import StartEditTodoForm from './StartEditTodoForm';
import EditTodoForm from './EditTodoForm';

const startEditTodo = (todo, updateTodo) => {
  const newTodo = { ...todo, editMode: true };
  updateTodo(newTodo);
};

const TodoListItem = (props) => {
  const { todo, updateTodo, deleteTodo } = props;
  const className = classNames(
    'todo',
    todo.completed ? 'todo--completed' : 'todo--active'
  );
  const body = todo.editMode
    ? <EditTodoForm todo={todo} updateTodo={updateTodo} />
    : (
      <span
        className='todo__text'
        onDoubleClick={() => startEditTodo(todo, updateTodo)}
      >
        {todo.text}
      </span>
    );
  const accessibleLabel = todo.completed ? 'Done:' : 'Todo:';
  return (
    <li key={todo.id} id={`todo-${todo.id}`} className={className}>
      <span className='accessible-hidden'>{accessibleLabel}</span>
      <div className='todo__body'>{body}</div>
      <div className='todo__rightControls'>
        <CompleteTodoForm todo={todo} updateTodo={updateTodo} />
        <StartEditTodoForm todo={todo} updateTodo={updateTodo} />
        <DeleteTodoForm todo={todo} deleteTodo={deleteTodo} />
      </div>
    </li>
  );
};

TodoListItem.propTypes = {
  todo: todoPropType.isRequired,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired
};

export default TodoListItem;
