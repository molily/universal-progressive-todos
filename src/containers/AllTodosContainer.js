import _ from 'lodash';
import { connect } from 'react-redux';
import AllTodos from '../components/AllTodos';
import * as todosActions from '../actions/todosActions';

const AllTodosContainer = connect(
  // mapStateToProps
  _.identity,
  // mapDispatchToProps
  todosActions
)(AllTodos);

AllTodosContainer.needs = [
  todosActions.getTodos
];

export default AllTodosContainer;
