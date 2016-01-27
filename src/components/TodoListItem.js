import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import todoPropType from './todoPropType';
import CompleteTodoForm from './CompleteTodoForm';
import DeleteTodoForm from './DeleteTodoForm';
import StartEditTodoForm from './StartEditTodoForm';
import EditTodoForm from './EditTodoForm';

export default class TodoListItem extends Component {

  render() {
    const { todo, updateTodo, deleteTodo } = this.props;
    const className = classNames(
      'todo',
      todo.completed ? 'todo--completed' : 'todo--active'
    );
    const body = todo.editMode ?
      <EditTodoForm todo={todo} updateTodo={updateTodo}/> :
      <span className='todo__text'>{todo.text}</span>;
    const accessibleLabel = todo.completed ?
      'Done:' : 'Todo:';
    return <li key={todo.id} id={`todo-${todo.id}`} className={className}>
      <span className='accessible-hidden'>{accessibleLabel}</span>
      <div className='todo__body'>{body}</div>
      <div className='todo__leftControls'>
        <CompleteTodoForm todo={todo} updateTodo={updateTodo}/>
      </div>
      <div className='todo__rightControls'>
        <StartEditTodoForm todo={todo} updateTodo={updateTodo}/>
        <DeleteTodoForm todo={todo} deleteTodo={deleteTodo}/>
      </div>
    </li>;
  }

}

TodoListItem.propTypes = {
  todo: todoPropType,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired
};
