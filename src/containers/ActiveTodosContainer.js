import _ from 'lodash';
import { connect } from 'preact-redux';
import ActiveTodos from '../components/ActiveTodos';
import * as todosActions from '../actions/todosActions';

const ActiveTodosContainer = connect(
  // mapStateToProps
  _.identity,
  // mapDispatchToProps
  todosActions
)(ActiveTodos);

ActiveTodosContainer.needs = [
  todosActions.getTodos
];

export default ActiveTodosContainer;
