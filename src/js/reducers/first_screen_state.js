'use strict';

import * as types from '../constants/actionTypes';

const initialState = {
  email_field: '',
  password_field: '',
  current_page: 'tabs'
};

export default function firstScreenState(state = initialState, action = {}) {
  switch (action.type) {
    case types.FIRST_SCREEN_EMAIL_EDITED:
      return {
        ...state,
        email_field: action.email
      };
    case types.FIRST_SCREEN_PASSWORD_EDITED:
      return {
        ...state,
        password_field: action.password
      };
    case types.FIRST_SCREEN_PURGED:
      return {
        ...state,
        email_field: '',
        password_field: ''
      };
    case types.FIRST_SCREEN_CHANGE_PAGE:
      return {
        ...state,
        current_page: action.page
      };
    default:
      return state;
  }
}
