import React, { Component, PropTypes } from 'react';
import todoPropType from './todoPropType';
import url from '../utils/url';

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
    return <form action={url.todoPath(todo)} method='post'
      onSubmit={this.onSubmit} className='startEditTodoForm'>
      <input type='hidden' name='_method' value='PUT'/>
      <input type='hidden' name='id' value={todo.id}/>
      <button type='submit' className='startEditTodoForm__submitButton'>
        Edit
      </button>
    </form>;
  }

}

DeleteTodoForm.propTypes = {
  todo: todoPropType,
  updateTodo: PropTypes.func.isRequired
};
