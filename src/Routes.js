import React, {Component} from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import Create_Function from './pages/Create_Function';
import Create_Form from './pages/Create_Form';

export default class Routes extends Component < {} > {

render() {

return (
    <Router >
    <Stack key = "root"hideNavBar = {true}>
    <Scene key = "login"component = {Create_Function}title = "Create Function"initial = {true}/>
    <Scene key = "register"component = {Create_Form}title = "Create Form" / >
    </Stack>
    </Router>
    )
  }

}
