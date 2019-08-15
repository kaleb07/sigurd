import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Alert, TouchableOpacity,Image} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAccessoryNavigation } from 'react-native-keyboard-accessory';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { Dropdown } from 'react-native-material-dropdown';
import { TextInputMask } from 'react-native-masked-text';
import { getProspecting, updateProspectingResult } from '../networking/server';

let index = 0;
let capacityUnit = [{
value: 'ton',
}, {
value: 'kw',
}, {
value: 'kg',
}];

let priceUnit = [{
value: 'ton',
}, {
value: 'kw',
}, {
value: 'kg',
}];

let landAreaUnit = [{
value: 'hektar',
}, {
value: 'm2',
}, {
value: 'rante',
}];

export default class Prospecting_Result extends Component<{}> {
  constructor(){
    super();
    this.state = {
      leaderName: '',
      phoneNumber:'',
      groupFarmer:'',
      numberOfMembers:'',
      landArea:'',
      longTimeFarming:'',
      unitLandArea:'',
      arr: [{
        index:0,
        commodity:'',
        capacity:'',
        price:'',
        unitCapacity: '',
        unitPrice: '',
      }],
      isLoading: true,
    };
  };

  componentDidMount(){
    return ( getProspecting().then((responseJson) => {
      this.setState({
        isLoading:false,
        leaderName: responseJson.leaderName,
        phoneNumber: responseJson.phoneNumber,
        groupFarmer: responseJson.groupFarmer,
        numberOfMembers: responseJson.numberOfMembers,
        landArea: responseJson.landArea,
        longTimeFarming: responseJson.longTimeFarming,
        unitLandArea: responseJson.unitLandArea,
        arr: responseJson.product.map((r, index) => {
            return {
              index : r.id,
              commodity : r.commodity,
              capacity : r.capacity,
              unitCapacity : r.unitCapacity,
              price : r.price,
              unitPrice : r.unitPrice
          }
        }),
    }, function(){

    });
    console.log('oks', this.state.arr);
    }).catch((error)=> {
    console.log('Error : ', error);
  }))
  }

  list_data() {
    Actions.list_data()
  }

  removeItem(index) {
    const list = this.state.arr;
    const newList = list.filter(data => {
      return data.index !== index;
    })
     this.setState({ arr:newList });
     console.log('hapus :', newList);
     console.log('arr :', list)
  };

  insertSomeThing(){
    const newIndex = this.state.arr[this.state.arr.length-1].index+1;
    this.state.arr.push({
      index:newIndex,
      commodity:'',
      capacity: '',
      price: '',
      unitCapacity: '',
      unitPrice: '',
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
      unitLandArea: this.state.unitLandArea,
      longTimeFarming: this.state.longTimeFarming,
      product: this.state.arr.map((val, index) => {
          return {
            id : val.index,
            commodity : val.commodity,
            capacity : val.capacity,
            unitCapacity : val.unitCapacity,
            price : val.price,
            unitPrice : val.unitPrice
         }
      })
    };
    updateProspectingResult(newProspecting).then((responseJson)=> {
       if(responseJson.err){
         Alert.alert(responseJson.err);
       }else{
         this.list_data();
       }
     })
    console.log(newProspecting);
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
    this.setState({ arr:newList});
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
        unitCapacity: '',
        unitPrice: '',
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
               style={styles.smallCommodity}
               value={r.commodity}
               onChangeText={commodity => this.insertVal(commodity, r.index, 'commodity')}
             />
          </View>

          <View style={styles.textInputWrapper}>
             <Text style={styles.textCapacity}>
               <Text>Kapasitas</Text>
             </Text>
             <TextInputMask
               style={styles.smallCapacity}
               type={'only-numbers'}
               value={r.capacity}
               onChangeText={capacity => this.insertVal(capacity, r.index, 'capacity')}
             />
           </View>
           <View style={styles.textInputWrapper}>
             <Dropdown label=' '
                       containerStyle={{width:45, top: 10, left: 0}}
                       fontSize={14}
                       baseColor={"#000000"}
                       data={capacityUnit}
                       onChangeText={unitCapacity => this.insertVal(unitCapacity, r.index, 'unitCapacity')}
                       value={r.unitCapacity}
                       >
             </Dropdown>
           </View>

           <View style={styles.textInputWrapper}>
             <Text style={styles.textPrice}>
               <Text>Harga</Text>
             </Text>
             <TextInputMask
                   style={styles.smallPrice}
                   type={'money'}
                   options={{
                     precision: 0,
                     separator: '',
                     delimiter: ',',
                     unit: 'Rp',
                     suffixUnit:''
                   }}
                   value={r.price}
                   onChangeText={price => this.insertVal(price, r.index, 'price')}
                   keyboardType="numeric"/>
          </View>
          <Text style={{paddingTop:46,right:24}}>/</Text>
          <Dropdown label=' '
                    containerStyle={{width:46, top: 10, right:16}}
                    fontSize={16}
                    baseColor={"#000000"}
                    data={priceUnit}
                    onChangeText={unitPrice => this.insertVal(unitPrice, r.index, 'unitPrice')}
                    value={r.unitPrice}
                    >
          </Dropdown>
          <Icon
             name="trash"
             size={32}
             color="red"
             style={{ marginLeft: 'auto', marginTop:40, right: 16}}
             onPress={() => this.trashVal(r.index)}
           />
          </View>
       </View>
     );
   });

   return(
     <View style={styles.container}>
      <View style = {{backgroundColor:'#284586', height:50}}>
        <View style={styles.imageGroup}>
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
           <Text>Prospecting</Text>
         </Text>
       </View>
       <KeyboardAwareScrollView style={{paddingLeft:20, marginBottom:50}}>
         <Text style={styles.text}>
             <Text>Nama Lengkap Ketua</Text>
         </Text>
         <TextInput style={styles.inputBox}
                   onChangeText={(leaderName) => this.setState({leaderName})}
                   value={this.state.leaderName}
                   placeholder="Nama lengkap sesuai KTP"
         />

         <Text style={styles.text}>
             <Text>Nomor Telepon</Text>
         </Text>
         <TextInputMask
             	style={styles.inputBox}
             	type={'custom'}
             	options={{
             		mask: '+62 999-9999-9999',
             	}}
             	selectionColor="#CF0821"
             	underlineColorAndroid="transparent"
             	keyboardType="numeric"
             	value={this.state.phoneNumber}
              onChangeText={(phoneNumber) => this.setState({phoneNumber})}
              placeholder="+62 (8xx xxxx xxxx)"
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
         <TextInputMask
           style={styles.inputBox}
           type={'only-numbers'}
           onChangeText={(numberOfMembers) => this.setState({numberOfMembers})}
           value={this.state.numberOfMembers}
         />
         <Text style={styles.text}>
           <Text>Luas Lahan</Text>
         </Text>
         <View style={styles.dropdownWrapper}>
             <TextInputMask
               style={styles.inputBox4}
               type={'only-numbers'}
               onChangeText={(landArea) => this.setState({landArea})}
               value={this.state.landArea}
             />

           <Dropdown label=' '
                     containerStyle={{width:95, bottom: 16, left: 24}}
                     fontSize={16}
                     baseColor={"#000000"}
                     data={landAreaUnit}
                     onChangeText={(unitLandArea) => this.setState({unitLandArea})}
                     value={this.state.unitLandArea}>
           </Dropdown>
         </View>

         <Text style={styles.text3}>
           <Text>Lama Bertani</Text>
         </Text>
         <TextInput style={styles.inputBox}
             onChangeText={(longTimeFarming) => this.setState({longTimeFarming})}
             value={this.state.longTimeFarming}
             placeholder="X tahun, X bulan"
         />
        <View>
         { arr }
           <TouchableOpacity onPress={() => { this.insertSomeThing('')}}>
             <Icon name="plus-square" size={48} color="#284586"/>
           </TouchableOpacity>
        </View>
       </KeyboardAwareScrollView>
       <TouchableOpacity onPress={ () => { this.insertToServer(); }}  style={styles.footer}>
         <Text style={styles.next}>Simpan</Text>
       </TouchableOpacity>
     </View>
   );
 }
};

