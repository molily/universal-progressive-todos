import { connect } from 'react-redux';

import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from '../actions/todosActions';
import ActiveTodos from '../components/ActiveTodos';

const ActiveTodosContainer = connect(
  // mapStateToProps
  (state) => state,
  // mapDispatchToProps
  { createTodo, updateTodo, deleteTodo },
)(ActiveTodos);

ActiveTodosContainer.needs = [getTodos];

export default ActiveTodosContainer;
