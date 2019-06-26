import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';

export default class Form extends Component<{}> {
  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });
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
const { search } = this.state;
return(
<View style={styles.container}>
<Text style={styles.text}>
<Text>Kegiatan</Text>
</Text>
<Dropdown style={styles.dropdown} label='Please Select' data={data}/>
<Text style={styles.kegiatan}>
<Text>Deskripsi Kegiatan</Text>
</Text>
<TextInput style={styles.inputBox}/>
<Text style={styles.proyek}>
<Text>Proyek</Text>
</Text>
<SearchBar
inputStyle={{backgroundColor: 'white'}}
containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5}}
placeholderTextColor={'#G5G5G5'}
placeholder={'Search'}
onChangeText={this.updateSearch}
value={search}/>
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
  backgroundColor:'#FFFFFF',
  flex: 1,
},
text:  {
fontSize: 16,
fontWeight: '400',
color:'#000000',
},
dropdown:{
width: 300,
//paddingHorizontal:10,
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
textAlign:'center'
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
