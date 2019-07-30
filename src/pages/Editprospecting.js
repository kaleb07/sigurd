import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Edit_Prospecting_result from '../components/Edit_Prospecting_result';
import { Actions } from 'react-native-router-flux';


export default class Editprospecting extends Component<{}> {
  render(){
    return(
      <View style={styles.container}>
        <Edit_Prospecting_result/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    backgroundColor:'#FFFFFF',
    flex: 1,
    //alignItems:'center',
    //justifyContent:'center',
  }
});
