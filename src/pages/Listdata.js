import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import List_data from '../components/List_data';
import { Actions } from 'react-native-router-flux';


export default class Listdata extends Component<{}> {
  render(){
    return(
      <View style={styles.container}>
        <List_data/>
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
