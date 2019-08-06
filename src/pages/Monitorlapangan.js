import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Monitor_Lapangan from '../components/Monitor_Lapangan';
import { Actions } from 'react-native-router-flux';

export default class Monitorlapangan extends Component<{}> {
  render(){
    return(
      <View style={styles.container}>
        <Monitor_Lapangan/>
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
