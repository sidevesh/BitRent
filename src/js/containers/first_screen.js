'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { callFirstScreenEmailEdited,
         callFirstScreenPasswordEdited,
         callFirstScreenPurged,
         callAccessTokenLoad,
         callSignUp,
         callSignIn,
         callFirstScreenChangePage } from '../actions';

class FirstScreenComponent extends Component {

  componentDidMount() {
    this.props.loadAccessToken();
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.access_token !== '' && this.props.current_page === 'tabs' &&
          <View style={styles.tab_container}>
            <Button title="Sign In" color='green' onPress={()=>{this.props.changePage('in')}} />
            <Button title="Sign Up" color='blue' onPress={()=>{this.props.changePage('up')}} />
          </View>
        }
        {this.props.access_token !== '' && this.props.current_page !== 'tabs' &&
          <View style={styles.form_container}>
            <Text style={styles.title_text}>{'Sign '+this.props.current_page}</Text>
            <TextInput
              style={{height: 60, fontSize: 30, width:300}}
              onChangeText={(text) => this.props.emailEdit(text)}
              value={this.props.field_email}
              maxLength={40}
              placeholder="Enter e-mail here"
            />
            <TextInput
              style={{height: 60, fontSize: 30, width:300}}
              onChangeText={(text) => this.props.passwordEdit(text)}
              value={this.props.field_password}
              placeholder="Enter password here"
              secureTextEntry={true}
            />
            <View style={styles.buttons_box}>
              <Button title="Back" color='green' onPress={()=>{this.props.changePage('tabs')}} />
              <Button
                title={'Sign '+this.props.current_page}
                color='blue'
                onPress={()=>{
                  if(this.props.current_page === 'up') {
                    this.props.signUp();
                  }
                  else {
                    this.props.signIn();
                  }
                }}
              />
            </View>
          </View>
        }
        {this.props.access_token === '' &&
          <Text>loading</Text>
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
  form_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tab_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  buttons_box: {
    flexDirection: 'row'
  },
  title_text: {
    fontSize: 50
  }
});

const mapStateToProps = (state) => {
  return {
    field_email: state.firstScreenState.field_email,
    field_password: state.firstScreenState.field_password,
    current_page: state.firstScreenState.current_page,
    access_token: state.authState.access_token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadAccessToken: () => {
      dispatch(callAccessTokenLoad());
    },
    signUp: () => {
      dispatch(callSignUp());
    },
    signIn: () => {
      dispatch(callSignIn());
    },
    emailEdit: (email) => {
      dispatch(callFirstScreenEmailEdited(email));
    },
    passwordEdit: (password) => {
      dispatch(callFirstScreenPasswordEdited(password));
    },
    formPurge: () => {
      dispatch(callFirstScreenPurged());
    },
    changePage: (page) => {
      dispatch(callFirstScreenChangePage(page));
    }
  }
}

const FirstScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(FirstScreenComponent)

export default FirstScreen;