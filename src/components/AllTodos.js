import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import todosPropType from './todosPropType';
import TodoList from './TodoList';
import CreateTodoForm from './CreateTodoForm';
import * as todosActions from '../actions/todosActions';

class AllTodos extends Component {

  render() {
    const { todos, updateTodo, deleteTodo, createTodo } = this.props;
    return <div>
      <TodoList todos={todos}
        updateTodo={updateTodo} deleteTodo={deleteTodo}/>
      <CreateTodoForm createTodo={createTodo}/>
    </div>;
  }

}

AllTodos.needs = [
  todosActions.getTodos
];

AllTodos.propTypes = {
  todos: todosPropType,
  createTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired
};

export default connect(
  (state) => state,
  todosActions
)(AllTodos);
