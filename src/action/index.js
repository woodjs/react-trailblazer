import * as actionType from '../constant/action_type';

export function showProductList(data) {
  return {
    type: actionType.SHOW_PRODUCT_LIST,
    data
  };
}