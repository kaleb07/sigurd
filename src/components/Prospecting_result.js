import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Feather';
import { KeyboardAccessoryNavigation } from 'react-native-keyboard-accessory';
import { Button } from 'react-native-elements';

let index = 0;

export default class Form extends Component<{}> {
  constructor(){
    super();
    this.state = {
      arr: [],
      show: true,
    };
  };

  handleClick(value) {
    console.log(value);
    };

  removeItem(index) {
    const list = this.state.arr;
     list.splice(index, 1);
     this.setState({ list });

  };

  HideComponent(){
    if (this.state.show == true){
       this.setState(() => ({ show: false }));
    }
  };

  insertSomeThing( placeholder ){
    this.state.arr.push({index:index++, placeholder:placeholder, type:'textInput'});
    this.setState({ arr: this.state.arr });
  };


  render(){
    let arr = this.state.arr.map((r, index) => {

    return (

      <View key={ index } index = { index }>
      <View style={styles.small}>
         <View style={styles.textInputWrapper}>
            <Text style={styles.text}>
              <Text>Komoditas</Text>
            </Text>
            <TextInput style={styles.smallInputBox}/>
         </View>

         <View style={styles.textInputWrapper}>
            <Text style={styles.text}>
              <Text>Kapasitas</Text>
            </Text>
            <TextInput style={styles.smallInputBox} keyboardType="numeric"/>
          </View>

         <View style={styles.textInputWrapper}>
            <Text style={styles.text}>
              <Text>Harga</Text>
            </Text>
            <TextInput style={styles.smallInputBox} keyboardType="numeric"/>
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

    return(
      <KeyboardAwareScrollView>
          <View style={styles.container}>
            <Text style={styles.text}>
                <Text>Nama Ketua</Text>
            </Text>
            <TextInput style={styles.inputBox}/>

            <Text style={styles.text}>
                <Text>Nomor Telepon</Text>
            </Text>
            <TextInput style={styles.inputBox}/>

            <Text style={styles.text}>
              <Text>Kelompok Tani</Text>
            </Text>
            <TextInput style={styles.inputBox}/>

            <Text style={styles.text}>
              <Text>Jumlah Anggota</Text>
            </Text>
            <TextInput style={styles.inputBox}/>

            <Text style={styles.text}>
              <Text>Luas Lahan</Text>
            </Text>
            <TextInput style={styles.inputBox}/>

            <Text style={styles.text}>
              <Text>Lokasi</Text>
            </Text>
            <TextInput style={styles.inputBox}/>

            <Text style={styles.text}>
              <Text>Lama Bertani</Text>
            </Text>
            <TextInput style={styles.inputBox}/>

            <View style={styles.small}>
               <View style={styles.textInputWrapper}>
                  <Text style={styles.text}>
                    <Text>Komoditas</Text>
                  </Text>
                  <TextInput style={styles.smallInputBox}/>
               </View>

               <View style={styles.textInputWrapper}>
                  <Text style={styles.text}>
                    <Text>Kapasitas</Text>
                  </Text>
                  <TextInput style={styles.smallInputBox} keyboardType="numeric"/>
                </View>

               <View style={styles.textInputWrapper}>
                  <Text style={styles.text}>
                    <Text>Harga</Text>
                  </Text>
                  <TextInput style={styles.smallInputBox} keyboardType="numeric"/>
               </View>
                   <Icon
              				name="trash-2"
              				size={30}
              				color="red"
              				style={{ marginLeft: 'auto', marginTop: 40}}
              			/>
            </View>
          </View>
          <View>
          { arr }
           <TouchableOpacity
             onPress={ () => { this.insertSomeThing('add') }}
             style={styles.button}>
             <Text>Tambah Produk</Text>
           </TouchableOpacity>
         </View>
        </KeyboardAwareScrollView>
      );
  }};


var styles = StyleSheet.create({
  container:{
    backgroundColor:'#FFFFFF',
    flex: 1,
  },
  small:{
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height:55,
    width:120,
    backgroundColor: '#00bfff',
    marginVertical: 10,
    paddingVertical: 13,
  },
  inputBox:{
    width:350,
    borderRadius:5,
    borderWidth: 0.5,
    borderColor: '#000000',
    //borderRadius: 25,
    paddingVertical: 6,
    fontSize:16,
    color:'#000000',
    marginVertical: 5
  },
  smallInputBox:{
    flex: 1,
    width:97,
    borderRadius:5,
    borderWidth: 0.5,
    borderColor: '#000000',
    //borderRadius: 25,
    paddingVertical: 6,
    fontSize:16,
    color:'#000000',
    marginVertical: 5
  },
  textInputWrapper: {
     flex:1,
   },
   text:{
     fontSize: 16,
     fontWeight: '400',
     color:'#000000',
     marginTop: 10
   },
});
