import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity,Alert, Button, Image, Animated, BackHandler} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-datepicker';
import { insertActivityToServer, getProjectFromServer } from '../networking/server';
import { responsiveWidth as wp, responsiveHeight as hp } from 'react-native-responsive-ui-views';
import {Autocomplete} from "react-native-dropdown-autocomplete";
import { signOut } from '../networking/server';

const options={
  title: 'Choose photo',
  takePhotoButtonTitle:'Take from my camera',
  chooseFromLibraryButtonTitle:'Take from my library',
  quality: 0.2,
}

export default class Monitor_Lapangan extends Component<{}>{
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      date:'',
      activityDesc:'',
      location:'',
      activityResult:'',
      arr: [{
        index:0,
        image:'',
        caption:''
      }],
      project: [],
    }
    this.selectImage = this.selectImage.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  };

  componentDidMount(){
    return ( getProjectFromServer().then((responseJson) => {
      this.setState({
        projects: responseJson.data.items,
        isLoading:false
      });
      console.log('project: ', this.state.projects);
    }).catch((error)=> {
      console.log('Error : ', error);
    })
  )}

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

  handleSelectItem(item, index) {
   this.setState({
     project: [{
       id: item.projectNo,
       name: item.title
     }]
   })
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

  insertToServer(activityName){
    const newActivity = {
      date: this.state.date,
      activityOption: 'Monitor Lapangan',
      activityDesc: this.state.activityDesc,
      project: this.state.project,
      location: this.state.location,
      activityResult: this.state.activityResult,
      images:this.state.arr,
    };
    insertActivityToServer(activityName, newActivity).then((responseJson)=> {
      if(responseJson.err){
        Alert.alert(responseJson.err);
      }else{
        this.props.navigation.navigate('SuccessPage')
      }
    })
  }

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

  render(){
    if(this.state.isLoading){
      return(
        <View style={{flex:1, padding:100, marginTop:100,alignItems:'center'}}>
          <Image style={{width:150, height:150}}
            source={require('../images/logo.png')}/>
          <Text style={{fontSize: 30, color: '#AAAAAA', paddingTop: 15, fontWeight: 'bold'}}>Loading...</Text>
        </View>
      )
    } else {
      const projects = this.state.projects;
      const now = new Date();
      const prevMonths = new Date(now.getFullYear(), now.getMonth() - 2, now.getDate());
      let arr = this.state.arr.map((r, index) => {
        return (
          <View key={ index }>
            <View style={styles.imageGroup}>
              <TouchableOpacity onPress={() => this.selectImage(r.index)}>
                <Image source={r.image !=='' ? r.image :
                  require('../images/add.png')}
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
                 style={{ marginLeft: 'auto', marginTop: 16, marginRight:5}}
                 onPress={() => this.trashVal(r.index)}
              />
            </View>
          </View>
        );
      })

      return (
        <View style={styles.container}>
          <View style = {{backgroundColor:'#284586',height: hp(8)}}>
            <View style={styles.imageGroup5}>
              <Image style={{width: wp(10), height: hp(5),left:8,marginTop:5}}
                source={require('../images/logo1.png')}/>
              <Text style={styles.text2}>FO Activity</Text>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style = {styles.button1}>
                <Text style={styles.close}>sign out</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.imageGroup1}>
            <Image style={{width: wp(18), height: hp(9.5), marginTop:16}}
              source={require('../images/monitoring.png')}/>
            <Text style={styles.text1}>Monitor Lapangan</Text>
          </View>
          <KeyboardAwareScrollView style={{paddingLeft:20, marginBottom:50}}>
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
                  borderColor: '#000000',
                  backgroundColor: '#F5F5F5',
                }
              }}
              onDateChange={(date) => {this.setState({date: date})}}
            />

            <Text style={styles.text}>Deskripsi Kegiatan</Text>
            <TextInput style={styles.inputBox}
              multiline={true}
              onChangeText={(activityDesc) => this.setState({activityDesc})}
              value={this.state.activityDesc}
              placeholder="Monitor kegiatan: persiapan lahan, perawatan, penyemprotan."
            />

            <Text style={styles.text}>Proyek</Text>
            <Autocomplete
              inputStyle={styles.dropdown}
              scrollToInput={() => {}}
              handleSelectItem={(item, id) => this.handleSelectItem(item, id)}
              onDropdownClose={() => {}}
              onDropdownShow={() => {}}
              data={projects}
              minimumCharactersCount={1}
              highlightText
              valueExtractor={item => item.title }
              rightContent
              rightTextExtractor={item => item.projectNo}
              placeholder="Cari proyek"
            />

            <Text style={styles.text}>Lokasi</Text>
            <TextInput style={styles.inputBox3}
                      onChangeText={(location) => this.setState({location})}
                      value={this.state.location}
                      placeholder="Daerah, provinsi, area (west/east)"
            />

            <Text style={styles.text}>Hasil Kegiatan </Text>
            <TextInput style={styles.inputBox}
                      multiline={true}
                      onChangeText={(activityResult) => this.setState({activityResult})}
                      value={this.state.activityResult}
                      placeholder="Kegiatan berjalan lancar.../ ada hambatan.../ dll."
            />

            <Text style={styles.text}>Foto Kegiatan</Text>
              {arr}
            <View style={{paddingBottom:32}}>
              <TouchableOpacity onPress={() => { this.insertSomeThing('')}}>
                <Icon name="plus-square" size={48} color="#284586"/>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
          <View style={styles.footer}>
            <View style={styles.imageGroup2}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Category')} >
                <Text style={styles.cancel}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.insertToServer('monitor_lapangan') }}>
                <Text style={styles.next}>Simpan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    }
  };
};

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#FFFFFF',
    flex: 1,
  },
  button1: {
    width: wp(20),
    height: hp(4),
    backgroundColor: '#FFC400',
    borderRadius:5,
    marginTop:8,
    right:16
},
  text:{
    fontSize: 16,
    fontWeight: '400',
    color:'#000000',
    marginTop: 10,
  },
  text1:{
    fontSize: 24,
    fontWeight: '400',
    color:'#000000',
    paddingRight:80,
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
    paddingRight:100
  },
  textgroup:{
    fontSize: 30,
    fontWeight: '400',
    color:'#000000',
    paddingLeft:60,
   marginBottom: 30,
  },
  dropdown:{
    paddingLeft: 5,
    width: wp(90),
    height: hp(6),
    borderRadius:5,
    borderWidth: 0.5,
    borderColor: '#000000',
    backgroundColor: '#F5F5F5',
    paddingVertical:8,
    fontSize:16,
    color:'#000000',
    marginVertical:4,
  },
  imageGroup:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight:20,
  },
  imageGroup2:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight:20,
    paddingLeft:20,
    marginTop:8,
  },
  imageGroup1:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight:20,
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
  save:{
    backgroundColor:'#FFC400',
    color:'#ffffff',
    fontSize:16,
    padding:5,
    marginBottom: 25,
    width: 50,
    height:50,
    borderRadius:8,
    alignItems:'center',
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
  inputDropdown:{
    borderWidth: 0.5,
    borderRadius:5,
    width:350,
    borderColor: '#000000',
    backgroundColor: '#F5F5F5',
    marginVertical: 10,
  },
  itemDropdown: {
    padding: 15,
    marginTop: 2,
    backgroundColor: '#F5F5F5',
    borderColor: '#000000',
    borderWidth: 0.5,
    borderRadius:5,
  },
  inputBox:{
    width: wp(90),
    height: hp(14),
    borderRadius:5,
    borderWidth: 0.5,
    borderColor: '#000000',
    backgroundColor: '#F5F5F5',
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
    backgroundColor: '#F5F5F5',
    paddingVertical:8,
    fontSize:16,
    color:'#000000',
    marginVertical:4,
  },
  inputBox2:{
    width: wp(64),
    height: hp(6),
    borderRadius:5,
    borderWidth: 0.5,
    borderColor: '#000000',
    backgroundColor: '#F5F5F5',
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
    alignItems:'center',
  },
  close:{
    color:'#000000',
    fontSize: hp(2),
    textAlign:'center',
    marginTop:4
 },
  imageGroup4:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft:280,
    borderRadius:5,
  },
  imageGroup5:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding:5,
  },
});
