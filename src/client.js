import { h } from 'preact';
import { render } from 'preact-compat';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'preact-redux';
import createStore from './store/createStore';
import App from './components/App';

const $ = (id) =>
  window.document.getElementById(id);

const initClient = () => {
  // Rehydrate Redux store state from server
  const initialState = JSON.parse(
    $('initialState').textContent
  );
  // Create the Redux store
  const store = createStore(initialState);
  // Render component tree
  const component = <Provider store={store}>
    in Provider
    <BrowserRouter>
      in BrowserRouter
      <App />
    </BrowserRouter>
  </Provider>;
  const target = $('content');
  console.log('client component', component, target);
  render(component, target);
};

initClient();
