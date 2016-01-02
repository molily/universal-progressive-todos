import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import Database from './database';
import initDatabase from './initDatabase';
import routes from './routes';
import createElementWithData from './createElementWithData';
import loadData from './loadData';

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

app.post('/:id', (req, res) => {
  const method = req.body._method;
  if (method === 'put') {
    console.log('PUT', req.params.id, req.body);
    db.put(req.params.id, bodyToTodo(req.body), postCallback(req, res));
  } else if (method === 'delete') {
    console.log('DELETE', req.params.id, req.body);
    db.del(req.params.id, postCallback(req, res));
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
  // const id = uuid.v4();
  const id = 'new'; // TODO
  db.put(id, bodyToTodo(req.body));
});

const dataLoaded = (res, props, data) => {
  const { dataProp } = props.routes[0];
  const newProps = {
    ...props,
    createElement: partial(createElementWithData, dataProp, data)
  };
  const component = <RouterContext {...newProps}/>;
  const content = renderToString(component);
  res.render('layout', { title: 'TODO', content });
};

const routeMatchHandler = (res, redirectLocation, props) => {
  if (!props) {
    res.status(404).send('Not found');
    return;
  }
  // Load data, then render static HTML
  loadData(
    props.routes[0].dataSource,
    { db },
    handleError(res, partial(dataLoaded, res, props))
  );
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
