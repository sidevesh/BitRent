'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  TouchableHighlight
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


var isborder = false;
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
          <Image source={require('../../resources/main_back.jpg')} style={[styles.tab_container,this.border('yellow')]}>
            <View style={styles.img_container}>
            </View>
            <View style={styles.button_container}>
              <TouchableHighlight style={{flex:0.5}} onPress={()=>{this.props.changePage('in')}}>
                <View style={styles.butv2}>
                  <Text style={styles.butvtext}>SIGN IN</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight style={{flex:0.5}} onPress={()=>{this.props.changePage('up')}}>
                <View style={styles.butv1}>
                  <Text style={styles.butvtext}>SIGN UP</Text>
                </View>
              </TouchableHighlight>
            </View>
          </Image> 
        }
        {this.props.access_token !== '' && this.props.current_page !== 'tabs' &&
          <View style={styles.form_container}>
            <Text style={styles.title_text}>{'Sign '+this.props.current_page}</Text>
            <TextInput
              style={{height: 60, fontSize: 20, width:300}}
              onChangeText={(text) => this.props.emailEdit(text)}
              value={this.props.field_email}
              maxLength={40}
              placeholder="Enter e-mail here"
            />
            <TextInput
              style={{height: 60, fontSize: 20, width:300}}
              onChangeText={(text) => this.props.passwordEdit(text)}
              value={this.props.field_password}
              placeholder="Enter password here"
              secureTextEntry={true}
            />
            <View style={styles.buttons_box}>
              <Button title={'\t\t\tBACK\t\t\t'} style={{flex:1,justifyContent:'center'}} color='orange' onPress={()=>{this.props.changePage('tabs')}} />
              <Button
                title={'\t\t\t\t\tSIGN '+this.props.current_page+'\t\t\t\t\t'}
                style={{flux:2}}
                color='green'
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
          <View style={styles.form_container}>
            <Text style={styles.title_text}>loading...</Text>
          </View>
        }
      </View>
    );
  }

  border(color){
    return isborder?{
      borderWidth:2,
      borderColor: color
    }:{}
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
    alignContent:"center",
    alignItems: 'center'
  },
  img_container:{
    flex: 3
  },
  button_container:{
    flex: 0.4,
    flexDirection:'row',
    alignItems:"stretch"
  },
  butv1: {
    flex: 0.5,
    backgroundColor: '#FF9900'
  },
  butv2: {
    flex: 0.5,
    backgroundColor: 'orange'
  },
  butvtext: {
    fontWeight: '500',
    color: '#FFFFFF',
    fontSize: 26,
    textAlign: 'center'
  },
  tab_container: {
    flex: 1,
    width:'auto',
    justifyContent: 'center',
    alignContent:'center'
  },
  buttons_box: {
    flexDirection: 'row',
    alignItems : "stretch",
    justifyContent:"center",
    width:'auto',
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