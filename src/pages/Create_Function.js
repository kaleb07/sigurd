import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Create_Activity from '../components/Create_Activity';
import {Actions} from 'react-native-router-flux';

export default class Create_Function extends Component<{}> {
  render(){
    return(
        <View style={styles.container}>
          <Create_Activity/>
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
