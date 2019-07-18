import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Kategori_kegiatan from '../components/Kategori_kegiatan';
import { Actions } from 'react-native-router-flux';


export default class Kategorikegiatan extends Component<{}> {
  render(){
    return(
      <View style={styles.container}>
        <Kategori_kegiatan/>
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
