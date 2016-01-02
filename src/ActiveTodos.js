import React, { Component } from 'react';
import todosPropType from './todosPropType';
import TodoList from './TodoList';

export default class ActiveTodos extends Component {

  render() {
    const todos = this.props.todos.filter((todo) => !todo.completed);
    return <TodoList items={todos}/>;
  }

}

ActiveTodos.propTypes = {
  todos: todosPropType
};
