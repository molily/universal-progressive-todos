/** @jsx h */
import { h } from 'preact';
import PropTypes from 'prop-types';
import todoPropType from './todoPropType';
import { todoPath } from '../utils/url';

const onSubmit = (todo, deleteTodo, event) => {
  /* eslint-disable-next-line no-alert */
  if (window.confirm(`Really delete this todo?\n${todo.text}`)) {
    deleteTodo(todo);
  }
  event.preventDefault();
};

const DeleteTodoForm = ({ todo, deleteTodo }) => (
  <form
    action={todoPath(todo)}
    method='post'
    onSubmit={(event) => onSubmit(todo, deleteTodo, event)}
    className='inline-form DeleteTodoForm'
  >
    <input type='hidden' name='_method' value='DELETE' />
    <input type='hidden' name='id' value={todo.id} />
    <button type='submit' className='DeleteTodoForm__submitButton'>
      <span role='img' aria-label=''>
        {'❌ '}
      </span>
      Delete
    </button>
  </form>
);

DeleteTodoForm.propTypes = {
  todo: todoPropType.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default DeleteTodoForm;
