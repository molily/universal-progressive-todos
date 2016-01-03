import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import todosPropType from './todosPropType';
import TodoList from './TodoList';
import * as todosActions from '../actions/todosActions';

class AllTodos extends Component {

  render() {
    console.log('AllTodos#render');
    const { todos, completeTodo, deleteTodo } = this.props;
    console.dir(todos, { color: true, depth: 0 });
    return <TodoList todos={todos}
      completeTodo={completeTodo} deleteTodo={deleteTodo}/>;
  }

}

AllTodos.needs = [
  todosActions.getTodos
];

AllTodos.propTypes = {
  todos: todosPropType,
  completeTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired
};

export default connect(
  (state) => state,
  {
    completeTodo: todosActions.completeTodo,
    deleteTodo: todosActions.deleteTodo
  }
)(AllTodos);
