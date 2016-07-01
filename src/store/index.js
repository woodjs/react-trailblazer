"use strict";

import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import trailblazerReducer from '../reducers/index';

const store = createStore(combineReducers(trailblazerReducer), applyMiddleware(thunk));

export default store;