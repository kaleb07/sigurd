import React, {Component} from 'react';
import {View, StyleSheet,FlatList, TouchableOpacity, Text, ScrollView, Image, BackHandler} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getActivityProspecting, deleteProspectingResult, sendIdFarmer } from '../networking/server';
import DropDownItem from 'react-native-drop-down-item';
import { responsiveWidth as wp, responsiveHeight as hp } from 'react-native-responsive-ui-views';
import { signOut } from '../networking/server';

const IC_ARR_DOWN = require('../images/ic_arr_down.png');
const IC_ARR_UP = require('../images/ic_arr_up.png');

export default class List_data extends Component <{}>{
  constructor(props) {
    super(props);
    this.state = ({
      isLoading:true,
    });
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount(){
    return ( getActivityProspecting().then((responseJson) => {
      this.setState({
        dataSource: responseJson,
        isLoading:false
      });
    }).catch((error)=> {
      console.log('Error : ', error);
    }))
  }

  static navigationOptions = {
    header: null,
  };

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    return true;
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
   )
 }

  render(){
    if(this.state.isLoading){
      return(
        <View style={{flex:1, padding:100, marginTop:100,alignItems:'center'}}>
          <Image style={{width:150, height:150}}
            source={require('../images/logo.png')}/>
          <Text style={{fontSize: 30, color: '#aaaaaa', paddingTop: 15, fontWeight: 'bold'}}>Loading...</Text>
        </View>
      )
    } else {
      let activityProspecting = this.state.dataSource;
      let farmers = activityProspecting.farmer.map((val, key) => {
        return <DropDownItem
                  key={key}
                  style={{marginBottom: 16, backgroundColor: '#E0E0E0'}}
                  contentVisible={false}
                  invisibleImage={IC_ARR_DOWN}
                  visibleImage={IC_ARR_UP}
                  header={
                    <View>
                      <Text style={{
                        fontSize:18,
                        color: '#000000',backgroundColor:'#BDBDBD',padding:8
                      }}>Nama ketua : {val.leaderName}</Text>
                    </View>
                  }>
                    <View style={{flex:1,flexDirection: 'row'}}>
                      <View>
                        <Text style={styles.text3}>Nomor Telepon</Text>
                        <Text style={styles.text3}>Kelompok Tani</Text>
                        <Text style={styles.text3}>Jumlah anggota</Text>
                        <Text style={styles.text3}>Luas Lahan</Text>
                        <Text style={styles.text3}>Lama Bertani</Text>
                      </View>
                      <View style={styles.textInputWrapper4}>
                        <Text style={styles.text3}>:</Text>
                        <Text style={styles.text3}>:</Text>
                        <Text style={styles.text3}>:</Text>
                        <Text style={styles.text3}>:</Text>
                        <Text style={styles.text3}>:</Text>
                      </View>
                      <View style={styles.textInputWrapper5}>
                          <Text style={styles.text3}>{val.phoneNumber}</Text>
                          <Text style={styles.text3} numberOfLines={1}>{val.groupFarmer}</Text>
                          <Text style={styles.text3} numberOfLines={1}>{val.numberOfMembers} </Text>
                          <Text style={styles.text3} numberOfLines={1}>{val.landArea}</Text>
                          <Text style={styles.text3} numberOfLines={1}> {val.longTimeFarming}</Text>
                      </View>
                      </View>
                      <Text style={{color:'#000000',marginTop:16,fontSize:18,fontWeight: 'bold',}}>Daftar Produk</Text>
                      <View style={{flexDirection:'row'}}>
                          <Text style={styles.text5}>Komoditas</Text>
                          <Text style={styles.text5}>Kapasitas</Text>
                          <Text style={{  color:'#000000',fontSize:16,}}>Harga</Text>
                        </View>
                      {val.product.map((vals, keys)=>
                        <View  style={{flexDirection:'row'}} key={keys}>
                          <Text style={{flex:1,fontSize:14,color:'#000000'}}>{vals.commodity}</Text>
                          <Text style={{flex:1,left:45,fontSize:14,color:'#000000'}}>{vals.capacity} {vals.unitCapacity}</Text>
                          <Text style={{flex:2,left:90,fontSize:14,color:'#000000'}}>{vals.price}/{vals.unitPrice}</Text>
                        </View>
                     )}
                     <View style={styles.listButton}>
                       <Icon name="edit"
                          size={24}
                          color='#284586'
                       />
                       <TouchableOpacity style = {styles.button} onPress={() => { sendIdFarmer(val.id);
                         this.props.navigation.push('EditFarmer')}}>
                          <Text style = {styles.buttonText}>Edit</Text>
                       </TouchableOpacity>
                       <Icon name='trash'
                         size={24}
                         color='red'
                         style={{paddingLeft:20}}
                       />
                       <TouchableOpacity style = {styles.button}
                        onPress={() => {this.deleteFarmer(val.id); this.componentDidMount()}}>
                          <Text style = {styles.buttonText1}>Delete</Text>
                       </TouchableOpacity>
                    </View>
                </DropDownItem>
        })

      let images = activityProspecting.images.map((val, key) => {
        return <View key={key} style={{flexDirection: 'row', paddingTop:5}}>
                 <Image source = {{uri: val.url}} style={{height:60, width:55}}/>
                 <Text numberOfLines={3} style={{left:10, color:'#000000',fontSize:16}}>{val.caption}</Text>
               </View>
      });

      return (
        <View style={styles.container}>
          <View style = {{backgroundColor:'#284586', height: hp(8)}}>
            <View style={styles.imageGroup2}>
              <Image style={{width: wp(10), height: hp(5),left:8,marginTop:5}}
                source={require('../images/logo1.png')}/>
              <Text style={styles.text2}>FO Activity</Text>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style = {styles.button1}>
                <Text style={styles.close}>sign out</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.imageGroup1}>
            <Image style={{width: wp(18), height: hp(9), marginTop:16}}
              source={require('../images/prospecting.png')}/>
            <Text style={styles.text1}>Prospecting</Text>
          </View>
          <ScrollView style={{paddingRight:16}}>
            <View style={{flex:1,paddingBottom:20 ,flexDirection: 'row'}}>
              <View style={styles.textInputWrapper}>
                <Text style={{color:'#000000',fontSize:16}}>Tanggal</Text>
                <Text style={styles.text3}>Deskripsi Kegiatan</Text>
                <Text style={styles.text3}>Lokasi</Text>
                <Text style={styles.text3}>Hasil Kegiatan</Text>
                <Text style={{color:'#000000', paddingTop:15,fontSize:16}}>Foto kegiatan</Text>
                <View>{images}</View>
              </View>
                <View style={styles.textInputWrapper3}>
                  <Text style={styles.text3}>:</Text>
                  <Text style={styles.text3}>:</Text>
                  <Text style={styles.text3}>:</Text>
                  <Text style={styles.text3}>:</Text>
                </View>
              <View style={styles.textInputWrapper2}>
                <Text style={styles.text4}>{activityProspecting.date}</Text>
                <Text style={styles.text4} numberOfLines={3}>{activityProspecting.activityDesc}</Text>
                <Text style={styles.text4} numberOfLines={1}>{activityProspecting.location} </Text>
                <Text style={styles.text4} numberOfLines={1}>{activityProspecting.activityResult} </Text>
              </View>
            </View>
            <View style={styles.imageGroup3}>
              <Image style={{width: wp(10), height: hp(7),left:16}}
                source={require('../images/data.jpg')}/>
              <Text style={{right:24,marginTop:12,fontSize:20,color:'#000000' }}> Detail Data Petani </Text>
              <TouchableOpacity onPress={() => this.props.navigation.push('Farmer')}>
                <Text style={styles.tambah}>Tambah</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={{flex:1,alignSelf: 'stretch', paddingBottom:150,paddingLeft:16}}>
              <View style = {{marginTop:10,backgroundColor:'#FFFFFF'}}>
                {farmers}
              </View>
            </ScrollView>
          </ScrollView>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('SuccessPage')} style={styles.footer}>
            <Text style={styles.next}>Selesai</Text>
          </TouchableOpacity>
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
  },
  imageGroup1:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight:70,
    marginBottom:-5,
    paddingLeft:20
  },
  text1:{
    fontSize: 24,
    fontWeight: '400',
    color:'#000000',
    right:95,
    marginBottom:32,
    marginTop:32
  },
  text2:{
    color:'#FFFFFF',
    fontSize: hp(3),
    padding:5,
    borderRadius:30,
    marginTop:3,
    fontWeight: 'bold',
    paddingRight:100
  },
  text3:{
    color:'#000000',
    marginTop:5,
    fontSize:16,
  },
  text4:{
    color:'#000000',
    marginTop:5,
    fontSize:16,
  },
  text5:{
    color:'#000000',
    fontSize:16,
    paddingRight:35
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#284586',
    marginTop:2,
    paddingLeft:4
  },
  buttonText1: {
    fontSize: 16,
    fontWeight: '500',
    marginTop:2,
    paddingLeft:4,
    color:'red'
  },
  button1: {
    width: wp(20),
    height: hp(4),
    backgroundColor: '#FFC400',
    borderRadius:5,
    marginTop:8,
    right:16
  },
  close:{
    color:'#000000',
    fontSize: hp(2),
    textAlign:'center',
    marginTop:4
  },
  tambah:{
    backgroundColor:'#FFC400',
    color:'#000000',
    fontSize:16,
    padding:5,
    width: wp(20),
    height: hp(4.5),
    textAlign:'center',
    borderRadius:5,
    marginTop:10,
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
  imageGroup3:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageGroup:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft:280,
    borderRadius:5,
  },
  listButton:{
    flexDirection: 'row',
    paddingTop:20,
    left:170
  },
  textInputWrapper: {
     paddingRight: 8,
     paddingLeft:16
  },
  textInputWrapper2: {
     paddingRight: 16
  },
  textInputWrapper3: {
    paddingRight:10
  },
  textInputWrapper4: {
    paddingLeft:20
  },
  textInputWrapper5: {
    left:10
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
