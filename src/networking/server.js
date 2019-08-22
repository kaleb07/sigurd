import React, {Component} from 'react';
import SInfo from 'react-native-sensitive-info';

const apiActivity = 'http://localhost:3011/activity';
const apiActivityOption = 'http://localhost:3011/activity_option';
const apiProspecting = 'http://localhost:3011/prospecting';
const apiSignedUrl = 'http://localhost:3011/signed-url';
const apiProject = 'http://localhost:3011/project/all';
var RNFetchBlob = require('react-native-fetch-blob').default
const apiAccount = 'https://api.tanihub.net/v1/auth/signin';
var id_activity = '';
var id_farmer='';
var user = [];

async function getAccountInfo(params){
  try{
    let response = await fetch(apiAccount, {
        method: 'POST',
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json',
          'serviceId' : 1655787172617,
          'servicesecret' : '47f64d61139f70fcfe2626be8510971dd710c8aaba1a3374c8098a4a98165683e9370cf525dc0d0ab324baf3349b7d8b7be09e62a9bab0e2054878ff783f1ae1'
        },
        body: JSON.stringify(params),
    });
    let responseJson = await response.json();
    id_user = responseJson.data.user.id;
    return responseJson;
  } catch(error){
    console.log('Error is: ', error);
  }
}

async function signOut(){
  try {
    await SInfo.deleteItem('key2', {});
    SInfo.getItem('key2',{}).then(value => {
      console.log(value)
    })
  } catch (error) {
    console.error(error);
  }
};

async function getProjectFromServer(){
  try{
    let response = await fetch(apiProject);
    let responseJson = response.json();
    return responseJson;
  } catch(error){
      console.log('Error is: ', error);
  }
}

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
    return responseJson;
  } catch(error){
    console.log('Error is: ', error);
  }
}

async function getProspecting(){
  try{
    let getById = apiProspecting + '/' + id_farmer;
    let response = await fetch(getById);
    let responseJson = await response.json();
    return responseJson;
  } catch(error){
      console.log('Error is: ', error);
  }
}

async function sendIdFarmer(params){
  id_farmer = params;
}

async function insertActivityToServer(activity, params){
  try{
    let urls = [];
    let arr = [{
      url: '',
      caption: ''
    }];
    let imgs = await params.images.map(async (img, index) => {
      let urlBody = activity + '/' + img.image.fileName;
      const save = () => {
          urls[index] = 'https://storage.googleapis.com/s-tanifund-storage/' + urlBody;
          arr[index] = {
            url : urls[index],
            caption : img.caption
          };
      }
      let saveUrl = await save();
      const signUrl = await fetch(apiSignedUrl, {
            method: 'POST',
            headers: {
              'Accept' : 'application/json',
              'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                url: urlBody,
                contentType: img.image.type
              })
        })
      const response = await signUrl.json();
      const url = await RNFetchBlob.fetch( 'PUT', response[0], {
              "Content-Type": img.image.type,
              "Accept": "*/*",
              "Cache-Control": "no-cache",
              "Host": "storage.googleapis.com",
              "Accept-Encoding": "gzip, deflate",
              "Connection": "keep-alive",
              "cache-control": "no-cache"
            }, RNFetchBlob.wrap(img.image.uri)
          )
    })

    await SInfo.getItem('key2',{}).then(value => {
     const val = JSON.parse(value);
     user = val.data.user;
   });

    params.images = arr;
    params.user = user;
    console.log('user: ', params.user);
    let response = await fetch(apiActivity, {
        method: 'POST',
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(params),
    });
    let responseJson = await response.json();
    id_activity = responseJson.id;
    return responseJson;
  } catch(error){
    console.log('Error is: ', error);
  }
}

async function insertProspectingToServer(params){
  try{
    params.activityId = id_activity
    let response = await fetch(apiProspecting, {
        method: 'POST',
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(params)
    });
    let responseJson = await response.json();
    return responseJson;
  } catch(error){
    console.log('Error is: ', error);
  }
}

async function getActivityProspecting(){
  try{
    let getById = apiActivity + '/' + id_activity;
    console.log('get props: ', id_activity);
    let response = await fetch(getById);
    let responseJson = await response.json();
    return responseJson;
  } catch(error){
      console.log('Error is: ', error);
  }
}

async function deleteProspectingResult(params){
  try{
    let deleteById = apiProspecting + '/' + params;
    let response = await fetch(deleteById, {
        method: 'DELETE',
    });
    let responseJson = await response.json();
    return responseJson;
  } catch(error){
    console.log('Error is: ', error);
  }
}

async function updateProspectingResult(params){
  try{
    let updateById = apiProspecting + '/' + id_farmer;
    let response = await fetch(updateById, {
        method: 'PUT',
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(params)
    });
    let responseJson = await response.json();
    return responseJson;
  } catch(error){
    console.log('Error is: ', error);
  }
}

export {getActivityOptionFromServer, getActivityFromServer, getProjectFromServer, getActivityProspecting,
getProspecting, sendIdFarmer, signOut, insertActivityToServer, insertProspectingToServer, deleteProspectingResult,
updateProspectingResult, getAccountInfo};
