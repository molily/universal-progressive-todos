/* eslint-disable react/no-unused-prop-types */
import _ from 'lodash';
import { h } from 'preact';
import PropTypes from 'prop-types';
import todoPropType from './todoPropType';
import UpdateTodoForm from './UpdateTodoForm';

const onSubmit = (props, event) => {
  const { todo } = props;
  const newTodo = { ...todo, completed: !todo.completed };
  props.updateTodo(newTodo);
  event.preventDefault();
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
  todo: todoPropType.isRequired,
  updateTodo: PropTypes.func.isRequired
};

export default CompleteTodoForm;
