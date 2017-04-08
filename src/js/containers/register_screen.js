'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { callItemRead } from '../actions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class RegisterScreenComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null
    };
  }

  componentDidMount() {
    //
  }

  componentWillUnmount() {
    //
  }

  renderBottomContent() {
    if(Platform.OS === 'android') {
      return (
        <TouchableNativeFeedback
          onPress={()=>{Actions.mainScreen()}}
          background={TouchableNativeFeedback.SelectableBackground()}
        >
          <Icon name='backburger' size={30} color='green' />
        </TouchableNativeFeedback>
      );
    }
    else if(Platform.OS === 'ios') {
      return (
        <TouchableOpacity
          onPress={()=>{Actions.mainScreen()}}
        >
          <Icon name='backburger' size={30} color='green' />
        </TouchableOpacity>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <QRCodeScanner
          onRead={(e)=>{this.props.itemRead(e.data);}}
          style={styles.qrscanner}
          topContent={
            <View style={styles.topbottomContainer}>
              <Icon name="qrcode-scan" size={60} color="red" />
              <Text>Scan the QR code</Text>
            </View>
          }
          bottomContent={this.renderBottomContent()}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  waitcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  waitcontainertext: {
    fontWeight: '600'
  },
  topbottomContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  qrscanner: {
    height: 30
  }
});

const mapStateToProps = (state) => {
  return {
    //
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    itemRead: (product_id) => {
      dispatch(callItemRead(product_id));
      Actions.detailsScreen();
    }
  }
}

const RegisterScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterScreenComponent)

export default RegisterScreen;