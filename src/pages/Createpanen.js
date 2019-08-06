import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Create_Panen from '../components/Create_Panen';
import { Actions } from 'react-native-router-flux';

export default class Createpanen extends Component<{}> {
  render(){
    return(
      <View style={styles.container}>
        <Create_Panen/>
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
