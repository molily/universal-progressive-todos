import React, { Component, PropTypes } from 'react';
import todosPropType from './todosPropType';
import TodoListItem from './TodoListItem';
import compareTodos from '../utils/compareTodos';

export default class TodoList extends Component {

  render() {
    const { updateTodo, deleteTodo } = this.props;
    const todos = this.props.todos.slice().sort(compareTodos);
    const items = todos.map((todo) =>
      <TodoListItem key={todo.id} todo={todo} updateTodo={updateTodo}
        deleteTodo={deleteTodo}/>
    );
    return <ul className='todos'>{items}</ul>;
  }

}

TodoList.propTypes = {
  todos: todosPropType,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired
};
