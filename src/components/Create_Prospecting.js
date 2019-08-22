import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image, BackHandler} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-datepicker';
import { insertActivityToServer } from '../networking/server';
import { responsiveWidth as wp, responsiveHeight as hp } from 'react-native-responsive-ui-views';

let check = true;
const options={
  title: 'Choose photo',
  takePhotoButtonTitle:'Take from my camera',
  chooseFromLibraryButtonTitle:'Take from my library',
  quality: 0.2,
}

export default class Create_Prospecting extends Component<{}>{
  constructor(props) {
    super(props);
    this.state = {
      date:'',
      activityDesc:'',
      location:'',
      activityResult:'',
       arr: [{
        index:0,
        image:'',
        caption:''
      }]
    }
    this.selectImage = this.selectImage.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  };

  static navigationOptions = {
    header: null,
  };

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    this.props.navigation.navigate('Category');
    return true;
  }

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
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {
          uri: response.uri,
          type: response.type,
          fileName: response.fileName
         };
        const newList = list.map(listData => {
          if(listData.index === index) {
            return {
              ...listData,
              image: source,
            }
          }
          return listData
        })
        this.setState({ arr:newList });
    }});
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

 add(){
   this.checkArr();
   if (check === true){
      this.insertSomeThing('');
   }
 }

 checkArr(){
   this.state.arr.map(val => {
     if(val.image == ''){
       Alert.alert(
         'Image cannot be blank.',
         '',
         [
           {text: 'OK', onPress: () => console.log('')},
         ],
         {cancelable: false},
       );
       check = false
     } else if (val.caption == '') {
       Alert.alert(
         'Caption cannot be blank.',
         '',
         [
           {text: 'OK', onPress: () => console.log('')},
         ],
         {cancelable: false},
       );
       check = false
     } else {
       check = true;
     }
   })
 }

 insertToServer(activityName){
   const newActivity = {
     date: this.state.date,
     activityOption: 'Prospecting',
     activityDesc: this.state.activityDesc,
     location: this.state.location,
     activityResult: this.state.activityResult,
     images:this.state.arr,
   };
   if(newActivity.images[0].image == '' && newActivity.images[0].caption == '' && this.state.arr.length === 1){
     Alert.alert(
       'Please insert at least one product.',
       '',
       [
         {text: 'OK', onPress: () => console.log('')},
       ],
       {cancelable: false},
     );
     check = false;
   } else {
     this.checkArr();
   }

  if(check === true){
    insertActivityToServer(activityName, newActivity).then((responseJson)=> {
     if(responseJson.err){
       Alert.alert(responseJson.err);
     }else{
       this.props.navigation.navigate('Farmer')
     }
   })
  }
 }

 render(){
   const now = new Date();
   const prevMonths = new Date(now.getFullYear(), now.getMonth() - 2, now.getDate());
   let arr = this.state.arr.map((r, index) => {
    return (
      <View key={ index }>
        <View style={styles.imageGroup}>
          <TouchableOpacity onPress={() => this.selectImage(r.index)}>
            <Image source={r.image !=='' ? r.image : require('../images/add.png')}
              style={{width: wp(11),height: hp(6),marginRight:8,marginTop:12, paddingLeft:8}}/>
          </TouchableOpacity>
          <TextInput
            style={styles.inputBox2}
            value={r.caption}
            onChangeText={data => this.insertVal(data, r.index)}
          />
          <Icon name="trash"
             size={32}
             color="red"
             style={{ marginLeft: 'auto', marginTop:16, marginRight:32}}
             onPress={() => this.trashVal(r.index)}
          />
        </View>
      </View>
    );
  });

    return (
      <View style={styles.container}>
        <View style = {{backgroundColor:'#284586', height: hp(8), paddingLeft:16}}>
          <View style={styles.imageGroup2}>
            <Image style={{width: wp(10), height: hp(5),marginTop:5}}
              source={require('../images/logo1.png')}/>
            <Text style={styles.text2}>FO Activity</Text>
          </View>
        </View>
        <View style={styles.imageGroup1}>
          <Image style={{width: wp(18), height: hp(9), marginTop:16}}
            source={require('../images/prospecting.png')}/>
          <Text style={styles.text1}> Prospecting</Text>
        </View>
        <KeyboardAwareScrollView style={{paddingLeft:16}}>
          <DatePicker
            style={{width: wp(90)}}
            date={this.state.date}
            mode="date"
            placeholder="Pilih tanggal"
            format="DD-MM-YYYY"
            minDate={prevMonths}
            maxDate={now}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                marginLeft: 0,
                width: wp(10),
                height: hp(7)
              },
              dateInput: {
                marginLeft:56,
                fontSize: 16,
                borderRadius:5,
                borderWidth: 0.5,
                backgroundColor:'#F5F5F5',
                borderColor: '#000000',
              }
            }}
            onDateChange={(date) => {this.setState({date: date})}}
          />

          <Text style={styles.text}>Deskripsi Kegiatan</Text>
          <TextInput style={styles.inputBox}
                    multiline={true}
                    onChangeText={(activityDesc) => this.setState({activityDesc})}
                    value={this.state.activityDesc}
                    placeholder="Terjalin kerja sama, tidak terjalin kerjasama, on proses"
          />

          <Text style={styles.text}>Lokasi</Text>
          <TextInput style={styles.inputBox3}
            onChangeText={(location) => this.setState({location})}
            value={this.state.location}
            placeholder="Daerah, provinsi, area (west/east)"
          />

          <Text style={styles.text}>Hasil Kegiatan</Text>
          <TextInput style={styles.inputBox}
            multiline={true}
            onChangeText={(activityResult) => this.setState({activityResult})}
            value={this.state.activityResult}
            placeholder="Terjalin kerja sama, tidak terjalin kerjasama, on proses"
          />

          <Text style={styles.text}>Foto Kegiatan</Text>
          {arr}
          <TouchableOpacity style={{paddingBottom:32, marginRight:'auto'}} onPress={() => { this.add()}}>
            <Icon name="plus-square" size={48} color="#284586"/>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
        <View style={styles.footer}>
          <View style={styles.imageGroup2}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Category')} >
              <Text style={styles.cancel}>Batal</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              Alert.alert(
                'Confirm',
                'Are you sure to continue? Your data will be saved.',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {text: 'OK', onPress: () => this.insertToServer('prospecting')},
                ],
                {cancelable: false},
              );
            }}>
              <Text style={styles.next}>Selanjutnya</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  };
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:'#FFFFFF',
  },
  text:{
    fontSize: 16,
    fontWeight: '400',
    color:'#000000',
    marginTop:8,
  },
  imageGroup2:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:8,
  },
  text1:{
    fontSize: 24,
    fontWeight: '400',
    color:'#000000',
    paddingRight:96,
    marginBottom:32,
    marginTop:32
  },
  text2:{
    color:'#FFFFFF',
    fontSize: hp(3),
    padding:5,
    borderRadius:30,
    marginTop:3,
    fontWeight: 'bold',
    paddingRight:210
  },
  imageGroup:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageGroup1:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight:70,
    marginBottom:-5,
    paddingLeft:20
  },
  cancel:{
    backgroundColor:'#FFC400',
    color:'#000000',
    fontSize: hp(2),
    padding:8,
    width: wp(32),
    height: hp(5),
    textAlign:'center',
    marginRight:48,
    borderRadius:5
  },
  next:{
    backgroundColor:'#FFC400',
    color:'#000000',
    fontSize: hp(2),
    marginBottom:8,
    padding:8,
    width: wp(32),
    height: hp(5),
    textAlign:'center',
    borderRadius:5
  },
  inputBox:{
    width: wp(90),
    height: hp(14),
    borderRadius:5,
    borderWidth: 0.5,
    borderColor: '#000000',
    backgroundColor:'#F5F5F5',
    paddingVertical: 6,
    fontSize:16,
    color:'#000000',
    marginVertical: 5,
    textAlignVertical: 'top',
  },
  inputBox3:{
    width: wp(90),
    height: hp(6),
    borderRadius:5,
    borderWidth: 0.5,
    borderColor: '#000000',
    backgroundColor:'#F5F5F5',
    paddingVertical: 6,
    fontSize:16,
    color:'#000000',
    marginVertical: 5,
  },
  inputBox2:{
    width: wp(64),
    height: hp(6),
    borderRadius:5,
    borderWidth: 0.5,
    borderColor: '#000000',
    backgroundColor:'#F5F5F5',
    paddingVertical: 6,
    fontSize:16,
    color:'#000000',
    marginVertical: 12
  },
  footer: {
    position: 'absolute',
    flex:0.1,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor:'#284586',
    height:56,
    alignItems:'center'
  }
});
