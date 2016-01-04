import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import todosPropType from './todosPropType';
import CompleteTodoForm from './CompleteTodoForm';
import DeleteTodoForm from './DeleteTodoForm';
import compareTodos from '../utils/compareTodos';

export default class TodoList extends Component {

  render() {
    const { updateTodo, deleteTodo } = this.props;
    const todos = this.props.todos.slice().sort(compareTodos);
    const items = todos.map((todo) => {
      const className = classNames(
        'todo',
        todo.completed ? 'todo--completed' : 'todo--active'
      );
      return <li key={todo.id} className={className}>
        <div className='todo__completeForm'>
          <CompleteTodoForm todo={todo} updateTodo={updateTodo}/>
        </div>
        <span className='todo__text'>
          {todo.text}
        </span>
        <div className='todo__deleteForm'>
          <DeleteTodoForm todo={todo} deleteTodo={deleteTodo}/>
        </div>
      </li>;
    });
    return <ul className='todos'>{items}</ul>;
  }

}

TodoList.propTypes = {
  todos: todosPropType,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired
};
