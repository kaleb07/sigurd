import React, {Component} from 'react';
import {View, StyleSheet,FlatList, TouchableOpacity, Text, ScrollView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Actions} from 'react-native-router-flux';

export default class Success_Page extends Component <{}>{
  laporkan_aktivitas() {
    Actions.laporkan_aktivitas()
  }

  render(){
    return (
      <View style={styles.container}>
        <View style = {{backgroundColor:'#284586', height:56}}>
          <View style={styles.imageGroup1}>
            <Image style={{width:40, height:40,left:16}}
              source={require('../images/logo1.png')}/>
            <Text style={styles.text1}>FO Activity</Text>
            <TouchableOpacity onPress={this.prospecting}>
              <Text style={styles.close}>keluar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.logo}>
          <Icon name='check'
            size={80}
            color='#284586'
            style={{paddingLeft:100}}
          />
          <Text style={styles.text}>
              <Text>Sukses</Text>
          </Text>
          <TouchableOpacity style={{paddingTop: 50, paddingLeft:95}} onPress={this.laporkan_aktivitas} >
            <Text style={styles.cancel}>Tutup</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#FFFFFF',
    flex: 1,
  },
  footer: {
    position: 'absolute',
    flex:0.1,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor:'#284586',
    height:56,
    alignItems:'center'
  },
  close:{
    backgroundColor:'#E6B000',
    color:'#000000',
    fontSize:16,
    padding:4,
    width: 80,
    height:32,
    textAlign:'center',
    borderRadius:5,
    marginTop:2,
    right:16
  },
  text:{
    fontSize:32,
    color:'#000000',
    textAlign:'center',
    paddingTop: 10,
    left:45,
    fontWeight: 'bold',
  },
  logo: {
    width:300,
    alignItems: 'center',
    marginVertical:210,

  },
  text1:{
    color:'#FFFFFF',
    fontSize:20,
    padding:5,
    borderRadius:30,
    marginTop:3,
    fontWeight: 'bold',
    paddingRight:100
  },
  imageGroup1:{
   flexDirection: 'row',
   justifyContent: 'space-between',
   paddingLeft:10,
   paddingRight:10,
   padding:8,
  },
  cancel:{
   backgroundColor:'#FFC400',
   color:'#000000',
   fontSize:16,
   padding:8,
   width: 200,
   height:40,
   textAlign:'center',
   borderRadius:5
  }
});
