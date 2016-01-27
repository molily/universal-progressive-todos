import React, { Component, PropTypes } from 'react';
import todoPropType from './todoPropType';
import { todoPath } from '../utils/url';

export default class EditTodoForm extends Component {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.updateTodo({
      ...this.props.todo,
      text: this.refs.text.value,
      editMode: false
    });
  }

  render() {
    const { todo } = this.props;
    return <form action={todoPath(todo)} method='post'
      onSubmit={this.onSubmit} className='inline-form EditTodoForm'>
      <input type='hidden' name='_method' value='PUT'/>
      <input type='hidden' name='id' value={todo.id}/>
      <input type='hidden' name='completed' value={todo.completed}/>
      <input type='hidden' name='editMode' value='false'/>
      <label>
        <span className='accessible-hidden'>Edit todo:</span>
        {/*
        autofocus will not be in the server-renderd markup:
        https://github.com/facebook/react/issues/3066
        */}
        <input ref='text' type='text' name='text' defaultValue={todo.text}
          placeholder='e.g., do the laundry' autoFocus
          className='EditTodoForm__input'/>
      </label>
      <button type='submit' className='EditTodoForm__submitButton'>
        💾 Save
      </button>
    </form>;
  }

}

EditTodoForm.propTypes = {
  todo: todoPropType,
  updateTodo: PropTypes.func.isRequired
};
