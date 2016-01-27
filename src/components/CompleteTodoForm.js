import React, { Component, PropTypes } from 'react';
import todoPropType from './todoPropType';
import { todoPath } from '../utils/url';

export default class CompleteTodoForm extends Component {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const { todo } = this.props;
    const newTodo = { ...todo, completed: !todo.completed };
    this.props.updateTodo(newTodo);
  }

  render() {
    const { todo } = this.props;
    return <form action={todoPath(todo)} method='post'
      onSubmit={this.onSubmit} className='inline-form CompleteTodoForm'>
      <input type='hidden' name='_method' value='PUT'/>
      <input type='hidden' name='id' value={todo.id}/>
      <input type='hidden' name='text' value={todo.text}/>
      <input type='hidden' name='completed' value={!todo.completed}/>
      <button type='submit' className='CompleteTodoForm__submitButton'>
        {todo.completed ? '☐' : '✔'}
        <span className='accessible-hidden'>
          {todo.completed ? 'Mark undone' : 'Mark done'}
        </span>
      </button>
    </form>;
  }

}

CompleteTodoForm.propTypes = {
  todo: todoPropType,
  updateTodo: PropTypes.func.isRequired
};
