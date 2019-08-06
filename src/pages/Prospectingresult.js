import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Prospecting_result from '../components/Prospecting_result';
import { Actions } from 'react-native-router-flux';

export default class Prospectingresult extends Component<{}> {
  render(){
    return(
      <View style={styles.container}>
        <Prospecting_result/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    backgroundColor:'#FFFFFF',
    flex: 1,
  }
});
