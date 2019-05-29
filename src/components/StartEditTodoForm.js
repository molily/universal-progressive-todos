import React from 'react';
import PropTypes from 'prop-types';
import todoPropType from './todoPropType';
import UpdateTodoForm from './UpdateTodoForm';

const onSubmit = (newTodo, updateTodo, event) => {
  updateTodo(newTodo);
  event.preventDefault();
};

const StartEditTodoForm = ({ todo, updateTodo }) => {
  const newTodo = {
    ...todo,
    editMode: true
  };
  return (
    <UpdateTodoForm
      todo={newTodo}
      onSubmit={(event) => onSubmit(newTodo, updateTodo, event)}
    >
      <button type='submit'>
        ✎ Edit
      </button>
    </UpdateTodoForm>
  );
};

StartEditTodoForm.propTypes = {
  todo: todoPropType.isRequired,
  updateTodo: PropTypes.func.isRequired
};

export default StartEditTodoForm;
