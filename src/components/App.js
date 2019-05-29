import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import routes from '../routes';

export default () => (
  <div>
    <h1>Todos</h1>
    <nav className='nav'>
      <ul className='nav__list'>
        <li className='nav__item'>
          <NavLink to='/' exact className='nav__link'>All</NavLink>
        </li>
        <li className='nav__item'>
          <NavLink to='/active' className='nav__link'>Active</NavLink>
        </li>
        <li className='nav__item'>
          <NavLink to='/completed' className='nav__link'>Completed</NavLink>
        </li>
      </ul>
    </nav>
    <Switch>
      {routes.map((route) => <Route key={route.path} {...route} />)}
    </Switch>
  </div>
);
