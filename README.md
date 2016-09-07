# Todo list with universal JavaScript &amp; Progressive Enhancement

This is a simple example app that renders HTML on the server and on the client using “universal” / “isomorphic” JavaScript. It’s using Node.js, [React](https://facebook.github.io/react/), [React-Router](https://github.com/rackt/react-router) and [Redux](https://github.com/rackt/redux) for the rendering and the UI logic. For storing the todos on the server, it uses the key-value database [LevelDB](http://leveldb.org/).

There are several good example apps and boilerplates for universal React.js apps. This one borrows ideas from Milo Mordaunt’s great tutorial: [Handcrafting an Isomorphic Redux Application (With Love)](https://medium.com/front-end-developers/handcrafting-an-isomorphic-redux-application-with-love-40ada4468af4) and the [corresponding repository](https://github.com/bananaoomarang/isomorphic-redux).

What’s special about this example is that it’s made with **Progressive Enhancement** in mind. Instead of just rendering the first page on the server to improve the Javascript application’s startup time, this example works entirely when [JavaScript is disabled or fails for any reason](http://kryogenix.org/code/browser/everyonehasjs.html). See my recent articles for background information:

* [Interaction is Key: Progressive Enhancement and JavaScript](http://molily.de/interaction-is-key/)
* [Progressive enhancement for JavaScript web apps](http://molily.de/single-page-apps/)
* [Progressive enhancement and JavaScript failure](http://molily.de/javascript-failure/)

The interesting difference between the numerous universal React examples is the data fetching and the server communication. This example follows Milo Mordaunt’s approach. It declares the data dependencies in the React component. The static component property `needs` lists Redux action creators.

These [action creators](https://github.com/molily/universal-progressive-todos/blob/master/src/actions/todosActions.js) directly talk to the database when called on the server, or make a request to the server when called on the client. It gets simpler if you use a separate HTTP REST API server that speaks JSON. Then you can use a universal HTTP library like [axios](https://github.com/mzabriskie/axios) or [fetch](https://github.com/matthew-andrews/isomorphic-fetch) to talk with the API server. In this simple example though, everything is mashed up on purpose.

I think the key is to have the data loading logic in one place, or to have a high-level wrapper like [Relay](https://facebook.github.io/relay/), [Transmit](https://github.com/RickWong/react-transmit) or [Falcor](http://www.mattgreer.org/articles/server-side-react-and-falcor/) for managing data dependencies.

## Starting the server

```
$ npm install
$ npm start
```

Then open [http://localhost:3333](http://localhost:3333) in your browser.

## Similar projects

- [react-redux-universal-hot-example](https://github.com/erikras/react-redux-universal-hot-example) by Erik Rasmussen: More complete but way more complex example, also no emphasis on Progressive Enhancement

