/** @jsx h */
// h is used indirectly by JSX
import { h, render } from 'preact';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';
import createStore from './store/createStore';

const $ = (id) => window.document.getElementById(id);

const initClient = () => {
  // Rehydrate Redux store state from server
  const initialState = JSON.parse($('initialState').textContent);
  // Create the Redux store
  const store = createStore(initialState);
  // Render component tree
  const component = (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  const target = $('content');
  render(component, target);
};

initClient();
