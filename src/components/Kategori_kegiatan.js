import React, {Component} from 'react';
import {View, StyleSheet,FlatList, TouchableOpacity, Text, ScrollView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Actions} from 'react-native-router-flux';
import { getActivityOptionFromServer } from '../networking/server';
import { responsiveWidth as wp, responsiveHeight as hp } from 'react-native-responsive-ui-views';

export default class Kategori_kegiatan extends Component <{}>{
  constructor() {
    super();
    this.state = ({
      isLoading:true,
      dataSource:'',
      }
    );
  }

  componentDidMount(){
    return ( getActivityOptionFromServer().then((responseJson) => {
      this.setState({
        dataSource: responseJson,
        isLoading:false
      });
    }).catch((error)=> {
      console.log('Error : ', error);
    }))
  }

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
    if(this.state.isLoading){
      return(
        <View style={{flex:1, padding:100, marginTop:100,alignItems:'center'}}>
          <Image style={{width:150, height:150}}
            source={require('../images/logo.png')}/>
          <Text style={{fontSize: 30, color: '#AAAAAA', paddingTop: 15, fontWeight: 'bold'}}>Loading...</Text>
        </View>
      )
    } else {
      let activityOptions = this.state.dataSource.map((val, key) => {
        return <View key={key}>
                  <Text>{val.name}</Text>
               </View>
      });

      return (
        <View style={styles.container}>
          <View style = {{backgroundColor:'#284586', height: hp(8)}}>
            <View style={styles.imageGroup1}>
              <Image style={{width: wp(10), height: hp(5),left:8,marginTop:3}}
              source={require('../images/logo1.png')}/>
              <Text style={styles.text1}>FO Activity</Text>
              <TouchableOpacity onPress={this.prospecting} style = {styles.button1}>
                <Text style={styles.close}>keluar</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.text}>Kategori Kegiatan</Text>
          <View style={styles.imageGroup}>
            <TouchableOpacity  onPress={this.create_prospecting}>
              <Image style={{width: wp(20), height: hp(11)}}
                source={require('../images/prospecting.png')}/>
            </TouchableOpacity>
            <TouchableOpacity  onPress={this.register}>
              <Image style={{width: wp(20), height: hp(11)}}
                source={require('../images/konsultasi.png')}/>
            </TouchableOpacity>
          </View>
          <View style={styles.textGroup}>
            {activityOptions[0]}
            {activityOptions[1]}
          </View>
          <View style={styles.imageGroup}>
            <TouchableOpacity  onPress={this.monitor_lapangan}>
              <Image style={{width: wp(20), height: hp(11)}}
                source={require('../images/monitoring.png')}/>
            </TouchableOpacity>
            <TouchableOpacity  onPress={this.tanam_perdana}>
              <Image style={{width: wp(20), height: hp(11)}}
                source={require('../images/tanam.png')}/>
            </TouchableOpacity>
          </View>
          <View style={styles.textGroup2}>
            {activityOptions[5]}
            {activityOptions[2]}
          </View>
          <View style={styles.imageGroup}>
            <TouchableOpacity  onPress={this.create_panen}>
              <Image style={{width: wp(20), height: hp(11)}}
                source={require('../images/panen.png')}/>
            </TouchableOpacity>
            <TouchableOpacity  onPress={this.create_lainnya}>
              <Image style={{width: wp(20), height: hp(11)}}
                source={require('../images/lainnya.png')}/>
            </TouchableOpacity>
          </View>
          <View style={styles.textGroup3}>
            {activityOptions[4]}
            {activityOptions[3]}
        </View>
          <View style={styles.footer}>
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#FFFFFF',
    flex: 1,
  },
  footer: {
    position: 'absolute',
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor:'#284586',
    height:56,
    alignItems:'center'
  },
text:{
  fontSize: hp(4),
  fontWeight: '400',
  color:'#000000',
  marginTop:30,
  paddingLeft:30
},
text1:{
  color:'#FFFFFF',
  fontSize: hp(3),
  padding:5,
  borderRadius:30,
  marginTop:3,
  fontWeight: 'bold',
  paddingRight:100
},
imageGroup:{
   flexDirection: 'row',
   justifyContent: 'space-between',
   marginTop:40,
   paddingLeft:50,
   paddingRight:50,
 },
 imageGroup1:{
   flexDirection: 'row',
   justifyContent: 'space-between',
   paddingLeft:10,
   paddingRight:10,
   padding:8,
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
   paddingRight:60,
 },
 button1: {
   width: wp(20),
   height: hp(4),
   backgroundColor: '#FFC400',
   borderRadius:5,
   marginTop:6,
   right:16
 },
 close:{
   color:'#000000',
   fontSize: hp(2),
   textAlign:'center',
   marginTop:4
},
 imageGroup4:{
   flexDirection: 'row',
   justifyContent: 'space-between',
   paddingLeft:280,
   borderRadius:5,
  }
});
