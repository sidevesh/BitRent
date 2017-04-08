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
  StatusBar
} from 'react-native';
import SubHeader from '../components/subheader';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import timeSince from '../helpers/time_since';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class KycScreenComponent extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>KYC</Text>
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
    //
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //
  }
}

const KycScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(KycScreenComponent)

export default KycScreen;