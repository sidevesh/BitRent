import * as types from '../constants/actionTypes';

const initialState = {
  json_str: ''
};

export default function mainScreenState(state = initialState, action = {}) {
  switch (action.type) {
    case types.MAIN_SCREEN_BTC_DETAILS:
      return {
        ...state,
        json_str: action.json_str
      };
    default:
      return state;
  }
}