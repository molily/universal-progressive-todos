import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from './promiseMiddleware';
import rootReducer from '../reducers/rootReducer';

export default (initialState) =>
  applyMiddleware(promiseMiddleware)(createStore)(rootReducer, initialState);
