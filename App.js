/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet,View, StatusBar} from 'react-native';
import Login from './src/components/Create_Activity';
import Home from './src/components/Laporkan_Aktivitas';
import Category from './src/components/Kategori_kegiatan';
import Prospecting from './src/components/Create_Prospecting';
import Consultation from './src/components/Form';
import FieldMonitoring from './src/components/Monitor_Lapangan';
import FirstPlanting from './src/components/Tanam_Perdana';
import Harvesting from './src/components/Create_Panen';
import Other from './src/components/Create_Lainnya';
import Farmer from './src/components/Prospecting_result';
import EditFarmer from './src/components/Edit_Prospecting_result';
import ListData from './src/components/List_data';
import SuccessPage from './src/components/Success_Page';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const rootStack = createStackNavigator({
    Login: Login,
    Home: Home,
    Category: Category,
    Prospecting: Prospecting,
    Consultation:Consultation,
    FieldMonitoring: FieldMonitoring,
    FirstPlanting: FirstPlanting,
    Harvesting: Harvesting,
    Other: Other,
    Farmer: Farmer,
    EditFarmer: EditFarmer,
    ListData: ListData,
    SuccessPage: SuccessPage,
  },
  {
    initialRouteName : 'Login'
  });

const AppContainer = createAppContainer(rootStack);

type Props ={};
export default class App extends Component<Props> {
render() {
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor='#1A237E'
        barStyle="light-content"
      />
      <AppContainer/>
    </View>
  )};
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
  }
});
