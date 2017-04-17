import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import routes from '../routes';

export default () => (
  <div>
    <h1>Todos</h1>
    <nav className='nav'>
      <ul className='nav__list'>
        <li className='nav__item'>
          <NavLink to='/'>All</NavLink>
        </li>
        <li className='nav__item'>
          <NavLink to='/active'>Active</NavLink>
        </li>
        <li className='nav__item'>
          <NavLink to='/completed'>Completed</NavLink>
        </li>
      </ul>
    </nav>
    <Switch>
      {routes.map((route, index) =>
        /* eslint-disable react/no-array-index-key */
        <Route key={index} {...route} />
        /* eslint-enable react/no-array-index-key */
      )}
    </Switch>
  </div>
);
