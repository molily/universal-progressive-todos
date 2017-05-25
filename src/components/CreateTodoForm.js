import _ from 'lodash';
import { h } from 'preact';
import PropTypes from 'prop-types';
import { todosPath } from '../utils/url';

const onSubmit = (props, event) => {
  const textField = event.target.elements.text;
  const text = textField.value;
  if (!text) return;
  // The ID is added on the server
  props.createTodo({ text });
  textField.value = '';
  event.preventDefault();
};

const CreateTodoForm = (props) =>
  <form
    action={todosPath}
    method='post'
    onSubmit={_.partial(onSubmit, props)}
    className='inline-form CreateTodoForm'
  >
    <label>
      <span className='CreateTodoForm__label'>Create a new todo:</span>
      <input
        type='text'
        name='text'
        placeholder='e.g., do the laundry'
        className='CreateTodoForm__input'
      />
    </label>
    <button type='submit' className='CreateTodoForm__submitButton'>
      Create
    </button>
  </form>;

CreateTodoForm.propTypes = {
  createTodo: PropTypes.func.isRequired
};

export default CreateTodoForm;
