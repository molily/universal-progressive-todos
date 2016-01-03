import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import todosPropType from './todosPropType';
import CompleteTodoForm from './CompleteTodoForm';
import DeleteTodoForm from './DeleteTodoForm';

export default class TodoList extends Component {

  render() {
    const { todos, completeTodo, deleteTodo } = this.props;
    const items = todos.map((todo, index) => {
      const className = classNames(
        'todo',
        todo.completed ? 'todo-completed' : 'todo-active'
      );
      return <li key={index} className={className}>
        <CompleteTodoForm todo={todo} completeTodo={completeTodo}/>
        <span className='todoText'>{todo.text}</span>
        <DeleteTodoForm todo={todo} deleteTodo={deleteTodo}/>
      </li>;
    });
    return <ul className='todos'>{items}</ul>;
  }

}

TodoList.propTypes = {
  todos: todosPropType,
  completeTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired
};
