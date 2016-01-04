import AllTodos from './components/AllTodos';
import ActiveTodos from './components/ActiveTodos';
import CompletedTodos from './components/CompletedTodos';
import CreateTodoForm from './components/CreateTodoForm';
import EditTodoForm from './components/EditTodoForm';

export default [
  {
    path: '/',
    component: AllTodos
  },
  {
    path: '/active',
    component: ActiveTodos
  },
  {
    path: '/completed',
    component: CompletedTodos
  },
  {
    path: '/new',
    component: CreateTodoForm
  },
  {
    path: '/edit/:id',
    component: EditTodoForm
  }
];
