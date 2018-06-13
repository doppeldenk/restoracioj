import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

import reducers from './reducers';

const middleware = applyMiddleware(thunk, promiseMiddleware());

export default createStore(reducers, middleware);
