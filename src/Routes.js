import React, {Component} from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import Create_Function from './pages/Create_Function';
import Create_Form from './pages/Create_Form';
import Prospectingresult from './pages/Prospectingresult';
import Kategorikegiatan from './pages/Kategorikegiatan';
import Createprospecting from './pages/Createprospecting';
import Monitorlapangan from './pages/Monitorlapangan';
import Tanamperdana from './pages/Tanamperdana';
import Createpanen from './pages/Createpanen';
import Createlainnya from './pages/Createlainnya';
import Laporkanaktivitas from './pages/Laporkanaktivitas';
import Listdata from './pages/Listdata';
import Editprospecting from './pages/Editprospecting';
import SuccessPage from './pages/SuccessPage';

export default class Routes extends Component < {} > {
  render() {
    return (
      <Router >
        <Stack key = "root"hideNavBar = {true}>
          <Scene key = "login"component = {Create_Function}title = "Create Function"initial = {true}/>
          <Scene key = "register"component = {Create_Form}title = "Create Form" / >
          <Scene key = "prospecting"component = {Prospectingresult}title = "Create Prospecting Result" / >
          <Scene key = "kegiatan"component = {Kategorikegiatan}title = "Kategori kegiatan" / >
          <Scene key = "create_prospecting"component = {Createprospecting}title = "Create Prospecting" / >
          <Scene key = "monitor_lapangan"component = {Monitorlapangan}title = "Monitor Lapangan" / >
          <Scene key = "tanam_perdana"component = {Tanamperdana}title = "Tanam Perdana" / >
          <Scene key = "create_panen"component = {Createpanen}title = "Create Panen" / >
          <Scene key = "create_lainnya"component = {Createlainnya}title = "Create Lainnya" / >
          <Scene key = "laporkan_aktivitas"component = {Laporkanaktivitas}title = "Laporkan Aktivitas" / >
          <Scene key = "list_data"component = {Listdata}title = "List Data" / >
          <Scene key = "edit_prospecting"component = {Editprospecting}title = "Edit Prospecting" / >
          <Scene key = "success_page"component = {SuccessPage}title = "Success Page" / >
        </Stack>
      </Router>
    )
  }
}
