import React, { Component } from 'react';
import todosPropType from './todosPropType';
import TodoList from './TodoList';

export default class AllTodos extends Component {

  render() {
    console.log('TodoList#render', this.props);
    return <TodoList todos={this.props.todos}/>;
  }

}

AllTodos.propTypes = {
  todos: todosPropType
};
