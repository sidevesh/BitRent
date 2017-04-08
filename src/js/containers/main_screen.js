'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ProgressBarAndroid,
  ProgressViewIOS,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  StatusBar,
  Button
} from 'react-native';
import SubHeader from '../components/subheader';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { callAuthTokenLoad, callBtcAddressLoad } from '../actions';
import timeSince from '../helpers/time_since';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class MainScreenComponent extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadAuthToken();
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.auth_token === '' &&
          <Text>loading</Text>
        }
        {this.props.auth_token !== '' &&
          <Text>Loaded</Text>
        }
        <Button onPress={()=>{this.props.btcAddressLoad()}} title="GO" />
        <Text>{this.props.json_str}</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  }
});

const mapStateToProps = (state) => {
  return {
    json_str: state.mainScreenState.json_str
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadAuthToken: () => {
      dispatch(callAuthTokenLoad());
    },
    btcAddressLoad: () => {
      dispatch(callBtcAddressLoad());
    }
  }
}

const MainScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreenComponent)

export default MainScreen;