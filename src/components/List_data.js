import React, {Component} from 'react';
import {View, StyleSheet,FlatList, TouchableOpacity, Text, ScrollView, Image, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Actions} from 'react-native-router-flux';
import { getActivityProspecting, deleteProspectingResult, sendIdFarmer } from '../networking/server';
import DropDownItem from 'react-native-drop-down-item';

const IC_ARR_DOWN = require('../images/ic_arr_down.png');
const IC_ARR_UP = require('../images/ic_arr_up.png');

export default class List_data extends Component <{}>{
  constructor() {
    super();
    this.state = ({
      isLoading:true,
    });
  }

  edit_prospecting() {
    Actions.edit_prospecting()
  }

  prospecting() {
    Actions.prospecting()
  }

  laporkan_aktivitas() {
    Actions.laporkan_aktivitas()
  }

  componentDidMount(){
    return ( getActivityProspecting().then((responseJson) => {
      this.setState({
        dataSource: responseJson,
        isLoading: false
      }, function(){ });
      console.log('ok', responseJson);
    }).catch((error)=> {
      console.log('Error : ', error);
    }))
  }

  deleteFarmer(id){
    return (
      deleteProspectingResult(id).then((responseJson) => {
        this.setState({
          isLoading:true
        })
    }).catch((error)=> {
      console.log('Error : ', error);
    })

  )}

  render(){
    if(this.state.isLoading){
      return(
        <View style={{flex:1, padding:20}}>
        <Image style={{width:250, height:200}}
          source={require('../images/logo.png')}/>
        </View>
      )
    } else {
      let activityProspecting = this.state.dataSource;
      let farmers = activityProspecting.farmer.map((val, key) => {
        return <DropDownItem
                  key={key}
                  style={styles.dropDownItem}
                  contentVisible={false}
                  invisibleImage={IC_ARR_DOWN}
                  visibleImage={IC_ARR_UP}
                  header={
                    <View>
                      <Text style={{
                        fontSize: 16,
                        color: 'blue',
                      }}>Nama ketua : {val.leaderName}</Text>
                    </View>
                  }>
                  <ScrollView>
                    <Text>Nomor Telepon : {val.phoneNumber}</Text>
                    <Text>Kelompok Tani : {val.groupFarmer}</Text>
                    <Text>Jumlah anggota : {val.numberOfMembers}</Text>
                    <Text>Luas Lahan : {val.landArea}</Text>
                    <Text>Lama Bertani : {val.longTimeFarming}</Text>
                    {val.product.map((vals, keys)=>
                       <View key={keys}>
                          <Text>Komoditas : {vals.commodity}</Text>
                          <Text>Kapasitas : {vals.capacity} {vals.unitCapacity}</Text>
                          <Text>Harga : {vals.price} {vals.unitPrice}</Text>
                       </View>
                    )}

                    <View style={styles.listButton}>
                      <TouchableOpacity style = {styles.button} onPress={() => {sendIdFarmer(val.id); this.edit_prospecting()}}>
                        <Text style={styles.buttonText}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style = {styles.button}
                          onPress={() => {this.deleteFarmer(val.id); this.componentDidMount()}}>
                          <Text style = {styles.buttonText}>Delete</Text>
                      </TouchableOpacity>
                  </View>
                </ScrollView>
              </DropDownItem>
            })

      let images = activityProspecting.images.map((val, key) => {
        return <View key={key}  style={{flex: 1, flexDirection: 'row'}}>
                  <View style={styles.textInputWrapper}>
                    <Text>Foto</Text>
                    <Text>Keterangan</Text>
                  </View>
                  <View style={styles.textInputWrapper3}>
                     <Text>:</Text>
                     <Text>:</Text>
                   </View>
                   <View style={styles.textInputWrapper2}>
                     <Image
                      source = {{uri: val.image.uri}}
                      style={{
                         height: 100,
                         width:100,
                         alignSelf: "stretch",
                         justifyContent: "center",
                         alignItems: "center"
                      }}
                      />
                      <Text>{val.caption}</Text>
                   </View>
               </View>
      });

    return (
      <View style={styles.container}>
        <View style = {{backgroundColor:'#284586', height:50}}>
          <View style={styles.imageGroup2}>
            <Image style={{width:40, height:40,left:16}}
            source={require('../images/logo1.png')}/>
            <Text style={styles.text2}>FO Activity</Text>
          <TouchableOpacity onPress={this.prospecting}>
            <Text style={styles.close}>keluar</Text>
          </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={styles.textInputWrapper}>
            <Text>Tanggal</Text>
            <Text>Deskripsi Kegiatan</Text>
            <Text>Lokasi</Text>
            <Text>Hasil Kegiatan</Text>
          </View>
          <View style={styles.textInputWrapper}>
            <Text>:</Text>
            <Text>:</Text>
            <Text>:</Text>
            <Text>:</Text>
          </View>
          <View style={styles.textInputWrapper2}>
            <Text>{activityProspecting.date} </Text>
            <Text>{activityProspecting.activityDesc} </Text>
            <Text>{activityProspecting.location} </Text>
            <Text>{activityProspecting.activityResult} </Text>
          </View>
        </View>
        {images}
        <Text> Data Petani </Text>
        <ScrollView>
          {farmers}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity onPress={this.prospecting}>
            <Text style={styles.next}>Tambah</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.laporkan_aktivitas}>
            <Text style={styles.next}>Selesai</Text>
          </TouchableOpacity>
        </View>
      </View>
    )};
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#FFFFFF',
    flex: 1,
    },
  footer: {
    flexDirection: 'row',
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
    width: 100,
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
  close:{
    backgroundColor:'#E6B000',
    color:'#000000',
    fontSize:16,
    padding:5,
    width: 80,
    height:35,
    textAlign:'center',
    borderRadius:30,
    marginTop: 3,
    right:16
  },
  next:{
    color:'#ffffff',
    fontSize:20,
    marginTop:8,
    padding:5,
    width:200,
    borderRadius:30,
    height:35,
    textAlign:'center',
    fontWeight: 'bold',
  },
 imageGroup2:{
   flexDirection: 'row',
   justifyContent: 'space-between',
   padding:5,
  },
  imageGroup:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft:280,
    borderRadius:5,
  },
  listButton:{
    flexDirection: 'row',
  },
  textInputWrapper: {
     flex:1,

   },
   textInputWrapper2: {
     right:110,
      flex:1,
    },
  text2:{
   color:'#FFFFFF',
   fontSize:20,
   padding:5,
   borderRadius:30,
   marginTop:3,
   fontWeight: 'bold',
   paddingRight:100
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
  }
});
