import { connect } from 'react-redux';
import CompletedTodos from '../components/CompletedTodos';
import * as todosActions from '../actions/todosActions';

const CompletedTodosContainer = connect(
  // mapStateToProps
  (state) => state,
  // mapDispatchToProps
  todosActions,
)(CompletedTodos);

CompletedTodosContainer.needs = [todosActions.getTodos];

export default CompletedTodosContainer;
