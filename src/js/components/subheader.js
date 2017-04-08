'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Platform,
  Text,
  View
} from 'react-native';

const SubHeader = ({text, color='rgba(255 ,255 ,255 , 0.87)'}) => {
  return (
    <View style={styles.subheader_view}>
      <View style={styles.subheader_text_view}>
        <Text style={{fontSize: 14, color: color, fontWeight: '600'}} >{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subheader_view: {
    height: 48,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  subheader_text_view: {
    flex: 1,
    height: 16,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
});

export default SubHeader;