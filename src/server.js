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

const app = express();

app.set('query parser', 'simple');

app.set('views', './src/');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('dist'));

const db = new Database('./db-todos');
initDatabase(db);

const renderError = (res, err) => {
  res.status(500).send(err.message);
};

const bodyToTodo = (body) => {
  return {
    id: body.id,
    text: body.text,
    completed: body.completed === 'true'
  };
};

app.get('/', (req, res) => {
  res.redirect('/todos');
});

const postCallback = (res) => {
  return (err) => {
    if (err) {
      renderError(res, err);
      return;
    }
    if (req.query.redirect === 'false') {
      res.status(200).end();
    } else {
      res.redirect('/');
    }
  };
};

app.post('/todos/:id', (req, res) => {
  const method = req.body._method;
  if (method === 'put') {
    console.log('PUT', req.params.id, req.body);
    db.put(req.params.id, bodyToTodo(req.body), postCallback(res));
  } else if (method === 'delete') {
    console.log('DELETE', req.params.id, req.body);
    db.del(req.params.id, postCallback(res));
  } else {
    res.status(400).send('invalid request');
  }
});

app.get('/todos', (req, res, next) => {
  if (req.accepts('application/json')) {
    db.getAll((err, todos) => {
      if (err) {
        renderError(res, err);
        return;
      }
      res.json(todos);
    });
  } else {
    next();
  }
});

app.post('/todos', (req) => {
  // const id = uuid.v4();
  const id = 'new'; // TODO
  db.put(id, bodyToTodo(req.body));
});

const routeMatchHandler = (res, err, redirectLocation, props) => {
  console.log('routeMatchHandler', err, redirectLocation, props);
  if (err) {
    renderError(res, err);
    return;
  }
  if (!props) {
    res.status(404).send('Not found');
    return;
  }
  // Load data, then render static HTML
  const { dataSource, dataProp } = props.routes[0];
  const loadDataParams = { ...props.params, db };
  loadData(dataSource, loadDataParams, (err, data) => {
    if (err) {
      renderError(res, err);
      return;
    }
    console.log('data loaded', data);
    props.createElement = createElementWithData.bind(null, dataProp, data);
    const component = <RouterContext {...props}/>;
    const content = renderToString(component);
    res.render('layout', { title: 'TODO', content });
  });
};

app.get('*', (req, res) => {
  // Server-side route matching with react-router
  // https://github.com/rackt/react-router/blob/master/docs/guides/advanced/ServerRendering.md
  match({ routes, location: req.url }, routeMatchHandler.bind(null, res));
});

const port = 3333;

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Server running at http://localhost:${port}`);
});
