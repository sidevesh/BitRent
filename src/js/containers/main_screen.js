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
  TouchableHighlight,
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
          <View style={styles.main_cont}>
            <Text style={styles.tariff_text}>loading</Text>
          </View>
        }
        {this.props.auth_token !== '' &&
          <View style={styles.main_cont}>
            <Text style={styles.tariff_text}>{this.props.json_str!=='' ? 'BTC Balance: '+JSON.parse(this.props.json_str).btc_balance : '--'}</Text>
            <Text style={styles.tariff_text}>{this.props.json_str!=='' ? 'Rs Balance: '+JSON.parse(this.props.json_str).inr_balance : '--'}</Text>
            <Text style={styles.tariffs_text}>{this.props.json_str!=='' ? 'Buy: Rs '+JSON.parse(this.props.json_str).buybtc+'/BTC' : '--'}</Text>
            <Text style={styles.tariffs_text}>{this.props.json_str!=='' ? 'Sell: Rs '+JSON.parse(this.props.json_str).sellbtc+'/BTC' : '--'}</Text>
            <Text style={styles.tariffs_text}>{this.props.json_str!=='' ? 'ADDRESS: '+JSON.parse(this.props.json_str).bitcoinaddress : '--'}</Text>
            <View style={styles.butbox} >
              <TouchableHighlight onPress={()=>{clearInterval(this.intReg);Actions.registerScreen();}} style={styles.addButton} underlayColor='#ff7043'>
                <Icon name="qrcode-scan" size={60} color="#ffffff" />
              </TouchableHighlight>
            </View>
            <TouchableHighlight
              onPress={()=>{
                this.props.btcAddressLoad();
                this.intReg = setInterval(()=>{
                  this.props.btcAddressLoad();
                }, 3000);
              }}
              style={styles.addButtons}
              underlayColor='#ff7043'
            >
              <Icon name="refresh" size={30} color="#ffffff" />
            </TouchableHighlight>
          </View>
        }
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  main_cont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  name_text: {
    fontSize: 36,
    textAlign: 'center'
  },
  tariff_text: {
    fontSize: 24,
    textAlign: 'center'
  },
  tariffs_text: {
    fontSize: 16,
    textAlign: 'center'
  },
  addButton: {
    backgroundColor: '#ff5722',
    borderColor: '#ff5722',
    borderWidth: 1,
    height: 100,
    width: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  addButtons: {
    alignSelf: 'center',
    backgroundColor: '#ff5722',
    borderColor: '#ff5722',
    borderWidth: 1,
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  butbox: {
    flexDirection: 'row',
    justifyContent: 'space-around'
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