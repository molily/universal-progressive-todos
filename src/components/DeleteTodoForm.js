/* eslint-disable react/no-unused-prop-types, jsx-a11y/accessible-emoji */
import _ from 'lodash';
import { h } from 'preact';
import PropTypes from 'prop-types';
import todoPropType from './todoPropType';
import { todoPath } from '../utils/url';

const onSubmit = (props, event) => {
  const { todo } = props;
  /* eslint-disable no-alert */
  if (window.confirm(`Really delete this todo?\n${todo.text}`)) {
    props.deleteTodo(props.todo);
  }
  /* eslint-enable no-alert */
  event.preventDefault();
};

const DeleteTodoForm = (props) =>
  <form
    action={todoPath(props.todo)}
    method='post'
    onSubmit={_.partial(onSubmit, props)}
    className='inline-form DeleteTodoForm'
  >
    <input type='hidden' name='_method' value='DELETE' />
    <input type='hidden' name='id' value={props.todo.id} />
    <button type='submit' className='DeleteTodoForm__submitButton'>
      ❌ Delete
    </button>
  </form>;

DeleteTodoForm.propTypes = {
  todo: todoPropType.isRequired,
  deleteTodo: PropTypes.func.isRequired
};

export default DeleteTodoForm;
