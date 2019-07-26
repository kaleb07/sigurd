import React, {Component} from 'react';
import {View, StyleSheet,FlatList, TouchableOpacity, Text, ScrollView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Actions} from 'react-native-router-flux';
import { getActivityProspecting } from '../networking/server';
import DropDownItem from 'react-native-drop-down-item';

const IC_ARR_DOWN = require('../images/ic_arr_down.png');
const IC_ARR_UP = require('../images/ic_arr_up.png');


export default class List_data extends Component <{}>{
  constructor() {
    super();
    this.state = ({
      isLoading:true,
      contents: [
      {
        title: 'Title 1',
        body: 'Hi. I love this component. What do you think?',
      },
      {
        title: 'See this one too',
        body: 'Yes. You can have more items.',
      },
      {
        title: 'Thrid thing',
        body: 'What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text?',
      },
    ],
  } );
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
                  }
                >
                  <ScrollView>
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
                    <View style={styles.listButton}>
                      <TouchableOpacity>
                        <Text style={styles.next}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style = {styles.button}>
                          <Text style = {styles.buttonText}>Delete</Text>
                      </TouchableOpacity>
                  </View>
                  </ScrollView>
                </DropDownItem>
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
  },
  listButton:{
    flexDirection: 'row',
  },
  textInputWrapper: {
     flex:1,
     paddingRight: 30
   },
   textInputWrapper2: {
     right:110,
      flex:1,
    },
});
