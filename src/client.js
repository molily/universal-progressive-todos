/** @jsx h */
import { h, render } from 'preact';
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
