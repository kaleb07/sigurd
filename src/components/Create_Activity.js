import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {StyleSheet,Text,View,TouchableOpacity,Image,Header} from 'react-native';
import {Button} from 'native-base';

export default class Create_Activity extends Component < {} > {
  laporkan_aktivitas() {
    Actions.laporkan_aktivitas()
  }

  render(){
    return (
      <View style = {styles.container}>
            <View style={styles.logo}>
                <Image style={{width:40, height:70}}
                  source={require('../images/logo.jpg')}/>
            </View>
            <Text style={styles.text}>
                <Text>Selamat datang!! </Text>
            </Text>
            <Text style={styles.text}>
                <Text>Silahkan masuk melalui akun</Text>
            </Text>
              <Text style={styles.text}>
                <Text>anda</Text>
            </Text>
            <View style = {styles.button}>
                <TouchableOpacity>
                  <Button block warning onPress={this.laporkan_aktivitas}>
                    <Text>Masuk dengan google</Text>
                  </Button>
                </TouchableOpacity>
            </View>
          </View>
        )
      }
    }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text:{
    fontSize: 20,
    color:'black',
    textAlign:'center',
    fontWeight: 'bold',

  },
  button:{
    marginVertical: 40,
    width: 350,

  },
  logo: {
    width: 300,
    alignItems: 'center',
    marginVertical: 100,

  }
});
