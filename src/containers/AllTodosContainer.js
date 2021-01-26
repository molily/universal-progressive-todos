import { connect } from 'react-redux';

import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from '../actions/todosActions';
import AllTodos from '../components/AllTodos';

const AllTodosContainer = connect(
  // mapStateToProps
  (state) => state,
  // mapDispatchToProps
  { createTodo, updateTodo, deleteTodo },
)(AllTodos);

AllTodosContainer.needs = [getTodos];

export default AllTodosContainer;
