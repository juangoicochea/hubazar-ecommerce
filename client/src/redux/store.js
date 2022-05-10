import { createStore, applyMiddleware } from 'redux';
import allreducers from './RootReducer'
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

//Create Redux store
const allMiddleware = applyMiddleware(thunk, logger);
const hubazarStore = createStore(allreducers, composeWithDevTools(allMiddleware));
//const hubazarStore = createStore(allreducers, applyMiddleware(logger));

export default hubazarStore;