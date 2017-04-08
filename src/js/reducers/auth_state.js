'use strict';

import * as types from '../constants/actionTypes';

const initialState = {
  access_token: '',
  auth_token: '',
  code: ''
};

export default function authState(state = initialState, action = {}) {
  switch (action.type) {
    case types.ACCESS_TOKEN_LOADED:
      return {
        ...state,
        access_token: action.access_token
      };
    case types.AUTH_TOKEN_LOADED:
      return {
        ...state,
        auth_token: action.auth_token
      };
    case types.CODE_LOADED:
      return {
        ...state,
        code: action.code
      };
    default:
      return state;
  }
}
