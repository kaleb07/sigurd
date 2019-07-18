import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Tanam_Perdana from '../components/Tanam_Perdana';
import { Actions } from 'react-native-router-flux';


export default class Tanamperdana extends Component<{}> {
  render(){
    return(
      <View style={styles.container}>
        <Tanam_Perdana/>
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
