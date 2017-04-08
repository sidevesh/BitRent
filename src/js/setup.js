'use strict';

import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { Router } from 'react-native-router-flux';
import scenes from './routes';
import configureStore from './store/store';
import { StatusBar, Platform } from 'react-native';
const store = configureStore();
const ConnectedRouter = connect()(Router);

const getSceneStyle = (/* NavigationSceneRendererProps  props, computedProps */) => {
  const style = {
    flex: 1,
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  return style;
};

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter scenes={scenes} getSceneStyle={getSceneStyle} />
      </Provider>
    );
  }
  componentDidMount() {
    //if(Platform.OS === 'ios') {
    //  StatusBar.setBarStyle('light-content', true);
    //}
    //else if(Platform.OS === 'android') {
    //  StatusBar.setBackgroundColor('#333330');
    //}
  }
}
