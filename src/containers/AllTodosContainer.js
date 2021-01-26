import { connect } from 'react-redux';
import AllTodos from '../components/AllTodos';
import * as todosActions from '../actions/todosActions';

const AllTodosContainer = connect(
  // mapStateToProps
  (state) => state,
  // mapDispatchToProps
  todosActions,
)(AllTodos);

AllTodosContainer.needs = [todosActions.getTodos];

export default AllTodosContainer;
