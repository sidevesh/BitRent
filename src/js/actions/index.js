'use strict';

import * as types from '../constants/actionTypes';
import realm from '../realm';
import {
  AlertIOS,
  ToastAndroid,
  Platform
} from 'react-native';
const client_id = 'QQQEB93VDO';
const client_secret = '0e7fa139-42cb-4500-9340-d52517590aa5';
import { Actions } from 'react-native-router-flux';
export const callUserDetailsAdded = (name_field, oauth2_token) => ({
  type: types.WORKER_DETAILS_ADDED,
  name_field: name_field,
  number_field: oauth2_token
})

/*============================================================*/

export const callMainScreenItemsLoading = () => ({
  type: types.MAIN_SCREEN_ITEMS_LOADING
})

export const callMainScreenItemsSuccess = (items) => ({
  type: types.MAIN_SCREEN_ITEMS_SUCCESS,
  items: items
})

export const callMainScreenItemsEmptySuccess = () => ({
  type: types.MAIN_SCREEN_ITEMS_EMPTY_SUCCESS
})

export const callMainScreenItemsError = () => ({
  type: types.MAIN_SCREEN_ITEMS_ERROR
})

export function callMainScreenItemsLoad() { /*missing const and es6 syntax*/
  return function (dispatch, getState) {
    dispatch(callMainScreenItemsLoading());
    return fetch(`http://just-dustbin.herokuapp.com/api/v1/dustbins`)
      .then(response => {
        if((response.status === 200)||(response.status === 400)||(response.status === 401)) {
          return response.json();
        }
      })
      .then((json) => {
        if(!json.hasOwnProperty('errors')) {
          dispatch(callMainScreenItemsSuccess(json.data));
        }
        else {
          if(json.errors[0]==="Empty.") {
            dispatch(callMainScreenItemsEmptySuccess());
          }
          else if(json.errors[0]==="Invalid token.") {
            dispatch(callMainScreenItemsError());
          }
          else {
            dispatch(callMainScreenItemsError());
          }
        }
      })
      .catch((error) => {dispatch(callMainScreenItemsError());});
  }
}

/*============================================================*/

export const callSetAccessToken = (acct) => ({
  type: types.ACCESS_TOKEN_LOADED,
  access_token: acct
})

export const callSetAuthToken = (acct) => ({
  type: types.AUTH_TOKEN_LOADED,
  auth_token: acct
})

export const callSetCode = (acct) => ({
  type: types.CODE_LOADED,
  code: acct
})

export function callAccessTokenLoad() { /*missing const and es6 syntax*/
  return function (dispatch, getState) {
    return fetch(`https://sandbox.unocoin.co/oauth/token`,
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'client_id': client_id,
          'client_secret': client_secret,
          'grant_type': 'client_credentials',
          'access_lifetime': 7500
        })
      }
    )
    .then(response => {
      if(response.status === 200) {
        return response.json();
      }
    })
    .then((json) => {
      console.log(json);
      dispatch(callSetAccessToken(json.access_token));
    })
    .catch((error) => {console.log(error);});
  }
}

export function callSignIn() { /*missing const and es6 syntax*/
  return function (dispatch, getState) {
    return fetch(`https://sandbox.unocoin.co/api/v1/authentication/signin`,
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ getState().authState.access_token
        },
        body: JSON.stringify({
          'email_id': getState().firstScreenState.email_field,
          'signinpassword': getState().firstScreenState.password_field,
          'response_type': 'code',
          'client_id': client_id,
          'redirect_uri': 'https://area51-cryptothon.herokuapp.com/',
          'scope': 'all',
          'signinsecpwd': '999999'
        })
      }
    )
    .then(response => {
      if(response.status === 200) {
        return response.json();
      }
    })
    .then((json) => {
      console.log(json);
      if(json.status_code === 200) {
        dispatch(callSetCode(json.code));
        Actions.mainScreen();
      }
    })
    .catch((error) => {console.log(error);});
  }
}

export function callSignUp() { /*missing const and es6 syntax*/
  return function (dispatch, getState) {
  console.log(JSON.stringify({
          'email_id': getState().firstScreenState.email_field,
          'password': getState().firstScreenState.password_field
        }));
    return fetch(`https://sandbox.unocoin.co/api/v1/authentication/signup`,
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ getState().authState.access_token
        },
        body: JSON.stringify({
          'email_id': getState().firstScreenState.email_field,
          'password': getState().firstScreenState.password_field
        })
      }
    )
    .then(response => {
      if(response.status === 200) {
        return response.json();
      }
    })
    .then((json) => {
      if(json.status_code === 200) {
        //dispatch(callFirstScreenPurged());
        dispatch(callFirstScreenChangePage('in'));
        if(Platform.OS === 'ios') {
          AlertIOS.alert('Click on verify email and then sign in to continue.');
        }
        else {
          ToastAndroid.show('Click on verify email and then sign in to continue.', ToastAndroid.SHORT);
        }
      }
      else {
        if(Platform.OS === 'ios') {
          AlertIOS.alert('Retry.');
        }
        else {
          ToastAndroid.show('Retry.', ToastAndroid.SHORT);
        }  
      }
      console.log(json);
    })
    .catch((error) => {console.log(error);});
  }
}

export function callAuthTokenLoad() { /*missing const and es6 syntax*/
  return function (dispatch, getState) {
    return fetch(`https://sandbox.unocoin.co/oauth/token`,
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'client_id': client_id,
          'client_secret': client_secret,
          'grant_type': 'authorization_code',
          'access_lifetime': 7500,
          'redirect_uri': 'https://area51-cryptothon.herokuapp.com/',
          'code': getState().authState.code
        })
      }
    )
    .then(response => {
      if(response.status === 200) {
        return response.json();
      }
    })
    .then((json) => {
      console.log(json);
      dispatch(callSetAuthToken(json.access_token));
    })
    .catch((error) => {console.log(error);});
  }
}

/*============================================================*/

export const callFirstScreenEmailEdited = (email) => ({
  type: types.FIRST_SCREEN_EMAIL_EDITED,
  email: email
})

export const callFirstScreenPasswordEdited = (password) => ({
  type: types.FIRST_SCREEN_PASSWORD_EDITED,
  password: password
})

export const callFirstScreenPurged = () => ({
  type: types.FIRST_SCREEN_PURGED
})

export const callFirstScreenChangePage = (page) => ({
  type: types.FIRST_SCREEN_CHANGE_PAGE,
  page: page
})

/*============================================================*/

export const callMainScreenBtcDetails = (json_str) => ({
  type: types.MAIN_SCREEN_BTC_DETAILS,
  json_str: json_str
})

export function callBtcAddressLoad() { /*missing const and es6 syntax*/
  return function (dispatch, getState) {
    return fetch(`https://sandbox.unocoin.co/api/v1/wallet/bitcoinaddress`,
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ getState().authState.auth_token
        }
      }
    )
    .then(response => {
      if(response.status === 200) {
        return response.json();
      }
    })
    .then((json) => {
      console.log(json);
      if(json.status_code === 200) {
        dispatch(callMainScreenBtcDetails(JSON.stringify(json)));
      }
      else if(json.bitcoinaddress === null) {
        if(Platform.OS === 'ios') {
          AlertIOS.alert('KYC.');
        }
        else {
          ToastAndroid.show('KYC.', ToastAndroid.SHORT);
        }
        Actions.kycScreen();
      }
    })
    .catch((error) => {console.log(error);});
  }
}