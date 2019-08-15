import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Error_Page from '../components/Error_Page';
import {Actions} from 'react-native-router-flux';

export default class Errorpage extends Component<{}> {
  render(){
    return(
        <View style={styles.container}>
          <Error_Page/>
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
