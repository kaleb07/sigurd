import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity,Alert, Button, Image, Animated} from 'react-native';
import { SearchBar } from 'react-native-elements';
import SearchableDropdown from 'react-native-searchable-dropdown';
//import {Container, Header, Title, Content, Footer, FooterTab,Left, Right, Body, Icon,} from 'native-base';
import {Dropdown} from 'react-native-material-dropdown';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-datepicker';
// import { create } from '../data/api';
// import axios from 'axios';
import { insertActivityToServer } from '../networking/server';
//import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


var items = [
  {id: 1, name: 'Cabe Merah'},
  {id: 2, name: 'Cabe Hijau'},
  {id: 3, name: 'Cabe Rawit'},
  {id: 4, name: 'Durian'},
];

const options={
  title: 'my pic app',
  takePhotoButtonTitle:'Take photo your camera',
  chooseFromLibraryButtonTitle:'Choose photo from library',
}

export default class Form extends Component<{}>{
  kegiatan() {
    Actions.kegiatan()
  }
  constructor() {
    super();
    this.state = {
      isLoading:false,
      date:'',
      activityDesc:'',
      location:'',
      activityResult:'',
      arr: [{
        index:0,
        image:'',
        caption:''
      }]
    }
    this.selectImage = this.selectImage.bind(this);
  };

  removeItem(index) {
    const list = this.state.arr;
    const newList = list.filter(data => {
      return data.index !== index;
    })
     this.setState({ arr:newList });
  };

  insertSomeThing( placeholder ){
    const newIndex = this.state.arr[this.state.arr.length-1].index+1
    this.state.arr.push({
      index:newIndex,
      image:'',
      caption:''
      });
    this.setState({ arr: this.state.arr });
  };

  insertVal(data, index) {
    const list = this.state.arr;
    const newList = list.map(listData => {
      if(listData.index === index) {
        return {
          ...listData,
          caption: data,
        }
      }
      return listData
    })
    this.setState({ arr:newList });
  };

  selectImage(index){
      ImagePicker.showImagePicker(options, (response) => {
        const list = this.state.arr;

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          const source = { uri: response.uri };

          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          const newList = list.map(listData => {
            if(listData.index === index) {
              return {
                ...listData,
                image: source,
              }
            }
            return listData
            console.log('listdata = ', listData);
          })

          this.setState({ arr:newList });
      }});
    };

    clearVal() {
      const list = this.state.arr;
      const newList = list.map(data => {
        return {
          ...data,
          index:0,
          image:'',
          caption:''
        }
      })
      this.setState({ arr:newList });
   };

   trashVal(index){
     const list = this.state.arr;
     if (list.length === 1){
       this.clearVal();
     } else {
       this.removeItem(index);
     };
   }

