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
import timeSince from '../helpers/time_since';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { callItemLoad, callItemAccept, callItemDeclined, callItemStop } from '../actions';

class DetailsScreenComponent extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadItemDetails(this.props.id);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.name === '' &&
          <Text>loading item details</Text>
        }
        {this.props.name !== '' && this.props.accepted === false &&
          <View>
            <Text>{this.props.name}</Text>
            <Text>{this.props.tariff}</Text>
            <Text>{this.props.itype}</Text>
            <Button onPress={()=>{this.props.itemAccept(this.props.id)}} title="Accept" />
            <Button onPress={()=>{this.props.itemDecline()}} title="Decline" />
          </View>
        }
        {this.props.name !== '' && this.props.accepted === true &&
          <View>
            <Text>{this.props.time}</Text>
            <Button onPress={()=>{this.props.itemStop(this.props.id)}} title="Decline" />
          </View>
        }
        {this.props.bill !== null &&
          <View>
            <Text>{this.props.bill}</Text>
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