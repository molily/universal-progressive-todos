import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from './promiseMiddleware';
import rootReducer from '../reducers/rootReducer';

export default (initialState) =>
  createStore(rootReducer, initialState, applyMiddleware(promiseMiddleware));
