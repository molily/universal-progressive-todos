import AllTodosContainer from './containers/AllTodosContainer';
import ActiveTodosContainer from './containers/ActiveTodosContainer';
import CompletedTodosContainer from './containers/CompletedTodosContainer';

export default [
  {
    path: '/',
    exact: true,
    component: AllTodosContainer
  },
  {
    path: '/active',
    component: ActiveTodosContainer
  },
  {
    path: '/completed',
    component: CompletedTodosContainer
  }
];
