'use strict';

import * as types from '../constants/actionTypes';

const initialState = {
  id: '',
  name: '',
  tariff: '',
  itype: '',
  accepted: false,
  time: null,
  bill: null
};

export default function itemState(state = initialState, action = {}) {
  switch (action.type) {
    case types.ITEM_READ:
      return {
        ...state,
        id: action.id
      };
    case types.ITEM_LOADED:
      return {
        ...state,
        name: action.name,
        tariff: action.tariff,
        itype: action.itype
      };
    case types.ITEM_ACCEPT:
      return {
        ...state,
        accepted: true,
        time: action.time
      };
    case types.ITEM_DECLINED:
      return {
        ...state,
        accepted: false
      };
    case types.ITEM_STOPPED:
      return {
        ...initialState,
        bill: action.amount
      };
    default:
      return state;
  }
}