render(){
  const  search  = this.state;
  let arr = this.state.arr.map((r, index) => {
      console.log('index',index);
    console.log('url',r.avatar);
    return (
      <View key={ index }>
        <View style={styles.imageGroup}>
            <TouchableOpacity onPress={() => this.selectImage(r.index)}>
            <Image source={r.image !=='' ? r.image :
              require('../images/add.png')}
              style={{width:50, height:50,  marginRight:10,marginTop:10, paddingLeft:10}}/>
            </TouchableOpacity>
            <TextInput
              style={styles.inputBox2}
              value={r.caption}
              onChangeText={data => this.insertVal(data, r.index)}
            />
            <Icon name="trash"
               size={30}
               color="red"
               style={{ marginLeft: 'auto', marginTop: 20, marginRight:5}}
               onPress={() => this.trashVal(r.index)}
            />
        </View>
      </View>
    );
  });

  return (
    <View style={styles.container}>
    <View style = {{backgroundColor:'#3700B3', height:50,}}>
    <View style={styles.imageGroup4}>
    <TouchableOpacity onPress={this.prospecting}>
      <Text style={styles.close}>keluar</Text>
    </TouchableOpacity>
    </View>
    </View>
    <View style={styles.imageGroup1}>
      <Image style={{width:60, height:60, marginTop:15}}
        source={require('../images/konsultasi.png')}/>
      <Text style={styles.text1}>
        <Text>Konsultasi</Text>
      </Text>
    </View>
      <KeyboardAwareScrollView style={{paddingLeft:20, marginBottom:50}}>
      <DatePicker
          style={{width: 350}}
          date={this.state.date} //initial date from state
          mode="date" //The enum of date, datetime and time
          placeholder="pilih tanggal"
          format="DD-MM-YYYY"
          minDate="01-01-2018"
          maxDate="01-01-2050"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              marginLeft: 0,
              width:50,
              height:50
            },
            dateInput: {
              marginLeft: 60,
              fontSize: 16,
              borderRadius:5,
              borderWidth: 1,
              borderColor: '#000000',
            }
          }}
          onDateChange={(date) => {this.setState({date: date})}}/>
          <Text style={styles.text}>
            <Text>Deskripsi Kegiatan</Text>
          </Text>
          <TextInput style={styles.inputBox}
                    multiline={true}
                    onChangeText={(activityDesc) => this.setState({activityDesc})}
                    value={this.state.activityDesc}
          />

          <Text style={styles.text}>
            <Text>Proyek</Text>
          </Text>
          <SearchableDropdown
              onTextChange={text => console.log(text)}
              onItemSelect={items => console.log(items)}
              containerStyle={{ padding: 1 }}
              textInputStyle={styles.inputDropdown}
              itemStyle={styles.itemDropdown}
              itemTextStyle={{ color: '#222' }}
              itemsContainerStyle={{ maxHeight: 140 }}
              items={items}
              defaultIndex={2}
              placeholder="Proyek"
              resetValue={false}
              underlineColorAndroid="transparent"
            />

          <Text style={styles.text}>
            <Text>Lokasi</Text>
          </Text>
          <TextInput style={styles.inputBox3}
                    onChangeText={(location) => this.setState({location})}
                    value={this.state.location}
          />
          <Text style={styles.text}>
            <Text>Hasil Kegiatan </Text>
          </Text>
          <TextInput style={styles.inputBox}
                    multiline={true}
                    onChangeText={(activityResult) => this.setState({activityResult})}
                    value={this.state.activityResult}
          />

          <Text style={styles.text}>
            <Text>Foto Kegiatan</Text>
          </Text>

          {arr}
          <TouchableOpacity style={styles.save} onPress={() => { this.insertSomeThing('')}}>
          <Icon name="plus"
          size={40} color="black"/>
          </TouchableOpacity>
      </KeyboardAwareScrollView>
      <View style={styles.footer}>
      <View style={styles.imageGroup2}>
          <TouchableOpacity onPress={this.kegiatan} >
            <Text style={styles.cancel}>Batal</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            const newActivity = {
              date: this.state.date,
              activityOption: 'Monitor Lapangan',
              activityDesc: this.state.activityDesc,
              project: 'abc',
              location: this.state.location,
              activityResult: this.state.activityResult,
              images:this.state.arr,
            };
            insertActivityToServer(newActivity);
          }}>
            <Text style={styles.next}>Simpan</Text>
          </TouchableOpacity>
      </View>
      </View>
    </View>
  )};
};

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#FFFFFF',
    //width: wp('100%'),
    //height: hp('95%'),
    flex: 1,
  },
  text:{
    fontSize: 16,
    fontWeight: '400',
    color:'#000000',
    // /paddingLeft:10,
    marginTop: 10,
  },
  text1:{
    fontSize: 25,
    fontWeight: '400',
    color:'#000000',
    paddingRight:165,
    marginBottom:30,
    marginTop:30
  },
  textgroup:{
    fontSize: 30,
    fontWeight: '400',
    color:'#000000',
    paddingLeft:60,
   marginBottom: 30,
  },
  dropdown:{
    // paddingVertical: 13,
    // width: 250,
    // paddingHorizontal:10,
    fontSize: 16,
    color:'#000000',
  },
  imageGroup:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight:20,
  },
  imageGroup2:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight:20,
    paddingLeft:20,
    marginTop:8,
  },
  imageGroup1:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight:20,
    paddingLeft:20
  },
  cancel:{
    backgroundColor:'#FFC400',
    color:'#000000',
    fontSize:16,
    padding:5,
    width: 150,
    height:35,
    textAlign:'center',
    marginRight:20,
    borderRadius:5,
  },
  save:{
    backgroundColor:'#FFC400',
    color:'#ffffff',
    fontSize:16,
    padding:5,
    marginBottom: 25,
    width: 50,
    height:50,
    borderRadius:8,
    alignItems:'center',
  },
  next:{
    backgroundColor:'#FFC400',
    color:'#000000',
    fontSize:16,
    marginBottom:10,
    padding:5,
    width: 150,
    height:35,
    textAlign:'center',
    borderRadius:5,
  },
  inputDropdown:{
    borderWidth: 1,
    borderRadius:5,
    width:350,
    borderColor: '#000000',
    backgroundColor: '#FFFFFF',
    marginVertical: 10,

  },
  itemDropdown: {
    padding: 15,
    marginTop: 2,
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius:5,
  },
  inputBox:{
    width:350,
    height:100,
    borderRadius:5,
    borderWidth: 0.5,
    borderColor: '#000000',
    //borderRadius: 25,
    paddingVertical: 6,
    fontSize:16,
    color:'#000000',
    marginVertical: 5,
    textAlignVertical: 'top',
  },
  inputBox3:{
    width:350,
    height:45,
    borderRadius:5,
    borderWidth: 0.5,
    borderColor: '#000000',
    //borderRadius: 25,
    paddingVertical: 6,
    fontSize:16,
    color:'#000000',
    marginVertical: 5,
  },
  inputBox2:{
    width:260,
    height:45,
    borderRadius:5,
    borderWidth: 0.5,
    borderColor: '#000000',
    //borderRadius: 25,
    paddingVertical: 6,
    fontSize:16,
    color:'#000000',
    marginVertical: 12
  },
  footer: {
    position: 'absolute',
    flex:0.1,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor:'#3700B3',
    height:50,
    alignItems:'center',
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

  },
});
