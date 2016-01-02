import React, { Component } from 'react';
import todosPropType from './todosPropType';
import TodoList from './TodoList';
import { isServer } from './../universal';

export default class AllTodos extends Component {

  render() {
    console.log('AllTodos#render');
    const { todos } = this.props;
    console.dir(todos, { color: true, depth: 0 });
    return <TodoList todos={todos}/>;
  }

}

AllTodos.loadProps = (params, callback) => {
  console.log('AllTodos.loadProps', params);
  if (isServer) {
    global.db.getAll((err, todos) => {
      callback(err, { todos });
    });
  } else {
    console.trace();
  }
};

AllTodos.propTypes = {
  todos: todosPropType
};
