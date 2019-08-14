import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity,Alert, Button, Image, Animated} from 'react-native';
import { SearchBar } from 'react-native-elements';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {Dropdown} from 'react-native-material-dropdown';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-datepicker';
import { insertActivityToServer } from '../networking/server';

const options={
  title: 'Choose photo',
  takePhotoButtonTitle:'Take from my camera',
  chooseFromLibraryButtonTitle:'Take from my library',
  quality: 0.2,
}

export default class Create_Prospecting extends Component<{}>{
  kegiatan() {
    Actions.kegiatan()
  }

  constructor() {
    super();
    this.state = {
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

  prospecting() {
    Actions.prospecting()
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
        const source = {
          uri: response.uri,
          type: response.type,
          fileName: response.fileName
         };
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

 insertToServer(activityName){
   const newActivity = {
     date: this.state.date,
     activityOption: 'Prospecting',
     activityDesc: this.state.activityDesc,
     location: this.state.location,
     activityResult: this.state.activityResult,
     images:this.state.arr,
   };
   insertActivityToServer(activityName, newActivity).then((responseJson)=> {
     if(responseJson.err){
       Alert.alert(responseJson.err);
     }else{
       this.prospecting();
     }
   })
   console.log(newActivity);
 }

 render(){
   const now = new Date();
   const prevMonths = new Date(now.getFullYear(), now.getMonth() - 2, now.getDate());
   let arr = this.state.arr.map((r, index) => {
    return (
      <View key={ index }>
        <View style={styles.imageGroup}>
          <TouchableOpacity onPress={() => this.selectImage(r.index)}>
            <Image source={r.image !=='' ? r.image :
              require('../images/add.png')}
              style={{width:48, height:48,marginRight:8,marginTop:10, paddingLeft:8}}/>
          </TouchableOpacity>
          <TextInput
            style={styles.inputBox2}
            value={r.caption}
            onChangeText={data => this.insertVal(data, r.index)}
          />
          <Icon name="trash"
             size={32}
             color="red"
             style={{ marginLeft: 'auto', marginTop: 20, marginRight:25}}
             onPress={() => this.trashVal(r.index)}
          />
        </View>
      </View>
    );
  });

    return (
      <View style={styles.container}>
        <View style = {{backgroundColor:'#284586', height:50}}>
          <View style={styles.imageGroup2}>
            <Image style={{width:40, height:40,left:8}}
              source={require('../images/logo1.png')}/>
            <Text style={styles.text2}>FO Activity</Text>
            <TouchableOpacity onPress={this.prospecting}>
              <Text style={styles.close}>keluar</Text>
            </TouchableOpacity>
        </View>
   </View>
        <View style={styles.imageGroup1}>
          <Image style={{width:64, height:64, marginTop:16}}
            source={require('../images/prospecting.png')}/>
          <Text style={styles.text1}>
            <Text> Prospecting</Text>
          </Text>
        </View>
        <KeyboardAwareScrollView style={{paddingLeft:20,}}>
          <DatePicker
              style={{width: 350}}
              date={this.state.date}
              mode="date"
              placeholder="pilih tanggal"
              format="DD-MM-YYYY"
              minDate={prevMonths}
              maxDate={now}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  marginLeft: 0,
                  width:48,
                  height:48
                },
                dateInput: {
                  marginLeft:56,
                  fontSize: 16,
                  borderRadius:5,
                  borderWidth: 0.5,
                  backgroundColor:'#F5F5F5',
                  borderColor: '#000000',
                }
              }}
              onDateChange={(date) => {this.setState({date: date})}}/>
          <Text style={styles.text}>
            <Text>Deskripsi Kegiatan </Text>
          </Text>
          <TextInput style={styles.inputBox}
                    multiline={true}
                    onChangeText={(activityDesc) => this.setState({activityDesc})}
                    value={this.state.activityDesc}
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
          <View style={{paddingBottom:80 }}>
            <TouchableOpacity onPress={() => { this.insertSomeThing('')}}>
              <Icon name="plus-square" size={48} color="#284586"/>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
        <TouchableOpacity onPress={()=>{this.insertToServer('prospecting')}} style={styles.footer}>
          <Text style={styles.next}>Selanjutnya</Text>
        </TouchableOpacity>
      </View>
    )
  };
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:'#FFFFFF',
  },
  text:{
    fontSize: 16,
    fontWeight: '400',
    color:'#000000',
    marginTop:8,

  },
 imageGroup2:{
   flexDirection: 'row',
   justifyContent: 'space-between',
   padding:5,
  },
  text1:{
    fontSize: 24,
    fontWeight: '400',
    color:'#000000',
    paddingRight:96,
    marginBottom:32,
    marginTop:32
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
  textgroup:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdown:{
    fontSize: 16,
    color:'#000000',
  },
  imageGroup:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageGroup1:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight:70,
    marginBottom:-5,
    paddingLeft:20
  },
  cancel:{
    backgroundColor:'#ff0000',
    color:'#ffffff',
    fontSize:16,
    padding:5,
    width: 150,
    height:35,
    textAlign:'center',
    marginRight:20
  },
  next:{
    flex:1,
    color:'#ffffff',
    fontSize:20,
    marginTop:8,
    padding:5,
    width:200,
    borderRadius:30,
    height:35,
    textAlign:'center',
    fontWeight: 'bold'
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
    backgroundColor:'#F5F5F5',
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
    backgroundColor:'#F5F5F5',
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
    backgroundColor:'#F5F5F5',
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
    backgroundColor:'#284586',
    height:56,
    alignItems:'center'
  },
  close:{
    backgroundColor:'#E6B000',
    color:'#000000',
    fontSize:16,
    padding:5,
    width: 80,
    height:32,
    textAlign:'center',
    borderRadius:5,
    marginTop:4,
    right:16
  },
  imageGroup4:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft:280,
    borderRadius:5,
  },
});
