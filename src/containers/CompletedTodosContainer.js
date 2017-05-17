import _ from 'lodash';
import { connect } from 'preact-redux';
import CompletedTodos from '../components/CompletedTodos';
import * as todosActions from '../actions/todosActions';

const CompletedTodosContainer = connect(
  // mapStateToProps
  _.identity,
  // mapDispatchToProps
  todosActions
)(CompletedTodos);

CompletedTodosContainer.needs = [
  todosActions.getTodos
];

export default CompletedTodosContainer;
