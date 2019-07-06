import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, Button, ScrollView, Image, Animated} from 'react-native';
import { SearchBar } from 'react-native-elements';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {Dropdown} from 'react-native-material-dropdown';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';

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
   this.state={
     avatar:null,
     pic:null,
     kegiatan:"kosong",
    }
    this.myfun = this.myfun.bind(this);
  };

  prospecting() {
    Actions.prospecting()
  };

  myfun(){
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

  return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.text}>
          {search.kegiatan}
          </Text>
          <Dropdown style={styles.dropdown} label= 'Kegiatan' data={data}/>
          <Text
            style={styles.kegiatan}
          >
          </Text>

          <Text style={styles.text}>
            <Text>Deskripsi Kegiatan</Text>
          </Text>
          <TextInput
          style={styles.inputBox}
          value={search.kegiatan}
          onChangeText={(text) => this.setState({kegiatan:text})}
          />

          <Text style={styles.proyek}>
            <Text>Proyek</Text>
          </Text>
          <SearchableDropdown
              onTextChange={text => console.log(text)}
              //On text change listner on the searchable input
              onItemSelect={items => alert(JSON.stringify(items))}
              //onItemSelect called after the selection from the dropdown
              containerStyle={{ padding: 1 }}
              //suggestion container style
              // <TextInput style={styles.inputBox}/>

              textInputStyle={{
                // inserted text style
                // padding: 10,
                borderWidth: 1,
                borderRadius:5,
                width:350,
                borderColor: '#000000',
                backgroundColor: '#FFFFFF',
                marginVertical: 10,
              }}
              itemStyle={{
                //single dropdown item style
                padding: 15,
                marginTop: 2,
                backgroundColor: '#FFFFFF',
                borderColor: '#000000',
                borderWidth: 1,
                borderRadius:5,
              }}
              itemTextStyle={{
                //single dropdown item's text style
                color: '#222',
              }}
              itemsContainerStyle={{
                //items container style you can pass maxHeight
                //to restrict the items dropdown hieght
                maxHeight: 140,
              }}
              items={items}
              //mapping of item array
              defaultIndex={2}
              //default selected item index
              placeholder="Proyek"
              //place holder for the search input
              resetValue={false}
              //reset textInput Value with true and false state
              underlineColorAndroid="transparent"
              //To remove the underline from the android input
            />

          <Text style={styles.lokasi}>
            <Text>Lokasi</Text>
          </Text>

          <TextInput style={styles.inputBox}/>
            <Text style={styles.hasil_kegiatan}>
            <Text>Hasil Kegiatan</Text>
          </Text>
          <TextInput style={styles.inputBox}/>
            <Text style={styles.foto_kegiatan}>
            <Text>Foto Kegiatan</Text>
          </Text>
          <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={this.myfun}>
              <Image source={this.state.avatar}
              style={{width:50, height:50, margin:10}}/>
            </TouchableOpacity>
            <TextInput style={styles.inputText}/>
              <Icon name="trash" size={50}color="#000000"/>
            </View>
            <View style={[{ width: "100%", marginVertical: 10 }]}>
          <Button onPress={this.myfun} title="pilih gambar" color="#a9a9a9"/>
          </View>
          <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
          <TouchableOpacity>
          <Text style={{
            backgroundColor:'#ff0000',
            color:'#ffffff',
            fontSize:16,
            padding:5,
            width: 150,
            height:35,
            textAlign:'center',
            marginRight:20
          }}>
          Batal
          </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.prospecting}>
          <Text style={{
            backgroundColor:'#00bfff',
            color:'#ffffff',
            fontSize:16,
            padding:5,
            width: 150,
            height:35,
            textAlign:'center',
          }}>
          Selanjutnya
          </Text>
          </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
  )
  }
}

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

  kegiatan:{
  fontSize: 16,
  fontWeight: '400',
  color:'#000000',
  },
  proyek:{
  fontSize: 16,
  fontWeight: '400',
  color:'#000000',
  },
  lokasi:{
  fontSize: 16,
  fontWeight: '400',
  color:'#000000'
  },
  hasil_kegiatan:{
  fontSize: 16,
  fontWeight: '400',
  color:'#000000',
  },
  foto_kegiatan:{
  fontSize: 16,
  fontWeight: '400',
  color:'#000000',
  },

  button: {
  width: 100,
  backgroundColor: '#a9a9a9',
  //borderRadius: 25,
  marginVertical: 10,
  paddingVertical: 13,
  },

  buttonbox: {
  width: 150,
  backgroundColor: '#00bfff',
  marginVertical: 10,
  paddingVertical: 13,
  alignItems:'center',
  justifyContent:'center',
  },

  buttonText:{
  fontSize: 16,
  fontWeight: '500',
  color:'#ffffff',
  textAlign:'center',
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
