import _ from 'lodash';
import React, { PropTypes } from 'react';
import todoPropType from './todoPropType';
import { todoPath } from '../utils/url';

const onSubmit = (props, event) => {
  event.preventDefault();
  props.deleteTodo(props.todo);
};

const DeleteTodoForm = (props) =>
  <form action={todoPath(props.todo)} method='post'
    onSubmit={_.partial(onSubmit, props)}
    className='inline-form DeleteTodoForm'>
    <input type='hidden' name='_method' value='DELETE'/>
    <input type='hidden' name='id' value={props.todo.id}/>
    <button type='submit' className='DeleteTodoForm__submitButton'>
      ❌ Delete
    </button>
  </form>;

DeleteTodoForm.propTypes = {
  todo: todoPropType,
  deleteTodo: PropTypes.func.isRequired
};

export default DeleteTodoForm;
