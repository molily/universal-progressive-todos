import React, { Component } from 'react';
import todosPropType from './todosPropType';
import CompleteTodoForm from './CompleteTodoForm';
import DeleteTodoForm from './DeleteTodoForm';

export default class TodoList extends Component {

  render() {
    const todos = this.props.todos.map((todo, index) => {
      return <li key={index} className='todo'>
        <CompleteTodoForm todo={todo}/>
        <span className='todoText'>{todo.text}</span>
        <DeleteTodoForm todo={todo} buttonText=''/>
      </li>;
    });
    return <ul className='todos'>{todos}</ul>;
  }

}

TodoList.propTypes = {
  todos: todosPropType
};
