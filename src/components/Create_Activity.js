import React, {Component} from 'react';
import {GoogleSignin, GoogleSigninButton, statusCodes} from 'react-native-google-signin';
import {StyleSheet,Text,View,TouchableOpacity,Image,Header,Alert, BackHandler} from 'react-native';
import SInfo from 'react-native-sensitive-info';
import {getAccountInfo}  from '../networking/server.js';
import { responsiveWidth as wp, responsiveHeight as hp } from 'react-native-responsive-ui-views';

let count = 0;
export default class Create_Activity extends Component <{}> {
  componentDidMount() {
     this._configureGoogleSignIn();
     SInfo.getItem('key2',{}).then(value => {
      const val = JSON.parse(value);
      const now = new Date();
      const nowTimeStamp = now.getTime();
      const exp = val.data.auth.expires;
      // ambil expires dari sensitive info
      if (nowTimeStamp < exp) {
        this.props.navigation.navigate('Home');
      } else {
       this._configureGoogleSignIn();
      }
    });
   }

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    count = count + 1;
    if(count == 2){
      count = 0;
      BackHandler.exitApp();
    } else {
      ToastAndroid.show('Press back again to quit', ToastAndroid.SHORT);
    }
    return true;
  }

   _configureGoogleSignIn() {
     GoogleSignin.configure({
       webClientId: '352070757217-dmkn2fi5o0dpkq3fbooo8vvu6ct17rct.apps.googleusercontent.com',
     });
   }

   _signIn = async () => {
     try {
       await GoogleSignin.hasPlayServices();
       const userInfo = await GoogleSignin.signIn();
       const params = {
         accessToken: '',
         refreshToken: '',
         profile: {
           id: userInfo.user.id,
           displayName: userInfo.user.name,
           name: {
             familyName: userInfo.user.familyName,
             givenName: userInfo.user.givenName,
           },
           emails: [
             {
               value: userInfo.user.email,
               type: 'account'
             }
           ],
           photos: [
             {
               value: userInfo.user.photo,
             }
           ],
           provider: 'google-app',
         }
       };

       const email = userInfo.user.email;
       const index = email.indexOf('@');
       const domain = email.substring(index + 1);
       if (domain == 'tanihub.com') {
         getAccountInfo(params).then((responseJson)=> {
           SInfo.setItem('key2', JSON.stringify(responseJson), {});
           if(responseJson.error){
             console.log('Error: ', responseJson.error);
           } else {
             this.props.navigation.navigate('Home');
           }
         });
       } else {
         Alert.alert('Silahkan masuk dengan akun TaniHub');
       }

       await GoogleSignin.revokeAccess();

     } catch (error) {
       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
         Alert.alert('cancelled');
       } else if (error.code === statusCodes.IN_PROGRESS) {
         Alert.alert('in progress');
       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
         Alert.alert('play services not available or outdated');
       } else {
         console.log('Something went wrong:',error.toString());
         Alert.alert('Something went wrong', error.toString());
         this.setState({
           error,
         });
       }
     }
   };

  render(){
    return (
      <View style = {styles.container}>
        <View style={styles.logo}>
           <Image style={{width:100, height:100}}
              source={require('../images/logo.png')}/>
            <Text style={styles.text1}>FO Activity</Text>
          </View>
          <View style={styles.textGroup2}>
            <Text style={styles.text}>Selamat datang!!</Text>
            <Text style={styles.text}>Silahkan masuk melalui akun</Text>
            <Text style={styles.text}>anda</Text>
            <View style = {styles.button}>
              <TouchableOpacity>
                <GoogleSigninButton
                  style={{ width: 312, height: 48 }}
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Light}
                  onPress={this._signIn}
                />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text:{
    fontSize: hp(3),
    color:'black',
    textAlign:'center',
    fontWeight: 'bold',
  },
  textGroup2:{
    marginTop:-80,
  },
  text1:{
    fontSize:hp(4),
    color:'#284586',
    textAlign:'center',
    fontWeight: 'bold',
  },
  button:{
    marginVertical: 40,
    width: 300,
  },
  logo: {
    width: 300,
    alignItems: 'center',
    marginVertical:135
  }
});
