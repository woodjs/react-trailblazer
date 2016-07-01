"use strict";

import * as actionType from '../constants/action_type';

export function create(data) {
  return {
    type: actionType.CREATE,
    data
  };
}