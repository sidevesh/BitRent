'use strict';

import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import reducer from '../reducers';
import thunk from 'redux-thunk';
//import devToolsEnhancer from 'remote-redux-devtools';
import { composeWithDevTools } from 'remote-redux-devtools';
const enhancer = composeWithDevTools(applyMiddleware(thunk));

export default function configureStore() {
  return createStore(reducer, enhancer);
}
