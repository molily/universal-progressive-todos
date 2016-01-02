import AllTodos from './AllTodos';
import ActiveTodos from './ActiveTodos';
import CompletedTodos from './CompletedTodos';
import NewTodo from './NewTodo';
import EditTodo from './EditTodo';

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
