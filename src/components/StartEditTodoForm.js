/* eslint-disable react/no-unused-prop-types */
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import todoPropType from './todoPropType';
import UpdateTodoForm from './UpdateTodoForm';

const onSubmit = (props, event) => {
  const newTodo = { ...props.todo, editMode: true };
  props.updateTodo(newTodo);
  event.preventDefault();
};

const StartEditTodoForm = (props) => {
  const newTodo = {
    ...props.todo,
    editMode: true
  };
  return <div className='StartEditTodoForm'>
    <UpdateTodoForm todo={newTodo} onSubmit={_.partial(onSubmit, props)}>
      <button type='submit' className='StartEditTodoForm__submitButton'>
        ✎ Edit
      </button>
    </UpdateTodoForm>
  </div>;
};

StartEditTodoForm.propTypes = {
  todo: todoPropType.isRequired,
  updateTodo: PropTypes.func.isRequired
};

export default StartEditTodoForm;
