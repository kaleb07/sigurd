import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity,Alert, Button, Image, Animated} from 'react-native';

export default class Error_Page extends Component<{}>{

  render(){
    return (
      <View style ={styles.container}>
      <Text> berhasil </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#FFFFFF',
    flex: 1,
  }})
