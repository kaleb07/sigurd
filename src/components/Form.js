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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


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
  constructor() {
    super();
    this.state = {
      date:'',
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
      });
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
  let data = [{
      value: 'Prospecting',
      }, {
      value: 'Konsultasi',
      }, {
      value: 'Monitor Lapangan',
      }, {
      value: 'Tanam Perdana',
      }, {
      value: 'Panen',
      }, {
      value: 'Lainnya',
  }];
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
              style={{width:50, height:50, margin:10}}
            />
            </TouchableOpacity>
            <TextInput
              style={styles.inputBox2}
              value={r.caption}
              onChangeText={data => this.insertVal(data, r.index)}
            />
            <Icon name="trash"
               size={30}
               color="red"
               style={{ marginLeft: 'auto', marginTop: 20, marginRight: 5}}
               onPress={() => this.trashVal(r.index)}
            />
        </View>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
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
          onDateChange={(date) => {this.setState({date: date})}}
        />
          <Dropdown style={styles.dropdown} label= 'Kegiatan' data={data}/>

          <Text style={styles.text}>
            <Text>Deskripsi Kegiatan</Text>
          </Text>
          <TextInput style={styles.inputBox}/>

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
          <TextInput style={styles.inputBox}/>

          <Text style={styles.text}>
            <Text>Hasil Kegiatan</Text>
          </Text>
          <TextInput style={styles.inputBox}/>

          <Text style={styles.text}>
            <Text>Foto Kegiatan</Text>
          </Text>

          {arr}
          <TouchableOpacity onPress={() => { this.insertSomeThing('')}}>
            <Text style={styles.save}>Tambah Gambar</Text>
          </TouchableOpacity>

          <View style={styles.imageGroup}>
              <TouchableOpacity>
                <Text style={styles.cancel}>Batal</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.prospecting}>
                <Text style={styles.next}>Selanjutnya</Text>
              </TouchableOpacity>
          </View>
      </KeyboardAwareScrollView>
    </View>
  )};
};

const styles = StyleSheet.create({
  container:{
    marginTop:35,
    marginBottom:35,
    backgroundColor:'#FFFFFF',
    width: wp('95%'),
    height: hp('95%'),
    flex: 1,
  },
  text:{
    fontSize: 16,
    fontWeight: '400',
    color:'#000000',
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
    justifyContent: 'space-between'
  },
  imageBox:{
    width: 50,
    height: 50,
    margin: 10
  },
  buttonImage: {
    width: "100%",
    marginVertical: 10
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
  save:{
    backgroundColor:'#00bfff',
    color:'#ffffff',
    fontSize:16,
    padding:5,
    marginBottom: 25,
    width: 350,
    height:35,
    textAlign:'center',
  },
  next:{
    backgroundColor:'#00bfff',
    color:'#ffffff',
    fontSize:16,
    marginBottom:10,
    padding:5,
    width: 150,
    height:35,
    textAlign:'center',
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
    height:45,
    borderRadius:5,
    borderWidth: 0.5,
    borderColor: '#000000',
    //borderRadius: 25,
    paddingVertical: 6,
    fontSize:16,
    color:'#000000',
    marginVertical: 5
  },
  inputBox2:{
    width:230,
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
});
