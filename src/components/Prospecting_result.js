import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity,Image} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAccessoryNavigation } from 'react-native-keyboard-accessory';
import { Button } from 'react-native-elements';
import { insertProspectingToServer } from '../networking/server';

let index = 0;

export default class Prospecting_Result extends Component<{}> {

  constructor(){
    super();
    this.state = {
      leaderName:'',
      phoneNumber:'',
      groupFarmer:'',
      numberOfMembers:'',
      landArea:'',
      longTimeFarming:'',
      arr: [{
        index:0,
        commodity:'',
        capacity:'',
        price:''}],
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
    const newIndex = this.state.arr[this.state.arr.length-1].index+1;
    this.state.arr.push({
      index:newIndex,
      commodity:'',
      capacity: '',
      price: '',
      type:'textInput'
    });
    this.setState({ arr: this.state.arr });
  };

  insertToServer(){
    const newProspecting = {
      leaderName: this.state.leaderName,
      phoneNumber: this.state.phoneNumber,
      groupFarmer: this.state.groupFarmer,
      numberOfMembers: this.state.numberOfMembers,
      landArea: this.state.landArea,
      longTimeFarming: this.state.longTimeFarming,
      product: this.state.arr,
    };
    console.log(newProspecting);
    insertProspectingToServer(newProspecting);

  }

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
      				name="trash"
      				size={30}
      				color="red"
      				style={{ marginLeft: 'auto', marginTop: 40,marginRight:20}}
      				onPress={() => this.trashVal(r.index)}
      			/>
           </View>
        </View>
      );
    });

    return(
      <View style={styles.container}>
      <View style = {{backgroundColor:'#3700B3', height:50}}>
      <View style={styles.imageGroup}>
      <Image style={{width:40, height:40,}}
        source={require('../images/logo1.png')}/>
        <Text style={styles.text2}>FO Activity</Text>
      <TouchableOpacity onPress={this.prospecting}>
        <Text style={styles.close}>keluar</Text>
      </TouchableOpacity>
      </View>
      </View>
        <View style={styles.imageGroup1}>
          <Image style={{width:60, height:60, marginTop:15}}
            source={require('../images/prospecting.png')}/>
          <Text style={styles.text1}>
            <Text>Prospecting</Text>
          </Text>
        </View>
        <KeyboardAwareScrollView style={{paddingLeft:20, marginBottom:50}}>
          <Text style={styles.text}>
              <Text>Nama Ketua</Text>
          </Text>
          <TextInput style={styles.inputBox}
                    onChangeText={(leaderName) => this.setState({leaderName})}
                    value={this.state.leaderName}
          />

          <Text style={styles.text}>
              <Text>Nomor Telepon</Text>
          </Text>
          <TextInput style={styles.inputBox}
                  onChangeText={(phoneNumber) => this.setState({phoneNumber})}
                  value={this.state.phoneNumber}
          />
          <Text style={styles.text}>
            <Text>Kelompok Tani</Text>
          </Text>
          <TextInput style={styles.inputBox}
                    onChangeText={(groupFarmer) => this.setState({groupFarmer})}
                    value={this.state.groupFarmer}
          />
          <Text style={styles.text}>
            <Text>Jumlah Anggota</Text>
          </Text>
          <TextInput style={styles.inputBox}
                  onChangeText={(numberOfMembers) => this.setState({numberOfMembers})}
                  value={this.state.numberOfMembers}
          />
          <Text style={styles.text}>
            <Text>Luas Lahan</Text>
          </Text>
          <TextInput style={styles.inputBox}
                  onChangeText={(landArea) => this.setState({landArea})}
                  value={this.state.landArea}
          />
          <Text style={styles.text}>
            <Text>Lama Bertani</Text>
          </Text>
          <TextInput style={styles.inputBox}
                  onChangeText={(longTimeFarming) => this.setState({longTimeFarming})}
                  value={this.state.longTimeFarming}
          />
         <View>
            { arr }
           <TouchableOpacity
             onPress={ () => { this.insertSomeThing() }}
             style={styles.button}>
             <Text>Tambah Produk</Text>
           </TouchableOpacity>
         </View>
        </KeyboardAwareScrollView>
        <View style={styles.footer}>
          <TouchableOpacity onPress={ () => { this.insertToServer() }}>
            <Text style={styles.next}>Selanjutnya</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

var styles = StyleSheet.create({
  container:{
    //marginTop:35,
    backgroundColor:'#FFFFFF',
    flex: 1,
  },
  small:{
    flex: 1,
    flexDirection: 'row',
  },
  text1:{
    fontSize: 25,
    fontWeight: '400',
    color:'#000000',
    paddingRight:150,
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
    paddingRight:130
  },
  imageGroup:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft:10,
    paddingRight:10,
    padding:5,
  },
  imageGroup1:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight:20,
    marginBottom:-5,
    paddingLeft:20
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height:55,
    width:120,
    backgroundColor: '#FFC400',
    marginVertical: 10,
    paddingVertical: 13,
    marginBottom:35,
    borderRadius:30,
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
   next:{
     backgroundColor:'#FFC400',
     color:'#000000',
     fontSize:16,
     marginTop:8,
     padding:5,
     width: 200,
     borderRadius:30,
     height:35,
     textAlign:'center',
 },
   text:{
     fontSize: 16,
     fontWeight: '400',
     color:'#000000',
     marginTop: 10
   },
   close:{
     backgroundColor:'#E6B000',
     color:'#000000',
     fontSize:16,
     padding:5,
     width: 100,
     height:35,
     textAlign:'center',
     borderRadius:30,
     marginTop: 3
     },
     imageGroup4:{
       flexDirection: 'row',
       justifyContent: 'space-between',
       paddingLeft:280,
       borderRadius:5,
   },
});
