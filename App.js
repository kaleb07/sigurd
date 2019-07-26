/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet,View, StatusBar} from 'react-native';
import Routes from './src/Routes';


export default class App extends Component<{}> {
render() {
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="navy"
        barStyle="light-content"
      />
      <Routes/>
    </View>
  );
  }
}

const styles = StyleSheet.create({
container : {
flex: 1,

}
});
