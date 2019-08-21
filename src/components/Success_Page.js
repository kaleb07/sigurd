import React, {Component} from 'react';
import {View, StyleSheet,FlatList, TouchableOpacity, Text, ScrollView, Image, BackHandler} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { signOut } from '../networking/server';
import { responsiveWidth as wp, responsiveHeight as hp } from 'react-native-responsive-ui-views';

export default class Success_Page extends Component <{}>{
  constructor(props) {
    super(props);
    this.state = ({
      isLoading:true,
    });
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount(){
    return (
      this.setState({
        isLoading:false
      })
    )
  }

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
      return (
        <View style={styles.container}>
          <View style = {{backgroundColor:'#284586', height:56}}>
            <View style={styles.imageGroup1}>
              <Image style={{width:40, height:40,left:16}}
                source={require('../images/logo1.png')}/>
              <Text style={styles.text1}>FO Activity</Text>
              <TouchableOpacity onPress={() => {signOut(); this.props.navigation.navigate('Login')}}>
                <Text style={styles.close}>sign out</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.logo}>
            <Icon name='check'
              size={80}
              color='#284586'
              style={{paddingLeft:100}}
            />
            <Text style={styles.text}>Sukses</Text>
            <TouchableOpacity style={{paddingTop: 50, paddingLeft:95}} onPress={() => this.props.navigation.navigate('Home')} >
              <Text style={styles.cancel}>Tutup</Text>
            </TouchableOpacity>
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
    flex:0.1,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor:'#284586',
    height:56,
    alignItems:'center'
  },
  close:{
    color:'#000000',
    fontSize: hp(2),
    textAlign:'center',
    marginTop:4
  },
  button1: {
    width: wp(20),
    height: hp(4),
    backgroundColor: '#FFC400',
    borderRadius:5,
    marginTop:6,
    right:16
  },
  text:{
    fontSize: hp(4),
    color:'#000000',
    textAlign:'center',
    paddingTop: 10,
    left:45,
    fontWeight: 'bold',
  },
  logo: {
    width:300,
    alignItems: 'center',
    marginVertical:210,
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
  imageGroup1:{
   flexDirection: 'row',
   justifyContent: 'space-between',
   paddingLeft:10,
   paddingRight:10,
   padding:8,
  },
  cancel:{
   backgroundColor:'#FFC400',
   color:'#000000',
   fontSize: hp(2.5),
   padding:8,
   width: wp(50),
   height: hp(6),
   textAlign:'center',
   borderRadius:5
  }
});
