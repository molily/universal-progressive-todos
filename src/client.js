import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import AsyncProps from 'async-props';
import routes from './routes';
import './main.css';

const initClient = () => {
  const renderLoading = () =>
    <div>Loading…</div>;
  const routerRender = (props) => {
    console.log('routerRender', props);
    return <AsyncProps {...props} renderLoading={renderLoading}/>;
  };
  const routerProps = {
    routes,
    history: browserHistory,
    render: routerRender
  };
  const component = <Router {...routerProps}/>;
  const target = document.getElementById('content');
  render(component, target);
};

initClient();
