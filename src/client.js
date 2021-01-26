import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createStore from './store/createStore';
import App from './components/App';

const $ = (id) => window.document.getElementById(id);

const initClient = () => {
  // Rehydrate Redux store state from server
  const initialState = JSON.parse($('initialState').textContent);
  // Create the Redux store
  const store = createStore(initialState);
  // Render component tree
  const component = (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
  const target = $('content');
  render(component, target);
};

initClient();
