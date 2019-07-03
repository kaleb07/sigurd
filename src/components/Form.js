import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import { SearchBar } from 'react-native-elements';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {Dropdown} from 'react-native-material-dropdown';

var items = [
  {id: 1, name: 'Cabe Merah'},
  {id: 2, name: 'Cabe Hijau'},
  {id: 3, name: 'Cabe Rawit'},
  {id: 4, name: 'Durian'},
];

var kegiatan = [
  {id: 1, name: 'Prospecting'},
  {id: 2, name: 'Konsultasi'},
  {id: 3, name: 'Monitor Lapangan'},
  {id: 4, name: 'Tanam Perdana'},
  {id: 5, name: 'Panen'},
  {id: 6, name: 'Lainnya'},
];

export default class Form extends Component{
  // state = {
  //   search: '',
  // };
  //
  // updateSearch = search => {
  //   this.setState({ search });
  // };
  constructor() {
    super();
    this.state = {
      serverData: [],
      //Data Source for the SearchableDropdown
    };
  }

  componentDidMount() {
  fetch('https://aboutreact.com/demo/demosearchables.php')
    .then(response => response.json())
    .then(responseJson => {
      //Successful response from the API Call
      this.setState({
        serverData: [...this.state.serverData, ...responseJson.results],
        //adding the new data in Data Source of the SearchableDropdown
      });
    })
    .catch(error => {
      console.error(error);
    });
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

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
      </Text>
      <Dropdown style={styles.dropdown} label= 'Kegiatan' data={data}/>
      <Text style={styles.kegiatan}>
      </Text>

      <Text style={styles.text}>
        <Text>Deskripsi Kegiatan</Text>
      </Text>
      <TextInput style={styles.inputBox}/>

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

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Browse</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonbox}>
        <Text style={styles.buttonText}>Simpan</Text>
      </TouchableOpacity>
    </View>
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
  width:350,
  borderRadius:5,
  borderWidth: 1,
  borderColor: '#000000',
  //borderRadius: 25,
  //paddingHorizontal:16,
  fontSize:16,
  color:'#000000',
  marginVertical: 10

}});
