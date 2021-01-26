import { connect } from 'react-redux';

import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from '../actions/todosActions';
import CompletedTodos from '../components/CompletedTodos';

const CompletedTodosContainer = connect(
  // mapStateToProps
  (state) => state,
  // mapDispatchToProps
  { createTodo, updateTodo, deleteTodo },
)(CompletedTodos);

CompletedTodosContainer.needs = [getTodos];

export default CompletedTodosContainer;
