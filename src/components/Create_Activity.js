import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';


export default class Create_Activity extends Component<{}> {
register() {
Actions.register()
}
render(){
return(
<View style={styles.container}>
<TouchableOpacity onPress={this.register} style={styles.button}>
<Text style={styles.buttonText}>Create Activity</Text>
</TouchableOpacity>
</View>
)
}
}
const styles = StyleSheet.create({
container : {
backgroundColor:'#FFFFFF',
flex: 1,
alignItems:'center',
justifyContent:'center',
},
button: {
width: 300,
backgroundColor: '#0336ff',
borderRadius: 25,
marginVertical: 10,
paddingVertical: 13
},
buttonText:{
fontSize: 16,
fontWeight: '500',
color:'#ffffff',
textAlign:'center'
}
}
);
