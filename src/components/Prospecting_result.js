import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity,Image} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAccessoryNavigation } from 'react-native-keyboard-accessory';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { Dropdown } from 'react-native-material-dropdown';
import { TextInputMask } from 'react-native-masked-text'
import { insertProspectingToServer } from '../networking/server';

let index = 0;
let capacityUnit = [{
value: 'ton',
}, {
value: 'kw',
}, {
value: 'kg',
}];

let priceUnit = [{
value: '/ton',
}, {
value: '/kw',
}, {
value: '/kg',
}];

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
        price:''
      }],
      unitCapacity: '',
      unitPrice: '',
    };
  };


  list_data() {
    Actions.list_data()
  }

  CheckTextInputIsEmptyOrNot(){
    const { leaderName }  = this.state ;
    const { phoneNumber }  = this.state ;
    const { groupFarmer }  = this.state ;
    const { numberOfMembers }  = this.state ;
    const { landArea }  = this.state ;
    const { longTimeFarming }  = this.state ;
    const { arr }  = this.state ;


    if(leaderName == '' || phoneNumber == '' || groupFarmer == '' || numberOfMembers == '' || landArea == '' || longTimeFarming =='' || arr =='' ){
      Alert.alert("Please Enter All the Values.");
    }
    else{
    this.insertToServer();
    }
  }

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
    this.list_data();
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
              <TextInput
                  style={styles.smallCapacity}
                  value={r.capacity}
                  onChangeText={capacity => this.insertVal(capacity, r.index, 'capacity')}
                  keyboardType="numeric"/>
            </View>
            <View style={styles.textInputWrapper}>
              <Dropdown label=' '
                        containerStyle={{width:45, top: 10, left: 0}}
                        fontSize={14}
                        baseColor={"#000000"}
                        data={capacityUnit}
                        onChangeText={(unitCapacity) => this.setState({unitCapacity})}
                        value={r.unitCapacity}>
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
                      separator: '.',
                      delimiter: ',',
                      unit: 'Rp ',
                      suffixUnit: ''
                    }}
                    value={r.price}
                    onChangeText={price => this.insertVal(price, r.index, 'price')}
                    keyboardType="numeric"/>
           </View>
           <Dropdown label=' '
                     containerStyle={{width:50, top: 10, right: 25}}
                     fontSize={14}
                     baseColor={"#000000"}
                     data={priceUnit}
                     onChangeText={(unitPrice) => this.setState({unitPrice})}
                     value={r.unitPrice}>
           </Dropdown>
           <Icon
      				name="trash"
      				size={30}
      				color="red"
      				style={{ marginLeft: 'auto', marginTop: 40, right: 13}}
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
                  keyboardType="numeric"
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
                  keyboardType="numeric"
          />
          <Text style={styles.text}>
            <Text>Luas Lahan</Text>
          </Text>
          <TextInput style={styles.inputBox}
                  onChangeText={(landArea) => this.setState({landArea})}
                  value={this.state.landArea}
                  keyboardType="numeric"
          />
          <Text style={styles.text}>
            <Text>Lama Bertani</Text>
          </Text>

          <TextInput style={styles.inputBox}
                  onChangeText={(longTimeFarming) => this.setState({longTimeFarming})}
                  value={this.state.longTimeFarming}
                  keyboardType="numeric"
          />
         <View>
            { arr }
           <TouchableOpacity
             onPress={ () => { this.insertSomeThing() }}
             style={styles.save}>
             <Icon name="plus" size={35} color="black"/>
           </TouchableOpacity>
         </View>
        </KeyboardAwareScrollView>
        <View style={styles.footer}>
          <TouchableOpacity onPress={ () => { this.CheckTextInputIsEmptyOrNot() }}>
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
  smallCapacity:{
    flex: 1,
    width:65,
    left:5,
    borderRadius:5,
    borderWidth: 0.5,
    borderColor: '#000000',
    paddingVertical: 4,
    fontSize:12,
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
    color:'#000000',
    marginVertical: 5,
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
     fontSize: 14,
     fontWeight: '400',
     color:'#000000',
     marginTop: 10
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
