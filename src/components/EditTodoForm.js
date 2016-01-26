import React, { Component, PropTypes } from 'react';
import todoPropType from './todoPropType';
import url from '../utils/url';

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
    return <form action={url.todoPath(todo)} method='post'
      onSubmit={this.onSubmit} className='editTodoForm'>
      <input type='hidden' name='method' value='PUT'/>
      <label>
        <span className='accessibleHidden'>Edit todo:</span>
        <input ref='text' type='text' name='text' defaultValue={todo.text}
          placeholder='e.g., do the laundry' autoFocus
          className='editTodoForm__input'/>
      </label>
      <button type='submit' className='editTodoForm__submitButton'>
        Save
      </button>
    </form>;
  }

}

EditTodoForm.propTypes = {
  todo: todoPropType,
  updateTodo: PropTypes.func.isRequired
};
