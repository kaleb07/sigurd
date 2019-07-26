import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Form from '../components/Form';
import { Actions } from 'react-native-router-flux';


export default class Create_Form extends Component<{}> {
render(){
return(
<View style={styles.container}>
<Form/>
</View>
)
}
}
const styles = StyleSheet.create({
container : {
backgroundColor:'#FFFFFF',
flex: 1,
//alignItems:'center',
justifyContent:'center',
}
});
