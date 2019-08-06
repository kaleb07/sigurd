import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Success_Page from '../components/Success_Page';
import { Actions } from 'react-native-router-flux';

export default class SuccessPage extends Component<{}> {
  render(){
    return(
      <View style={styles.container}>
        <Success_Page/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    backgroundColor:'#FFFFFF',
    flex: 1,
    justifyContent:'center',
  }
});
