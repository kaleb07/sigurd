import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Laporkan_Aktivitas from '../components/Laporkan_Aktivitas';
import {Actions} from 'react-native-router-flux';

export default class Laporkanaktivitas extends Component<{}> {
render(){
return(
    <View style={styles.container}>
      <Laporkan_Aktivitas/>
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
