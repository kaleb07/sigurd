import React, {Component} from 'react';
import {AppRegistry, SectionList, StyleSheet, Text, View, Alert, Platform } from 'react-native';

const apiActivity = 'http://localhost:3011/activity';
const apiActivityOption = 'http://localhost:3011/activity_option';


async function getActivityFromServer(){
  try{
    let response = await fetch(apiActivity);
    let responseJson = response.json();
    return responseJson.items;
  } catch(error){
      console.log('Error is: ', error);
  }
}

async function getActivityOptionFromServer(){
  try{
    let response = await fetch(apiActivityOption);
    let responseJson = response.json();
    console.log('Bisa nih');
    return responseJson;
  } catch(error){
      console.log('Error is: ', error);
  }
}

async function insertActivityToServer(params){
  try{
    let response = await fetch(apiActivity, {
        method: 'POST',
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(params),
    });
    let responseJson = response.json();
    return responseJson;
  } catch(error){
    console.log('Error is: ', error);
  }
}
export {getActivityOptionFromServer};
export {getActivityFromServer};
export {insertActivityToServer};
