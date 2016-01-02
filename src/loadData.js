const server = {
  allTodos({ db }, callback) {
    db.getAll(callback);
  },
  activeTodos() {},
  completedTodos() {},
  newTodo() {},
  todo() {}
};

const httpGet = (url, callback) => {
  const xhr = new XMLHttpRequest();

};

const client = {
  allTodos(params, callback) {
    httpGet('', callback);
  },
  activeTodos() {},
  completedTodos() {},
  newTodo() {},
  todo() {}
};

const adapter = typeof window !== 'undefined' ? client : server;

export default (dataSource, params, callback) => {
  console.log('loadData', dataSource, params, callback);
  adapter[dataSource](params, callback);
};
