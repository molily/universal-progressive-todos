import React, { Component, PropTypes } from 'react';
import todoPropType from './todoPropType';

export default class PutTodoForm extends Component {

  onSubmit() {
    if (this.props.onSubmit) {
      this.props.onSubmit();
    }
  }

  render() {
    const { todo, buttonText } = this.props;
    const action = `/todos/{todo.id}`;
    return <form action={action} method='post'
      onSubmit={this.onSubmit.bind(this)} className='putTodoForm'>
      <input type='hidden' name='_method' value='put'/>
      <input type='hidden' name='id' value={todo.id}/>
      <input type='hidden' name='text' value={todo.text}/>
      <input type='hidden' name='completed' value={todo.completed}/>
      <button type='submit' className='putTodoButton'>
        {buttonText}
      </button>
    </form>;
  }

}

PutTodoForm.propTypes = {
  todo: todoPropType,
  buttonText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func
};
