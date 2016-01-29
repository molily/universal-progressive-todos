import express from 'express';
import bodyParser from 'body-parser';
import uuid from 'uuid';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import partial from './utils/partial';
import { todosPath, todoPathPattern, todoPath, todoInListPath }
  from './utils/url';
import Database from './data/Database';
import seedDatabase from './data/seedDatabase';
import routes from './routes';
import createStore from './store/createStore';
import fetchComponentData from './data/fetchComponentData';
import * as todosActions from './actions/todosActions';
import webpackDevServer from '../webpack/devServer';

const app = express();

app.set('query parser', 'simple');

app.set('views', './src/');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('dist'));

// Webpack development server
if (process.env.NODE_ENV !== 'production') {
  webpackDevServer(app);
}

const db = new Database('./db-todos');
seedDatabase(db);

const wantsJSON = (req) =>
  req.accepts('html', 'json') === 'json';

const renderServerError = (res, error) => {
  res.status(500).send(error.message);
};

const bodyToTodo = (body) => {
  return {
    id: body.id,
    text: body.text,
    completed: body.completed === 'true',
    editMode: body.editMode === 'true'
  };
};

const onRejectedRenderError = (res) => {
  return (reason) => {
    renderServerError(res, reason);
  };
};

const handlePostAction = (req, res, todo, promise) => {
  promise.then(
    () => {
      if (wantsJSON(req)) {
        res.status(200).end();
      } else {
        res.redirect(todoInListPath(todo));
      }
    },
    onRejectedRenderError(res)
  );
};

// POST an a individual to-do: Update or delete
app.post(todoPathPattern, (req, res) => {
  const method = req.body._method;
  if (method === 'PUT') {
    // Update
    const todo = bodyToTodo(req.body);
    const promise = todosActions.createTodo(todo, db).payload;
    handlePostAction(req, res, todo, promise);
  } else if (method === 'DELETE') {
    // Delete
    const todo = { id: req.params.id };
    const promise = todosActions.deleteTodo(todo, db).payload;
    handlePostAction(req, res, todo, promise);
  } else {
    res.status(400).send('Invalid request');
  }
});

// Get all todos
/*
app.get(todosPath, (req, res, next) => {
  if (wantsJSON(req)) {
    todosActions.getTodos(params, db).payload.then(
      (todos) => {
        res.json(todos);
      },
      onRejectedRenderError(res)
    );
  } else {
    next();
  }
});
*/

// POST on the todos collection: Create a new to-do
app.post(todosPath, (req, res) => {
  const todo = bodyToTodo(req.body);
  const id = uuid.v4();
  // Add id
  todo.id = id;
  todosActions.createTodo(todo, db).payload.then(
    () => {
      if (wantsJSON(req)) {
        res.status(201).location(todoPath(todo)).end();
      } else {
        res.redirect(todoInListPath(todo));
      }
    },
    onRejectedRenderError(res)
  );
});

const renderContent = (store, props) => {
  const element = <Provider store={store}>
    <RouterContext {...props}/>
  </Provider>;
  return renderToString(element);
};

const routeMatchHandler = (res, error, redirectLocation, props) => {
  if (error) {
    renderServerError(res, error);
    return;
  }
  if (!props) {
    res.status(404).send('Not Found');
    return;
  }
  const store = createStore();
  fetchComponentData(
    store.dispatch, props.components, props.params, db
  ).then(
    () => {
      const content = renderContent(store, props);
      const initialState = store.getState();
      res.render('layout', {
        title: 'Todo list',
        content,
        initialState: JSON.stringify(initialState)
      });
    },
    (reason) => {
      renderServerError(res, reason);
    }
  );
};

app.get('*', (req, res) => {
  // Server-side route matching with react-router
  // https://github.com/rackt/react-router/blob/master/docs/guides/advanced/ServerRendering.md
  match(
    { routes, location: req.url },
    partial(routeMatchHandler, res)
  );
});

const networkInterface = '0.0.0.0';
const port = 3333;

app.listen(port, networkInterface, (error) => {
  if (error) {
    console.error(error);
    return;
  }
  //process.stdout.write('\u001B[2J\u001B[0f');
  console.log(`Server running at http://${networkInterface}:${port}`);
});
