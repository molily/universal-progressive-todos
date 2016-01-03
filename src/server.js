import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import uuid from 'uuid';
import React from 'react';
import { renderToString } from 'react-dom/server';
import createLocation from 'history/lib/createLocation';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';

import partial from './partial';
import Database from './database';
import initDatabase from './components/initDatabase';
import routes from './routes';
import createStore from './createStore';
import fetchComponentData from './fetchComponentData';

const app = express();

app.set('query parser', 'simple');

app.set('views', './src/');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('dist'));

const db = new Database('./db-todos');
global.db = db;
initDatabase(db);

const wantsJSON = (req) =>
  req.accepts('html', 'json') === 'json';

const renderError = (res, err) => {
  res.status(500).send(err.message);
};

const handleError = (res, callback) => {
  return (err, ...payload) => {
    if (err) {
      renderError(res, err);
    } else {
      return callback(...payload);
    }
  };
};

const bodyToTodo = (body) => {
  return {
    id: body.id,
    text: body.text,
    completed: body.completed === 'true'
  };
};

const postCallback = (req, res) => {
  return handleError(res, () => {
    if (wantsJSON(req)) {
      res.status(200).end();
    } else {
      res.redirect('/');
    }
  });
};

app.post('/todos/:id', (req, res) => {
  const method = req.body._method;
  console.log('POST /todos/' + req.params.id, req.body);
  if (method === 'PUT') {
    // TODO: Move this to the actions. Create store, dispatch action
    db.put(req.params.id, bodyToTodo(req.body), postCallback(req, res));
  } else if (method === 'DELETE') {
    // TODO: Move this to the actions. Create store, dispatch action
    db.delete(req.params.id, postCallback(req, res));
  } else {
    res.status(400).send('Invalid request');
  }
});

app.get('/', (req, res, next) => {
  if (wantsJSON(req)) {
    db.getAll(handleError(res, (todos) => {
      res.json(todos);
    }));
  } else {
    next();
  }
});

app.post('/', (req) => {
  const id = uuid.v4();
  db.put(id, bodyToTodo(req.body));
});

const renderContent = (store, props) => {
  console.log('renderHTML');
  const element = <Provider store={store}>
    <RouterContext {...props}/>
  </Provider>;
  return renderToString(element);
};

const routeMatchHandler = (res, redirectLocation, props) => {
  const store = createStore();
  // Inject reference to Database instance
  const params = { ...props.params, db };
  fetchComponentData(store.dispatch, props.components, params)
    .then((...args) => {
      console.log('fetchComponentData resolved', args);
      return renderContent(store, props);
    })
    .then((content) => {
      const initialState = store.getState();
      res.render('layout', {
        title: 'Todo list',
        content,
        initialState: JSON.stringify(initialState, null, 2)
      });
    })
    .catch((reason) => {
      renderError(res, reason)
    });
};

app.get('*', (req, res) => {
  // Server-side route matching with react-router
  // https://github.com/rackt/react-router/blob/master/docs/guides/advanced/ServerRendering.md
  match(
    { routes, location: req.url },
    handleError(res, partial(routeMatchHandler, res))
  );
});

const networkInterface = '0.0.0.0';
const port = 3333;

app.listen(port, networkInterface, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  process.stdout.write('\u001B[2J\u001B[0f');
  console.log(`Server running at http://${networkInterface}:${port}`);
});
