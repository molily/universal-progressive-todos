import React, { Component, PropTypes } from 'react';
import todoPropType from './todoPropType';

export default class DeleteTodoForm extends Component {

  onSubmit() {
    if (this.props.onSubmit) {
      this.props.onSubmit();
    }
  }

  render() {
    const { todo } = this.props;
    const action = `/todos/${todo.id}`;
    return <form action={action} method='post'
      onSubmit={this.onSubmit.bind(this)} className='deleteTodoForm'>
      <input type='hidden' name='_method' value='delete'/>
      <button type='submit' className='deleteTodoButton'>
        Delete
      </button>
    </form>;
  }

}

DeleteTodoForm.propTypes = {
  todo: todoPropType,
  onSubmit: PropTypes.func
};
