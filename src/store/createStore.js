import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from './promiseMiddleware';
import rootReducer from '../reducers/rootReducer';

export default (initialState) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  createStore(rootReducer, initialState, applyMiddleware(promiseMiddleware));
