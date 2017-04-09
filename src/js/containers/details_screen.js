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
  StatusBar,
  Button,
  BackAndroid
} from 'react-native';
import SubHeader from '../components/subheader';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import timeSince from '../helpers/time_since';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { callItemLoad, callItemAccept, callItemDeclined, callItemStop } from '../actions';

class DetailsScreenComponent extends Component {

  constructor(props) {
    super(props);
    this.state ={
      time_sec: 0,
      time_min: 0,
      time_hr: 0
    }
  }

  componentWillUnmount() {
    //clearInterval(this.intclk);
  }

  componentDidMount() {
    this.props.loadItemDetails(this.props.id);
  }

  formTime() {
    let ft = '';
    if(this.state.time_hr < 10) {
      ft=ft+'0'+this.state.time_hr;
    }
    else {
      ft=ft+this.state.time_hr;
    }
    ft=ft+':';
    if(this.state.time_min < 10) {
      ft=ft+'0'+this.state.time_min;
    }
    else {
      ft=ft+this.state.time_min;
    }
    ft=ft+':';
    if(this.state.time_sec < 10) {
      ft=ft+'0'+this.state.time_sec;
    }
    else {
      ft=ft+this.state.time_sec;
    }
    return ft;
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.name === '' && this.props.bill === null &&
          <View style={styles.main_cont}>
          <Text style={styles.tariff_text}>loading...</Text>
          </View>
        }
        {this.props.name !== '' && this.props.accepted === false &&
          <View style={styles.main_cont}>
            <Text style={styles.name_text}>{this.props.name}</Text>
            <Text style={styles.tariff_text}>{this.props.itype}</Text>
            <Text style={styles.tariff_text}>{this.props.tariff+" Satoshis/sec"}</Text>
            <View style={styles.butbox} >
              <TouchableHighlight
                onPress={()=>{
                  this.props.itemAccept(this.props.id);
                  this.intclk = setInterval(()=>{
                    if(this.state.time_sec === 59) {
                      this.setState({time_min: this.state.time_min+1});
                      this.setState({time_sec: 0});
                    }
                    else {
                      this.setState({time_sec: this.state.time_sec+1});
                    }
                    if(this.state.min_sec === 59) {
                      this.setState({time_hr: this.state.time_hr+1});
                      this.setState({time_min: 0});
                    }
                  } ,1000);
                }}
                style={styles.addButton}
                underlayColor='#ff7043'
              >
                <Icon name="done" size={60} color="#ffffff" />
              </TouchableHighlight>
              <TouchableHighlight onPress={()=>{this.props.itemDecline();Actions.registerScreen();}} style={styles.addButton} underlayColor='#ff7043'>
                <Icon name="clear" size={60} color="#ffffff" />
              </TouchableHighlight>
            </View>
          </View>
        }
        {this.props.name !== '' && this.props.accepted === true &&
          <View style={styles.main_cont}>
            <Text style={styles.name_text}>{this.props.name}</Text>
            <Text style={styles.tariff_text}>{this.formTime()}</Text>
            <View style={styles.butbox} >
              <TouchableHighlight onPress={()=>{this.props.itemStop(this.props.id);clearInterval(this.intclk);}} style={styles.addButton} underlayColor='#ff7043'>
                <Icon name="clear" size={60} color="#ffffff" />
              </TouchableHighlight>
            </View>
          </View>
        }
        {this.props.bill !== null && 
          <View style={styles.main_cont}>
            <Text style={styles.tariff_text}>Billing Done!</Text>
            <Text style={styles.name_text}>{this.props.bill+ ' Satoshis'}</Text>
            <View style={styles.butbox} >
              <TouchableHighlight onPress={()=>{BackAndroid.exitApp()}} style={styles.addButton} underlayColor='#ff7043'>
                <Icon name="exit-to-app" size={60} color="#ffffff" />
              </TouchableHighlight>
            </View>
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
  butbox: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

const mapStateToProps = (state) => {
  return {
    id: state.itemState.id,
    name: state.itemState.name,
    tariff: state.itemState.tariff,
    itype: state.itemState.itype,
    accepted: state.itemState.accepted,
    time: state.itemState.time,
    bill: state.itemState.bill
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadItemDetails: (product_id) => {
      dispatch(callItemLoad(product_id));
    },
    itemAccept: (product_id) => {
      dispatch(callItemAccept(product_id));
    },
    itemDecline: () => {
      dispatch(callItemDeclined());
    },
    itemStop: (product_id) => {
      dispatch(callItemStop(product_id));
    }
  }
}

const DetailsScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailsScreenComponent)

export default DetailsScreen;