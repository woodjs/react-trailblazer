"use strict";

import {CREATE, READ, UPDATE, DELETE} from '../constant/action_type';

const initialState = {

};

export default function trailblazerReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE:
        return {
          data: 'hello trailblazer!'
        };
      break;
    default:

      return state;
  }
}