import React, {Component} from 'react';
import {View,StyleSheet,TouchableOpacity,Text,ScrollView,ImageBackground,Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Actions} from 'react-native-router-flux';
import { responsiveWidth as wp, responsiveHeight as hp } from 'react-native-responsive-ui-views';


export default class Laporkan_Aktivitas extends Component <{}>{
  kegiatan() {
    Actions.kegiatan()
  }
  render(){
    return (
      <View style={styles.container}>
          <View style = {{backgroundColor:'#284586', height: hp(8)}}>
            <View style={styles.imageGroup}>
              <Image style={{ width: wp(10), height: hp(5), left:8, marginTop:3}}
                source={require('../images/logo1.png')}/>
              <Text style={styles.text1}>FO Activity</Text>
              <TouchableOpacity onPress={this.prospecting} style = {styles.button1}>
                <Text style={styles.close}>keluar</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ImageBackground source={require('../images/background.jpg')} style={{width: '100%', alignItems: 'center',height: '100%'}}>
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
    width: wp(70),
    backgroundColor: '#FFC400',
    borderRadius:5,
    paddingVertical: 16,
  },
  button1: {
    width: wp(20),
    height: hp(4),
    backgroundColor: '#FFC400',
    borderRadius:5,
    marginTop:8,
    right:16
  },
  text:{
    fontSize: hp(3),
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
    color:'#000000',
    fontSize: hp(2),
    textAlign:'center',
    marginTop:4
  },
  text1:{
    color:'#FFFFFF',
    fontSize: hp(3),
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
