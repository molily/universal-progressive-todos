import AllTodos from './components/AllTodos';
import ActiveTodos from './components/ActiveTodos';
import CompletedTodos from './components/CompletedTodos';
import NewTodo from './components/NewTodo';
import EditTodo from './components/EditTodo';

export default [
  {
    path: '/',
    component: AllTodos,
    dataSource: 'allTodos',
    dataProp: 'todos'
  },
  {
    path: '/active',
    component: ActiveTodos,
    dataSource: 'activeTodos',
    dataProp: 'todos'
  },
  {
    path: '/completed',
    component: CompletedTodos,
    dataSource: 'completedTodos',
    dataProp: 'todos'
  },
  {
    path: '/new',
    component: NewTodo,
    dataSource: 'newTodo',
    dataProp: 'todo'
  },
  {
    path: '/edit/:id',
    component: EditTodo,
    dataSource: 'todo',
    dataProp: 'todo'
  }
];
