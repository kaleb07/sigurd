import React, {Component} from 'react';
import {View, StyleSheet,FlatList, TouchableOpacity, Text, ScrollView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Actions} from 'react-native-router-flux';
import { getActivityProspecting } from '../networking/server';


export default class List_data extends Component <{}>{
  constructor() {
    super();
    this.state = ({
      isLoading:true,
      }
    );
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
        isLoading:false
      }, function(){ });
      console.log('ok', responseJson);
    }).catch((error)=> {
      console.log('Error : ', error);
    }))
  }

  render(){
    if(this.state.isLoading){
      return(
        <View style={{flex:1, padding:20}}>
          <Image style={{width:70, height:70}}
            source={require('../images/tanam.png')}/>
        </View>
      )
    } else {
      let activityProspecting = this.state.dataSource;
      let farmers = activityProspecting.farmer.map((val, key) => {
        return <View key={key}>
                  <Text>Nama ketua : {val.leaderName}</Text>
                  <Text>Nomor Telepon : {val.phoneNumber}</Text>
                  <Text>Kelompok Tani : {val.groupFarmer}</Text>
                  <Text>Jumlah anggota : {val.numberOfMembers}</Text>
                  <Text>Luas Lahan : {val.landArea}</Text>
                  <Text>Lama Bertani : {val.longTimeFarming}</Text>
                  {val.product.map((vals, keys)=>
                     <View key={keys}>
                              <Text>Komoditas : {vals.commodity}</Text>
                              <Text>Kapasitas : {vals.capacity}</Text>
                              <Text>Harga : {vals.price}</Text>
                           </View>
                  )}
               </View>
            })
      let images = activityProspecting.images.map((val, key) => {
        return <View key={key}>
                  <Text>Foto : {val.image.uri}</Text>
                  <Text>Keterangan : {val.caption}</Text>
               </View>

      });

    return (
      <View style={styles.container}>
        <View style = {{backgroundColor:'#3700B3', height:50}}>
          <View style={styles.imageGroup}>
            <TouchableOpacity onPress={this.prospecting}>
              <Text style={styles.next}>keluar</Text>
            </TouchableOpacity>
          </View>
        </View>

          <View>
            <Text> Tanggal : {activityProspecting.date} </Text>
            <Text> Deskripsi Kegiatan : {activityProspecting.activityDesc} </Text>
            <Text> Lokasi : {activityProspecting.location} </Text>
            <Text> Hasil Kegiatan : {activityProspecting.activityResult} </Text>
            {images}

            <Text> Data Petani </Text>
            <ScrollView>
            {farmers}
            </ScrollView>
          </View>


        <View style={styles.footer}>
          <TouchableOpacity onPress={this.prospecting} >
            <Text style={styles.next}>Tambah</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.laporkan_aktivitas} style = {styles.button}>
              <Text style = {styles.buttonText}> Selesai </Text>
          </TouchableOpacity>
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
