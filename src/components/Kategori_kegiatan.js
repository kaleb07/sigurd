import React, {Component} from 'react';
import {View,StyleSheet,TouchableOpacity,Text,ScrollView,Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Actions} from 'react-native-router-flux';


export default class Kategori_kegiatan extends Component <{}>{
  register() {
    Actions.register()
  }
  create_prospecting(){
    Actions.create_prospecting()
  }
  monitor_lapangan(){
    Actions.monitor_lapangan()
  }
  tanam_perdana(){
    Actions.tanam_perdana()
  }
  create_panen(){
    Actions.create_panen()
  }
  create_lainnya(){
    Actions.create_lainnya()
  }

  render(){
    return (
      <View style={styles.container}>
      <ScrollView>
        <View style = {{backgroundColor:'#3700B3', height:50,}}>
        <View style={styles.imageGroup4}>
        <TouchableOpacity onPress={this.prospecting}>
          <Text style={styles.close}>keluar</Text>
        </TouchableOpacity>
        </View>
        </View>
          <Text style={styles.text}>
              <Text>Kategori Kegiatan</Text>
          </Text>
          <View style={styles.imageGroup}>
          <TouchableOpacity  onPress={this.create_prospecting}>
          <Image style={{width:70, height:70}}
            source={require('../images/prospecting.png')}/>
          </TouchableOpacity>
          <TouchableOpacity  onPress={this.register}>
              <Image style={{width:70, height:70}}
                source={require('../images/konsultasi.png')}/>
          </TouchableOpacity>
          </View>
          <View style={styles.textGroup}>
              <Text>Prospecting</Text>
              <Text>Konsultasi</Text>
          </View>
          <View style={styles.imageGroup}>
          <TouchableOpacity  onPress={this.monitor_lapangan}>
          <Image style={{width:70, height:70}}
            source={require('../images/monitoring.png')}/>
          </TouchableOpacity>
          <TouchableOpacity  onPress={this.tanam_perdana}>
          <Image style={{width:70, height:70}}
            source={require('../images/tanam.png')}/>
            </TouchableOpacity>
          </View>
          <View style={styles.textGroup2}>
              <Text>Monitor Lapangan</Text>
              <Text>Tanam Perdana</Text>
          </View>
          <View style={styles.imageGroup}>
            <TouchableOpacity  onPress={this.create_panen}>
            <Image style={{width:70, height:70}}
              source={require('../images/panen.png')}/>
            </TouchableOpacity>
            <TouchableOpacity  onPress={this.create_lainnya}>
            <Image style={{width:70, height:70}}
              source={require('../images/lainnya.png')}/>
            </TouchableOpacity>
          </View>
          <View style={styles.textGroup3}>
              <Text>Panen</Text>
              <Text>Lainnya</Text>
          </View>
        </ScrollView>
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
  backgroundColor:'#3700B3',
  flexDirection:'row',
  height:50,
  alignItems:'center',
  },

text:{
  fontSize: 25,
  fontWeight: '400',
  color:'#000000',
  marginTop:30,
  paddingLeft:20
  },
 imageGroup:{
   flexDirection: 'row',
   justifyContent: 'space-between',
   marginTop:40,
   paddingLeft:50,
   paddingRight:50,
},
textGroup:{
flexDirection: 'row',
 justifyContent: 'space-between',
 paddingLeft:46,
 paddingRight:50,
  marginTop: 20,
},
 textGroup2:{
   flexDirection: 'row',
   justifyContent: 'space-between',
   marginTop: 20,
   paddingLeft:28,
   paddingRight:37
 },
 textGroup3:{
   flexDirection: 'row',
   justifyContent: 'space-between',
   marginTop: 20,
   paddingLeft:65,
   paddingRight:60
 },
   close:{
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
   imageGroup4:{
     flexDirection: 'row',
     justifyContent: 'space-between',
     paddingLeft:280,
     borderRadius:5,
  }
});
