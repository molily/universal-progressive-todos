import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import createElementWithData from './createElementWithData';
import './main.css';

const initClient = () => {
  const routerProps = {
    history: browserHistory,
    routes
  };
  const component = <Router {...routerProps}/>;
  const target = document.getElementById('content');
  ReactDOM.render(component, target);
};

initClient();
