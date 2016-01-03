import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import createStore from './createStore';
import routes from './routes';
import './main.css';

const $ = (id) =>
  window.document.getElementById(id);

const initClient = () => {
  const initialState = JSON.parse(
    $('initialState').textContent
  );
  const store = createStore(initialState);
  const component = <Provider store={store}>
    <Router routes={routes} history={browserHistory}/>
  </Provider>;
  const target = $('content');
  render(component, target);
};

initClient();
