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
      arr: [{
        index:0,
        commodity:'',
        capacity:'',
        price:'',
        type:'textInput'}],
    };
  };

  removeItem(index) {
    const list = this.state.arr;
    const newList = list.filter(data => {
      return data.index !== index;
    })
     this.setState({ arr:newList });
  };

  insertSomeThing(){
    const newIndex = this.state.arr[this.state.arr.length-1].index+1
    this.state.arr.push({
      index:newIndex,
      commodity:'',
      capacity: '',
      price: '',
      type:'textInput'
    });
    this.setState({ arr: this.state.arr });
  };

  insertVal(data, index, key) {
    const list = this.state.arr;
    const newList = list.map(listData => {
      if(listData.index === index) {
        return {
          ...listData,
          [key]: data,
        }
      }
      return listData
    })
    this.setState({ arr:newList });
  };

  clearVal() {
    const list = this.state.arr;
    const newList = list.map(data => {
      return {
        ...data,
        index:0,
        commodity:'',
        capacity:'',
        price:'',
        type:'textInput'
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
    let arr = this.state.arr.map((r, index) => {
      console.log('r', r);
      return (
        <View key={ index }>
          <View style={styles.small}>
           <View style={styles.textInputWrapper}>
              <Text style={styles.text}>
                <Text>Komoditas</Text>
              </Text>
              <TextInput
                style={styles.smallInputBox}
                value={r.commodity}
                onChangeText={commodity => this.insertVal(commodity, r.index, 'commodity')}
              />
           </View>

           <View style={styles.textInputWrapper}>
              <Text style={styles.text}>
                <Text>Kapasitas</Text>
              </Text>
              <TextInput
                  style={styles.smallInputBox}
                  value={r.capacity}
                  onChangeText={capacity => this.insertVal(capacity, r.index, 'capacity')}
                  keyboardType="numeric"/>
            </View>

           <View style={styles.textInputWrapper}>
              <Text style={styles.text}>
                <Text>Harga</Text>
              </Text>
              <TextInput
                  style={styles.smallInputBox}
                  value={r.price}
                  onChangeText={price => this.insertVal(price, r.index, 'price')}
                  keyboardType="numeric"/>
           </View>
           <Icon
      				name="trash-2"
      				size={30}
      				color="red"
      				style={{ marginLeft: 'auto', marginTop: 40}}
      				onPress={() => this.trashVal(r.index)}
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


          </View>
          <View>
          { arr }
           <TouchableOpacity
             onPress={ () => { this.insertSomeThing() }}
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
