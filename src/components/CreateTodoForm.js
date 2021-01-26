import React from 'react';
import PropTypes from 'prop-types';
import { todosPath } from '../utils/url';

const onSubmit = (createTodo, event) => {
  const textField = event.target.elements.text;
  const text = textField.value;
  if (!text) return;
  // The ID is added on the server
  createTodo({ text });
  textField.value = '';
  event.preventDefault();
};

const CreateTodoForm = ({ createTodo }) => (
  <form
    action={todosPath}
    method='post'
    onSubmit={(event) => onSubmit(createTodo, event)}
    className='inline-form CreateTodoForm'
  >
    <label htmlFor='CreateTodoForm__input'>
      <span className='CreateTodoForm__label'>Create a new todo:</span>
      <input
        type='text'
        name='text'
        placeholder='e.g., do the laundry'
        className='CreateTodoForm__input'
        id='CreateTodoForm__input'
      />
    </label>
    <button type='submit' className='CreateTodoForm__submitButton'>
      Create
    </button>
  </form>
);

CreateTodoForm.propTypes = {
  createTodo: PropTypes.func.isRequired,
};

export default CreateTodoForm;
