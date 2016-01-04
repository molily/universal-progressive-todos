import React, { Component, PropTypes } from 'react';
import todoPropType from './todoPropType';
import url from '../utils/url';

export default class CompleteTodoForm extends Component {

  onSubmit(event) {
    event.preventDefault();
    const { todo } = this.props;
    const newTodo = { ...todo, completed: !todo.completed };
    this.props.updateTodo(newTodo);
  }

  render() {
    const { todo } = this.props;
    return <form action={url.todoPath(todo)} method='post'
      onSubmit={this.onSubmit.bind(this)} className='completeTodoForm'>
      <input type='hidden' name='_method' value='PUT'/>
      <input type='hidden' name='id' value={todo.id}/>
      <input type='hidden' name='text' value={todo.text}/>
      <input type='hidden' name='completed' value={!todo.completed}/>
      <button type='submit' className='completeTodoForm__submitButton'>
        {todo.completed ? 'Activate' : 'Complete'}
      </button>
    </form>;
  }

}

CompleteTodoForm.propTypes = {
  todo: todoPropType,
  updateTodo: PropTypes.func.isRequired
};
