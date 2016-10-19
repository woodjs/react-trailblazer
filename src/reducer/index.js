import {combineReducers} from 'redux';

import {SHOW_PRODUCT_LIST} from '../constant/action_type';

const INITIAL_STATE = {};

function products(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SHOW_PRODUCT_LIST:
      return action.data;
      break;
    default:
      return state;
  }
}

export default combineReducers({
  products
});