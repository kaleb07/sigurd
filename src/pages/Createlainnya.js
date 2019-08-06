import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Create_Lainnya from '../components/Create_Lainnya';
import { Actions } from 'react-native-router-flux';

export default class Createlainnya extends Component<{}> {
  render(){
    return(
      <View style={styles.container}>
        <Create_Lainnya/>
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
