import React, { Component, PropTypes } from 'react';
import todoPropType from './todoPropType';

export default class DeleteTodoForm extends Component {

  onSubmit(event) {
    event.preventDefault();
    this.props.deleteTodo(this.props.todo);
  }

  render() {
    const { todo } = this.props;
    const action = `/todos/${todo.id}`;
    return <form action={action} method='post'
      onSubmit={this.onSubmit.bind(this)} className='deleteTodoForm'>
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
