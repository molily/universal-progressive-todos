import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import uuid from 'uuid';
import { h } from 'preact';
import render from 'preact-render-to-string';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider } from 'preact-redux';
import { todosPath, todoPathPattern, todoPath, todoInListPath }
  from './utils/url';
import Database from './data/Database';
import seedDatabase from './data/seedDatabase';
import createStore from './store/createStore';
import * as todosActions from './actions/todosActions';
import installWebpackDevServer from '../webpack/installWebpackDevServer';
import App from './components/App';
import routes from './routes';

const networkInterface = '0.0.0.0';
const port = 3333;

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

const app = express();

app.set('query parser', 'simple');

app.set('views', './src/');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('dist'));

// Install Webpack development server
if (isDevelopment) {
  installWebpackDevServer(app);
}

// Enable gzip compression
if (isProduction) {
  app.use(compression());
}

// Set up and seed database
const db = new Database('./db-todos');
seedDatabase(db);

const wantsJSON = (req) =>
  req.accepts('html', 'json') === 'json';

const renderServerError = (res, error) => {
  res.status(500).render('error', {
    error: isDevelopment ? error : null
  });
};

const bodyToTodo = (body) =>
  ({
    id: body.id,
    text: body.text,
    completed: body.completed === 'true',
    editMode: body.editMode === 'true'
  });

// Creates a function that handles promise rejection
// by rendering a server error.
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

// POST on a individual to-do: Update or delete
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

const matchUrl = (url) => {
  for (let i = 0, l = routes.length; i < l; i++) {
    const route = routes[i];
    const match = matchPath(url, route);
    if (match) {
      return { route, match };
    }
  }
  return null;
};

// Loads the data for the current route by calling the action creators
// specified in the component needs. Returns a promise.
const loadData = (url, route, params, store) => {
  const needs = route.component.needs || [];
  const promises = needs.map((need) =>
    // Dispatch action creators specified by the component needs
    store.dispatch(need(params, db))
  );
  return Promise.all(promises);
};

const renderApp = (url, store) => {
  console.log('renderApp', url);
  const context = {};
  const element = <div>
    <Provider store={store}>
      in Provider
      <StaticRouter location={url} context={context}>
        in StaticRouter
        <App />
      </StaticRouter>
    </Provider>
  </div>;
  return render(element);
};

app.get('*', (req, res) => {
  const { url } = req;
  // Redux store
  const store = createStore();

  const matchData = matchUrl(url);
  if (matchData) {
    // Load data to fill the store
    loadData(url, matchData.route, matchData.match.params, store)
      .then(() => {
        console.log('data loaded');
        // Render the app HTML into the layout
        const html = renderApp(url, store);
        console.log('html', typeof html, html);
        console.dir(html);
        res.render('layout', {
          title: 'Todo list',
          content: html,
          // Hydrate Redux store state
          initialState: JSON.stringify(store.getState())
        });
      })
      // Catch errors when loading data or rendering the app
      .catch(onRejectedRenderError(res));
  } else {
    res.sendStatus(404);
  }
});


app.listen(port, networkInterface, (error) => {
  if (error) {
    console.error(error);
    return;
  }
  // Clear screen
  process.stdout.write('\u001B[2J\u001B[0f');
  console.log(`Server running at http://${networkInterface}:${port}`);
});
