import _ from 'lodash';
import React, { PropTypes } from 'react';
import todoPropType from './todoPropType';
import UpdateTodoForm from './UpdateTodoForm';

const onSubmit = (props, event) => {
  event.preventDefault();
  const { todo } = props;
  const newTodo = { ...todo, completed: !todo.completed };
  props.updateTodo(newTodo);
};

const CompleteTodoForm = (props) => {
  const { todo } = props;
  const newTodo = {
    ...todo,
    completed: !todo.completed
  };
  return <UpdateTodoForm todo={newTodo} onSubmit={_.partial(onSubmit, props)}>
    <button type='submit' className='CompleteTodoForm__submitButton'>
      {todo.completed ? '☐' : '✔'}
      <span className='accessible-hidden'>
        {todo.completed ? 'Mark undone' : 'Mark done'}
      </span>
    </button>
  </UpdateTodoForm>;
};

CompleteTodoForm.propTypes = {
  todo: todoPropType,
  updateTodo: PropTypes.func.isRequired
};

export default CompleteTodoForm;
