import { h } from 'preact';
import PropTypes from 'prop-types';
import todoPropType from './todoPropType';
import UpdateTodoForm from './UpdateTodoForm';

const onSubmit = (newTodo, updateTodo, event) => {
  updateTodo(newTodo);
  event.preventDefault();
};

const CompleteTodoForm = ({ todo, updateTodo }) => {
  const newTodo = {
    ...todo,
    completed: !todo.completed
  };
  return (
    <UpdateTodoForm
      todo={newTodo}
      onSubmit={(event) => onSubmit(newTodo, updateTodo, event)}
    >
      <button type='submit' className='CompleteTodoForm__submitButton'>
        {todo.completed ? '☐ Mark undone' : '✔ Mark done'}
        <span className='accessible-hidden'>
          {todo.completed ? 'Mark undone' : 'Mark done'}
        </span>
      </button>
    </UpdateTodoForm>
  );
};

CompleteTodoForm.propTypes = {
  todo: todoPropType.isRequired,
  updateTodo: PropTypes.func.isRequired
};

export default CompleteTodoForm;
