export default (db) => {
  const todos = [
    { id: '0', text: 'Wash the dishes', completed: false },
    { id: '1', text: 'Tidy up apartment', completed: false },
    { id: '2', text: 'Buy tomatoes', completed: false },
    { id: '3', text: 'Call Linda', completed: false },
    { id: '4', text: 'Walk the dog', completed: false },
  ];

  todos.forEach((todo) => {
    db.put(todo.id, todo);
  });
};
