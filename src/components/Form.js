import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Image, Animated} from 'react-native';
import { SearchBar } from 'react-native-elements';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {Dropdown} from 'react-native-material-dropdown';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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

export default class Form extends Component<Props>{
  // state = {
  //   search: '',
  // };
  //
  // updateSearch = search => {
  //   this.setState({ search });
  // };
  constructor(props) {
    super(props);
    this.state = {
       arr: [],
       avatar:null,
       pic:null
    }
    this.selectImage = this.selectImage.bind(this);
  };

  prospecting() {
    Actions.prospecting()
  };

  removeItem(index) {
    const list = this.state.arr;
     list.splice(index, 1);
     this.setState({ list });
  };

  insertSomeThing( placeholder ){
    this.state.arr.push({index:index++, placeholder:placeholder, type:'textInput'});
    this.setState({ arr: this.state.arr });
  };

  insertVal(data, index) {
    const list = this.state.arr;
    const newList = list.map(listData => {
      if(listData.index === index) {
        return {
          ...listData,
          placeholder: data,
        }
      }
      return listData
    })

    this.setState({ arr:newList });
  };

  selectImage(){
      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          const source = { uri: response.uri };

          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };

          this.setState({
            avatar: source,
            pic:response.data
          });
        }
      });
    };


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
    return (
      <View key={ index } index = { index }>
        <View style={styles.small}>
         <View style={styles.textInputWrapper}>
            <Text style={styles.text}>
              <Text>Komoditas</Text>
            </Text>
            <TextInput
              style={styles.smallInputBox}
              value={r.placeholder}
              onChangeText={data => this.insertVal(data, index)}
            />
         </View>

         <View style={styles.textInputWrapper}>
            <Text style={styles.text}>
              <Text>Kapasitas</Text>
            </Text>
            <TextInput
                style={styles.smallInputBox}
                onChangeText={data => this.insertVal(data, index)}
                keyboardType="numeric"/>
          </View>

         <View style={styles.textInputWrapper}>
            <Text style={styles.text}>
              <Text>Harga</Text>
            </Text>
            <TextInput
                style={styles.smallInputBox}
                onChangeText={data => this.insertVal(data, index)}
                keyboardType="numeric"/>
         </View>
         <Icon
            name="trash-2"
            size={30}
            color="red"
            style={{ marginLeft: 'auto', marginTop: 40}}
            onPress={() => this.removeItem(index)}
          />
         </View>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
          <Text style={styles.text}>Kegiatan</Text>
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
          <View style={styles.imageGroup}>
              <TouchableOpacity onPress={this.selectImage}>
              <Image source={this.state.avatar !=null ? this.state.avatar :
                require('../images/add.png')}
                style={{width:50, height:50, margin:10}}/>
              </TouchableOpacity>
              <TextInput style={styles.inputText}/>
              <Icon name="trash"
             size={40}
             color="red"
             style={{ marginLeft: 'auto', marginTop: 10}}/>
          </View>
          <View style={styles.imageGroup}>
              <TouchableOpacity>
                <Text style={styles.cancel}>Batal</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.prospecting}>
                <Text style={styles.save}>Selanjutnya</Text>
              </TouchableOpacity>
          </View>
      </KeyboardAwareScrollView>
    </View>
  )};
};

const styles = StyleSheet.create({
  container:{
    marginTop:30,
    backgroundColor:'#FFFFFF',
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
    width:360,
    borderRadius:5,
    borderWidth: 1,
    borderColor: '#000000',
    //borderRadius: 25,
    //paddingHorizontal:16,
    fontSize:16,
    color:'#000000',
    marginVertical: 10
  },
  inputText:{
    width:260,
    borderRadius:5,
    borderWidth: 1,
    borderColor: '#000000',
    //borderRadius: 25,
    //paddingHorizontal:16,
    fontSize:16,
    color:'#000000',
    marginVertical: 10,
    marginLeft:5
  }
});
