import React, { Component, PropTypes } from 'react';
import todoPropType from './todoPropType';
import { todoPath } from '../utils/url';

export default class DeleteTodoForm extends Component {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const { todo } = this.props;
    const newTodo = { ...todo, editMode: true };
    this.props.updateTodo(newTodo);
  }

  render() {
    const { todo } = this.props;
    return <form action={todoPath(todo)} method='post'
      onSubmit={this.onSubmit} className='inline-form StartEditTodoForm'>
      <input type='hidden' name='_method' value='PUT'/>
      <input type='hidden' name='id' value={todo.id}/>
      <input type='hidden' name='text' value={todo.text}/>
      <input type='hidden' name='completed' value={todo.completed}/>
      <input type='hidden' name='editMode' value='true'/>
      <button type='submit' className='StartEditTodoForm__submitButton'>
        ✎ Edit
      </button>
    </form>;
  }

}

DeleteTodoForm.propTypes = {
  todo: todoPropType,
  updateTodo: PropTypes.func.isRequired
};
