import React, { Component, PropTypes } from 'react';
import url from '../utils/url';

export default class CreateTodoForm extends Component {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.createTodo({
      // ID is created on the server
      text: this.refs.text.value,
      completed: false
    });
    this.refs.form.reset();
  }

  render() {
    return <form ref='form' action={url.todosPath} method='post'
      onSubmit={this.onSubmit} className='createTodoForm'>
      <label>
        <span className='createTodoForm__label'>Create a new todo:</span>
        <input ref='text' type='text' name='text'
          placeholder='e.g., do the laundry'
          className='createTodoForm__input'/>
      </label>
      <button type='submit' className='createTodoForm__submitButton'>
        Create
      </button>
    </form>;
  }

}

CreateTodoForm.propTypes = {
  createTodo: PropTypes.func.isRequired
};