var styles = StyleSheet.create({
 container:{
   backgroundColor:'#FFFFFF',
   flex: 1,
 },
 dropdown:{
   width:15,
   fontSize: 12,
   color:'#000000',
   marginRight: 15
   },
 small:{
   flex: 1,
   flexDirection: 'row',
 },
 text1:{
   fontSize: 24,
   fontWeight: '400',
   color:'#000000',
   paddingRight:144,
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
 imageGroup:{
   flexDirection: 'row',
   justifyContent: 'space-between',
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
   height:40,
   width:120,
   backgroundColor: '#FFC400',
   marginVertical: 10,
   paddingVertical: 13,
   marginBottom:20,
   borderRadius:30,
 },
 inputBox:{
   width:350,
   height:48,
   borderRadius:5,
   borderWidth: 0.5,
   borderColor: '#000000',
   backgroundColor:'#F5F5F5',
   paddingVertical: 6,
   fontSize:16,
   color:'#000000',
   marginVertical: 5
 },
 smallCapacity:{
   flex: 1,
   width:65,
   left:5,
   borderRadius:5,
   borderWidth: 0.5,
   borderColor: '#000000',
   backgroundColor:'#F5F5F5',
   paddingVertical: 6,
   fontSize:16,
   color:'#000000',
   marginVertical: 5,
 },
 smallPrice:{
   flex: 1,
   width:65,
   right:20,
   borderRadius:5,
   borderWidth: 0.5,
   borderColor: '#000000',
   paddingVertical: 4,
   backgroundColor:'#F5F5F5',
   fontSize:12,
   color:'#000000',
   marginVertical: 5,
 },
 smallCommodity:{
   flex: 1,
   width:70,
   borderRadius:5,
   borderWidth: 0.5,
   borderColor: '#000000',
   paddingVertical: 4,
   fontSize:12,
   backgroundColor:'#F5F5F5',
   color:'#000000',
   marginVertical: 5,
 },
 textInputWrapper: {
    flex:1,
  },
  dropdownWrapper: {
     flexDirection:'row',
   },
  inputBox4:{
    width:200,
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
  footer: {
    position: 'absolute',
    flex:0.1,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor:'#284586',
    height:50,
    alignItems:'center',
  },
  next:{
    color:'#ffffff',
    fontSize:20,
    marginTop:5,
    padding:5,
    width:200,
    borderRadius:30,
    height:35,
    textAlign:'center',
    fontWeight: 'bold',
  },
  text:{
    fontSize:14,
    fontWeight: '400',
    color:'#000000',
    marginTop:8
  },
  text3:{
    fontSize:16,
    fontWeight: '400',
    color:'#000000',
    marginBottom:4,
  },
  textCapacity:{
    fontSize: 14,
    fontWeight: '400',
    color:'#000000',
    marginTop: 10,
    left: 5
  },
  textPrice:{
    fontSize: 14,
    fontWeight: '400',
    color:'#000000',
    marginTop: 10,
    right: 20
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
  save:{
    backgroundColor:'#FFC400',
    top: 10,
    color:'#ffffff',
    fontSize:16,
    padding:3,
    marginBottom: 25,
    width: 40,
    height:40,
    borderRadius:8,
    alignItems:'center',
  },
});
