# Todo list with universal JavaScript &amp; Progressive Enhancement

This is an example app that renders HTML on the server and on the client using “universal” / “isomorphic” JavaScript. It’s using [React](https://facebook.github.io/react/), [React-Router](https://github.com/rackt/react-router) and [Redux](https://github.com/rackt/redux) for the rendering and the UI logic, and LevelDB for storing the todos on the server.

There a several good example apps and boilerplates for universal React.js apps. This one borrows ideas from Milo Mordaunt’s great tutorial: [Handcrafting an Isomorphic Redux Application (With Love)](https://medium.com/front-end-developers/handcrafting-an-isomorphic-redux-application-with-love-40ada4468af4) and the [corresponding repository](https://github.com/bananaoomarang/isomorphic-redux).

What’s special about this example is that it’s made with Progressive Enhancement in mind. Instead of just rendering the first page on the server to improve the single-page application’s startup time, this example works entirely when [JavaScript is disabled or fails for any reason](http://kryogenix.org/code/browser/everyonehasjs.html). See my recent article [Interaction is Key: Progressive Enhancement and JavaScript](http://molily.de/interaction-is-key/) for background information.

This is a work in progress! There’s a lot to add, optimize and clean up.

Similar projects:

- [react-redux-universal-hot-example](https://github.com/erikras/react-redux-universal-hot-example) by Erik Rasmussen: More complete but way more complex example, also no emphasis on Progressive Enhancement
