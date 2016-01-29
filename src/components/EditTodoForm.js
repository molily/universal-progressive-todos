import _ from 'lodash';
import React, { PropTypes } from 'react';
import todoPropType from './todoPropType';
import UpdateTodoForm from './UpdateTodoForm';

const onSubmit = (props, event) => {
  event.preventDefault();
  const text = event.target.elements.text.value;
  props.updateTodo({
    ...props.todo,
    text,
    editMode: false
  });
};

const EditTodoForm = (props) => {
  const newTodo = {
    ...props.todo,
    editMode: false
  };
  const fields = [ 'text' ];
  return <UpdateTodoForm todo={newTodo} fields={fields}
    onSubmit={_.partial(onSubmit, props)}>
    <label>
      <span className='accessible-hidden'>Edit todo:</span>
      {/*
      autofocus will not be in the server-rendered markup:
      https://github.com/facebook/react/issues/3066
      */}
      <input type='text' name='text' defaultValue={newTodo.text}
        placeholder='e.g., do the laundry' autoFocus
        className='EditTodoForm__input'/>
    </label>
    <button type='submit' className='EditTodoForm__submitButton'>
      💾 Save
    </button>
  </UpdateTodoForm>;
};

EditTodoForm.propTypes = {
  todo: todoPropType,
  updateTodo: PropTypes.func.isRequired
};

export default EditTodoForm;
