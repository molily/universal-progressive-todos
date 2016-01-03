import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';
import promiseMiddleware from './promiseMiddleware';

export default (initialState) =>
  applyMiddleware(promiseMiddleware)(createStore)(rootReducer, initialState);
