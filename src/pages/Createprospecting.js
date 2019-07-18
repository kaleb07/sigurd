import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Create_Prospecting from '../components/Create_Prospecting';
import { Actions } from 'react-native-router-flux';


export default class Createprospecting extends Component<{}> {
  render(){
    return(
      <View style={styles.container}>
        <Create_Prospecting/>
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
