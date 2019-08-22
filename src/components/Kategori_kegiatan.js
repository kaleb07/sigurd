import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image, BackHandler} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getActivityOptionFromServer } from '../networking/server';
import { responsiveWidth as wp, responsiveHeight as hp } from 'react-native-responsive-ui-views';
import {signOut}  from '../networking/server.js';

export default class Kategori_kegiatan extends Component <{}>{
  constructor(props) {
    super(props);
    this.state = ({
      isLoading:true,
      dataSource:'',
      }
    );
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount(){
    return ( getActivityOptionFromServer().then((responseJson) => {
      this.setState({
        dataSource: responseJson,
        isLoading:false
      });
    }).catch((error)=> {
      console.log('Error : ', error);
    }))
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    this.props.navigation.navigate('Home');
    return true;
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
      let activityOptions = this.state.dataSource.map((val, key) => {
        return <View key={key}>
                  <Text>{val.name}</Text>
               </View>
      });

      return (
        <View style={styles.container}>
          <View style = {{backgroundColor:'#284586', height: hp(8)}}>
            <View style={styles.imageGroup1}>
              <Image style={{width: wp(10), height: hp(5),left:8,marginTop:3}}
              source={require('../images/logo1.png')}/>
              <Text style={styles.text1}>FO Activity</Text>
              <TouchableOpacity onPress={() => {signOut(); this.props.navigation.navigate('Login')}} style = {styles.button1}>
                <Text style={styles.close}>sign out</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.text}>Kategori Kegiatan</Text>
          <View style={styles.imageGroup}>
            <TouchableOpacity  onPress={() => this.props.navigation.navigate('Prospecting')}>
              <Image style={{width: wp(20), height: hp(11)}}
                source={require('../images/prospecting.png')}/>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => this.props.navigation.navigate('Consultation')}>
              <Image style={{width: wp(20), height: hp(11)}}
                source={require('../images/konsultasi.png')}/>
            </TouchableOpacity>
          </View>
          <View style={styles.textGroup}>
            {activityOptions[0]}
            {activityOptions[1]}
          </View>
          <View style={styles.imageGroup}>
            <TouchableOpacity  onPress={() => this.props.navigation.navigate('FieldMonitoring')}>
              <Image style={{width: wp(20), height: hp(11)}}
                source={require('../images/monitoring.png')}/>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => this.props.navigation.navigate('FirstPlanting')}>
              <Image style={{width: wp(20), height: hp(11)}}
                source={require('../images/tanam.png')}/>
            </TouchableOpacity>
          </View>
          <View style={styles.textGroup2}>
            {activityOptions[5]}
            {activityOptions[2]}
          </View>
          <View style={styles.imageGroup}>
            <TouchableOpacity  onPress={() => this.props.navigation.navigate('Harvesting')}>
              <Image style={{width: wp(20), height: hp(11)}}
                source={require('../images/panen.png')}/>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => this.props.navigation.navigate('Other')}>
              <Image style={{width: wp(20), height: hp(11)}}
                source={require('../images/lainnya.png')}/>
            </TouchableOpacity>
          </View>
          <View style={styles.textGroup3}>
            {activityOptions[4]}
            {activityOptions[3]}
        </View>
          <View style={styles.footer}>
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#FFFFFF',
    flex: 1,
  },
  footer: {
    position: 'absolute',
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor:'#284586',
    height:56,
    alignItems:'center'
  },
  text:{
    fontSize: hp(4),
    fontWeight: '400',
    color:'#000000',
    marginTop:30,
    paddingLeft:30
  },
  text1:{
    color:'#FFFFFF',
    fontSize: hp(3),
    padding:5,
    borderRadius:30,
    marginTop:3,
    fontWeight: 'bold',
    paddingRight:100
  },
  imageGroup:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:40,
    paddingLeft:50,
    paddingRight:50,
  },
  imageGroup1:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft:10,
    paddingRight:10,
    padding:8,
  },
  textGroup:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft:46,
    paddingRight:50,
    marginTop: 20,
  },
  textGroup2:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingLeft:28,
    paddingRight:37
  },
  textGroup3:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingLeft:65,
    paddingRight:60,
  },
  button1: {
    width: wp(20),
    height: hp(4),
    backgroundColor: '#FFC400',
    borderRadius:5,
    marginTop:6,
    right:16
  },
  close:{
    color:'#000000',
    fontSize: hp(2),
    textAlign:'center',
    marginTop:4
  }
});
