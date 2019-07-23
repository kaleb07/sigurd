import React, {Component} from 'react';
import {View,StyleSheet,TouchableOpacity,Text,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Actions} from 'react-native-router-flux';


export default class Laporkan_Aktivitas extends Component <{}>{
  kegiatan() {
    Actions.kegiatan()
  }

  render(){
    return (
      <View style={styles.container}>
        <View style = {{backgroundColor:'#3700B3', height:50}}>
          <View style={styles.imageGroup}>
            <TouchableOpacity onPress={this.prospecting}>
              <Text style={styles.next}>keluar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={this.kegiatan} style = {styles.button}>
              <Text style = {styles.buttonText}> Laporkan Aktivitas </Text>
          </TouchableOpacity>
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
    backgroundColor:'#3700B3',
    height:50,
    justifyContent: 'center',
    alignItems:'center',
    //justifyContent: 'space-between',
  },
  button: {
    width: 200,
    backgroundColor: '#FFC400',
    borderRadius:5,
    marginVertical: 10,
    paddingVertical: 13,
    justifyContent: 'center',
    },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
  },
  next:{
    backgroundColor:'#E6B000',
    color:'#000000',
    fontSize:16,
    padding:5,
    width: 100,
    height:35,
    textAlign:'center',
    borderRadius:5,
    marginTop: 7
  },
  imageGroup:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft:280,
    borderRadius:5,
  }
});
