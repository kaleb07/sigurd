import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Prospecting_list from '../components/Prospecting_list';
import {Actions} from 'react-native-router-flux';

export default class Prospectinglist extends Component<{}> {
  render(){
    return(
      <View style={styles.container}>
        <Prospecting_list/>
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
