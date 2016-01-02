import React, { Component, PropTypes } from 'react';
import todoPropType from './todoPropType';

export default class CompleteTodoForm extends Component {

  onSubmit() {
    if (this.props.onSubmit) {
      this.props.onSubmit();
    }
  }

  render() {
    const { todo } = this.props;
    const action = `/todos/${todo.id}`;
    return <form action={action} method='post'
      onSubmit={this.onSubmit.bind(this)} className='completeTodoForm'>
      <input type='hidden' name='_method' value='put'/>
      <input type='hidden' name='id' value={todo.id}/>
      <input type='hidden' name='text' value={todo.text}/>
      <input type='hidden' name='completed' value={!todo.completed}/>
      <button type='submit' className='completeTodoButton'>
        Complete
      </button>
    </form>;
  }

}

CompleteTodoForm.propTypes = {
  todo: todoPropType,
  onSubmit: PropTypes.func
};
