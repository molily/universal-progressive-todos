# Todo list with universal JavaScript &amp; Progressive Enhancement

This example app renders HTML on the server and on the client using “universal” JavaScript. It uses Node.js, [React](https://facebook.github.io/react/), [React-Router](https://github.com/rackt/react-router) and [Redux](https://github.com/rackt/redux) for the rendering and the UI logic. For storing the todos on the server, it uses the key-value database [LevelDB](http://leveldb.org/).

_There’s also a [Preact version available in the preact branch](https://github.com/molily/universal-progressive-todos/tree/preact) if you prefer that over React._

There are several good example apps and boilerplates for universal React/Preact apps. This one borrows ideas from Milo Mordaunt’s great tutorial: [Handcrafting an Isomorphic Redux Application (With Love)](https://medium.com/front-end-developers/handcrafting-an-isomorphic-redux-application-with-love-40ada4468af4) and the [corresponding repository](https://github.com/bananaoomarang/isomorphic-redux).

What’s special about this example is that it’s made with **Progressive Enhancement** in mind. Instead of just rendering the first page on the server to improve the JavaScript application’s startup time, this example works entirely when [JavaScript is disabled or fails for any reason](http://kryogenix.org/code/browser/everyonehasjs.html). See these articles for background information:

- [Interaction is Key: Progressive Enhancement and JavaScript](https://molily.de/interaction-is-key/)
- [Progressive enhancement for JavaScript web apps](https://molily.de/single-page-apps/)
- [Progressive enhancement and JavaScript failure](https://molily.de/javascript-failure/)
- [Robust Client-Side JavaScript – A Developer’s Guide](https://molily.de/robust-javascript/)

When it comes to data fetching, this example follows Milo Mordaunt’s approach. It declares the data dependencies in the React/Preact component. The static component property `needs` lists Redux action creators.

These [action creators](src/actions/todosActions.js) directly talk to the database when called on the server, or make a request to the server when called on the client. It gets simpler if you use a separate HTTP REST API server that speaks JSON. Then you can use a universal HTTP library like [axios](https://github.com/mzabriskie/axios) or [fetch](https://github.com/matthew-andrews/isomorphic-fetch) to talk with the API server. In this simple example though, everything is mashed up on purpose.

## Development server

Start the development server with:

```
$ npm install
$ npm start
```

Then open [http://localhost:3333](http://localhost:3333) in your browser.

## Production server

Make a client and server production build:

```
$ npm run build
```

Start the server with:

```
$ npm run server:production
```

Then open [http://localhost:3333](http://localhost:3333) in your browser.
