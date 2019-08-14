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

var items = [
  {id: 1, name: 'Cabe Merah'},
  {id: 2, name: 'Cabe Hijau'},
  {id: 3, name: 'Cabe Rawit'},
  {id: 4, name: 'Durian'},
];

let unit = [{
  value: 'ton',
  }, {
  value: 'kw',
  }, {
  value: 'kg',
}];

const options={
  title: 'Choose photo',
  takePhotoButtonTitle:'Take from my camera',
  chooseFromLibraryButtonTitle:'Take from my library',
  quality: 0.2,
}

export default class Create_Panen extends Component<{}>{
  kegiatan() {
    Actions.kegiatan()
  }

  laporkan_aktivitas() {
    Actions.laporkan_aktivitas()
  }
  success_page(){
    Actions.success_page()
  }

  constructor() {
    super();
    this.state = {
      isLoading:false,
      date:'',
      harvestQuantity: '',
      activityDesc:'',
      unitHarvest:'',
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

  insertToServer(activityName){
    const newActivity = {
      date: this.state.date,
      activityOption: 'Panen',
      activityDesc: this.state.activityDesc,
      project: 'abc',
      harvestQuantity: this.state.harvestQuantity + ' ' + this.state.unitHarvest,
      location: this.state.location,
      activityResult: this.state.activityResult,
      images:this.state.arr,
    };
    insertActivityToServer(activityName, newActivity).then((responseJson)=> {
      if(responseJson.err){
        Alert.alert(responseJson.err);
      }else{
        this.success_page();
      }
    })
    console.log(newActivity);
  }

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
    const now = new Date();
    const prevMonths = new Date(now.getFullYear(), now.getMonth() - 2, now.getDate());
    let arr = this.state.arr.map((r, index) => {
      return (
        <View key={ index }>
          <View style={styles.imageGroup}>
            <TouchableOpacity onPress={() => this.selectImage(r.index)}>
              <Image source={r.image !=='' ? r.image :
                require('../images/add.png')}
                style={{width:48, height:48,  marginRight:8,marginTop:8, paddingLeft:8}}/>
            </TouchableOpacity>
            <TextInput
              style={styles.inputBox2}
              value={r.caption}
              onChangeText={data => this.insertVal(data, r.index)}
            />
            <Icon name="trash"
               size={32}
               color="red"
               style={{ marginLeft: 'auto', marginTop:16, marginRight:8}}
               onPress={() => this.trashVal(r.index)}
            />
          </View>
        </View>
      );
    });

    return (
      <View style={styles.container}>
        <View style = {{backgroundColor:'#284586', height:56}}>
          <View style={styles.imageGroup5}>
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
            source={require('../images/panen.png')}/>
          <Text style={styles.text1}>
            <Text> Panen</Text>
          </Text>
        </View>
        <KeyboardAwareScrollView style={{paddingLeft:20, marginBottom:50}}>
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
                  borderColor: '#000000',
                  backgroundColor: '#F5F5F5',
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
            <Text>Jumlah Panen</Text>
          </Text>
          <View style={styles.textInputWrapper}>
            <TextInput style={styles.inputHarvest}
                      multiline={true}
                      onChangeText={(harvestQuantity) => this.setState({harvestQuantity})}
                      value={this.state.harvestQuantity}
                      keyboardType="numeric"
            />
            <Dropdown label=' '
                      containerStyle={{width:95, bottom: 16, left: 24}}
                      fontSize={16}
                      baseColor={"#000000"}
                      data={unit}
                      onChangeText={(unitHarvest) => this.setState({unitHarvest})}
                      value={this.state.unitHarvest}>
            </Dropdown>
          </View>

          <Text style={styles.text3}>
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
          <View style={{paddingBottom:32}}>
            <TouchableOpacity onPress={() => { this.insertSomeThing('')}}>
              <Icon name="plus-square" size={48} color="#284586"/>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.footer}>
          <View style={styles.imageGroup2}>
            <TouchableOpacity onPress={this.kegiatan} >
              <Text style={styles.cancel}>Batal</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { this.insertToServer('panen') }}>
              <Text style={styles.next}>Simpan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  };
};

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#FFFFFF',
    flex: 1,
  },
  textInputWrapper: {
    flexDirection: 'row',
   },
  text:{
    fontSize: 16,
    fontWeight: '400',
    color:'#000000',
    marginTop:8,
  },
  text1:{
    fontSize: 24,
    fontWeight: '400',
    color:'#000000',
    paddingRight:210,
    marginBottom:30,
    marginTop:30
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
 text3:{
   fontSize: 16,
   fontWeight: '400',
   color:'#000000',
   marginBottom:4
  },
  inputHarvest:{
    width:150,
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
  textgroup:{
    fontSize: 30,
    fontWeight: '400',
    color:'#000000',
    paddingLeft:60,
   marginBottom: 30,
  },
  dropdown:{
    width: 300,
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
    padding:8,
    width: 144,
    height:40,
    textAlign:'center',
    marginRight:48,
    borderRadius:5
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
    marginBottom:8,
    padding:8,
    width: 144,
    height:40,
    textAlign:'center',
    borderRadius:5
  },
  inputDropdown:{
    borderWidth: 0.5,
    borderRadius:5,
    width:350,
    borderColor: '#000000',
    backgroundColor: '#F5F5F5',
    marginVertical: 10,
  },
  itemDropdown: {
    padding: 15,
    marginTop: 2,
    backgroundColor: '#F5F5F5',
    borderColor: '#000000',
    borderWidth:0.5,
    borderRadius:5,
  },
  inputBox:{
    width:350,
    height:104,
    borderRadius:5,
    borderWidth: 0.5,
    borderColor: '#000000',
    backgroundColor: '#F5F5F5',
    fontSize:16,
    color:'#000000',
    marginVertical:8,
    textAlignVertical: 'top',
  },
  inputBox3:{
    width:350,
    height:48,
    borderRadius:5,
    borderWidth: 0.5,
    borderColor: '#000000',
    backgroundColor: '#F5F5F5',
    fontSize:16,
    color:'#000000',
    marginVertical: 5,
  },
  inputBox2:{
    width:256,
    height:48,
    borderRadius:5,
    borderWidth: 0.5,
    borderColor: '#000000',
    backgroundColor: '#F5F5F5',
    fontSize:16,
    color:'#000000',
    marginVertical:8
  },
  footer: {
    position: 'absolute',
    flex:0.1,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor:'#284586',
    height:56,
    alignItems:'center',
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
    right:16,
    marginTop:4
  },
  imageGroup5:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding:5,
    marginTop:3
 },
  imageGroup4:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft:280,
    borderRadius:5,
  },
});
