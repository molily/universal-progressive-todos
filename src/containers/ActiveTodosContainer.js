import { connect } from 'react-redux';
import ActiveTodos from '../components/ActiveTodos';
import * as todosActions from '../actions/todosActions';

const ActiveTodosContainer = connect(
  // mapStateToProps
  (state) => state,
  // mapDispatchToProps
  todosActions,
)(ActiveTodos);

ActiveTodosContainer.needs = [todosActions.getTodos];

export default ActiveTodosContainer;
