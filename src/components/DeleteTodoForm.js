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
    this.props.deleteTodo(this.props.todo);
  }

  render() {
    const { todo } = this.props;
    return <form action={url.todoPath(todo)} method='post'
      onSubmit={this.onSubmit} className='deleteTodoForm'>
      <input type='hidden' name='_method' value='DELETE'/>
      <input type='hidden' name='id' value={todo.id}/>
      <button type='submit' className='deleteTodoButton'>
        Delete
      </button>
    </form>;
  }

}

DeleteTodoForm.propTypes = {
  todo: todoPropType,
  deleteTodo: PropTypes.func.isRequired
};
