import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import uuid from 'uuid';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import AsyncProps, { loadPropsOnServer } from 'async-props';
import Database from './database';
import initDatabase from './components/initDatabase';
import routes from './routes';

const partial = (f, ...args1) => {
  return (...args2) => {
    const finalArgs = [ ...args1, ...args2 ];
    return f(...finalArgs);
  };
};

const app = express();

app.set('query parser', 'simple');

app.set('views', './src/');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('dist'));

const db = new Database('./db-todos');
global.db = db;
initDatabase(db);

const handleError = (res, callback) => {
  return (err, ...payload) => {
    if (err) {
      res.status(500).send(err.message);
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
    if (req.query.redirect === 'false') {
      res.status(200).end();
    } else {
      res.redirect('/');
    }
  });
};

app.post('/todos/:id', (req, res) => {
  const method = req.body._method;
  if (method === 'put') {
    console.log('PUT', req.params.id, req.body);
    db.put(req.params.id, bodyToTodo(req.body), postCallback(req, res));
  } else if (method === 'delete') {
    console.log('DELETE', req.params.id, req.body);
    db.delete(req.params.id, postCallback(req, res));
  } else {
    res.status(400).send('invalid request');
  }
});

app.get('/', (req, res, next) => {
  const wantsJSON = req.accepts('html', 'json') === 'json';
  if (wantsJSON) {
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

const routeMatchHandler = (res, redirectLocation, renderProps) => {
  loadPropsOnServer(renderProps, (err, asyncProps, scriptTag) => {
    const element = <AsyncProps {...renderProps} {...asyncProps} />;
    const content = renderToString(element);
    res.render('layout', {
      title: 'Todo list',
      content,
      asyncProps: scriptTag
    });
  })
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
