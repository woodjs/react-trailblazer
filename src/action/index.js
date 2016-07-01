"use strict";

import * as actionType from '../constant/action_type';

export function create(data) {
  return {
    type: actionType.CREATE,
    data
  };
}