'use strict';

import React from 'react';
import { Scene, Actions } from 'react-native-router-flux'
import FirstScreen from './containers/first_screen';
import MainScreen from './containers/main_screen';
import KycScreen from './containers/kyc_screen';
import RegisterScreen from './containers/register_screen';
import DetailsScreen from './containers/details_screen';
import realm from './realm';

function is_never_loggedin() {
  if((realm.objectForPrimaryKey('ConfigData', 'oauth2_token').value === '')) {
    return true;
  }
  else {
    return false;
  }
}


/* To many type=resets */
const scenes = Actions.create(
  <Scene key="root">
  <Scene key="againroot">
    <Scene key="firstRun" initial={is_never_loggedin()}>
      <Scene key="firstScreen" component={FirstScreen} initial={true} hideNavBar={true} />
    </Scene>
    <Scene key="mainScreen" initial={!is_never_loggedin()} component={MainScreen} hideNavBar={true} type="reset"/>
    <Scene key="kycScreen" component={KycScreen} hideNavBar={true} type="reset"/>
    <Scene key="registerScreen" component={RegisterScreen} hideNavBar={true} type="reset"/>
    <Scene key="detailsScreen" component={DetailsScreen} hideNavBar={true} type="reset"/>
  </Scene>
  </Scene>
);

export default scenes;