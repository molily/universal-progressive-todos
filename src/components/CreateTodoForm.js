import React, { Component, PropTypes } from 'react';
import { todosPath } from '../utils/url';

export default class CreateTodoForm extends Component {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const textField = this.refs.text;
    const text = textField.value;
    if (!text) return;
    this.props.createTodo({
      // ID is created on the server
      text
    });
    textField.value = '';
  }

  render() {
    return <form action={todosPath} method='post'
      onSubmit={this.onSubmit} className='inline-form CreateTodoForm'>
      <label>
        <span className='createTodoForm__label'>Create a new todo:</span>
        <input ref='text' type='text' name='text'
          placeholder='e.g., do the laundry'
          className='createTodoForm__input'/>
      </label>
      <button type='submit' className='CreateTodoForm__submitButton'>
        Create
      </button>
    </form>;
  }

}

CreateTodoForm.propTypes = {
  createTodo: PropTypes.func.isRequired
};
