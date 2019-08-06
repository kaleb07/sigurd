import React, {Component} from 'react';
import {View,StyleSheet,TouchableOpacity,Text,ScrollView,ImageBackground,Image} from 'react-native';
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
          <View style = {{backgroundColor:'#284586', height:56}}>
            <View style={styles.imageGroup}>
              <Image style={{width:40, height:40, left:16}}
                source={require('../images/logo1.png')}/>
              <Text style={styles.text1}>FO Activity</Text>
              <TouchableOpacity onPress={this.prospecting}>
                <Text style={styles.close}>keluar</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ImageBackground   source={require('../images/background.jpg')} style={{width: '100%', alignItems: 'center',height: '100%'}}>
            <View style={styles.textGroup2}>
              <Text style={styles.text}>
                <Text>Selamat Bergabung</Text>
              </Text>
            <Text style={styles.text}>
                <Text>Kami Akan Membantu Anda Dalam</Text>
            </Text>
            <Text style={styles.text}>
                <Text>Melaporkan Aktivitas Yang Anda</Text>
            </Text>
            <Text style={styles.text}>
                <Text>Lakukan</Text>
            </Text>
          </View>
            <TouchableOpacity onPress={this.kegiatan} style = {styles.button}>
                <Text style = {styles.buttonText}> Laporkan Aktivitas </Text>
            </TouchableOpacity>
          </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#FFFFFF',
    flex: 1,
  },
  textGroup2:{
   marginVertical: 144,
  },
  button: {
    width: 248,
    backgroundColor: '#FFC400',
    borderRadius:5,
    paddingVertical: 16,
  },
  text:{
    fontSize: 20,
    color:'black',
    textAlign:'center',
    fontWeight: 'bold',
    fontFamily: 'work sans'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',

  },
  close:{
    backgroundColor:'#E6B000',
    color:'#000000',
    fontSize:16,
    padding:5,
    width: 80,
    height:35,
    textAlign:'center',
    borderRadius:5,
    marginTop: 3,
    right:16
  },
  text1:{
    color:'#FFFFFF',
    fontSize:20,
    padding:5,
    borderRadius:30,
    marginTop:3,
    fontWeight: 'bold',
    paddingRight:110
  },
  imageGroup:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding:8,
  }
});
