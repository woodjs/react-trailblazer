import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import trailblazerReducer from '../reducer/index';

const store = createStore(trailblazerReducer, applyMiddleware(thunk));

export default store;