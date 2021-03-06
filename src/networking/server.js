import React, {Component} from 'react';
import SInfo from 'react-native-sensitive-info';
import Config from "react-native-config";

const apiActivity = Config.API_HOST + '/activity';
const apiActivityOption = Config.API_HOST + '/activity/option';
const apiProspecting = Config.API_HOST + '/prospecting';
const apiSignedUrl = Config.API_HOST + '/signed-url';
const apiProject = Config.API_HOST + '/project/all';
const apiAccount = Config.API_ACCOUNT + '/v1/auth/signin';

var RNFetchBlob = require('react-native-fetch-blob').default
var id_activity = '';
var id_farmer='';
var user = [];
var id_activity_option = '';

async function getAccountInfo(params){
  try{
    let response = await fetch(apiAccount, {
        method: 'POST',
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json',
          'serviceId' : Config.SERVICE_ID,
          'servicesecret' : Config.SERVICE_SECRET
        },
        body: JSON.stringify(params),
    });
    let responseJson = await response.json();
    console.log('user: ', responseJson);
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

async function getActivityOptionById(){
  try{
    let getById = apiActivityOption + '/' + id_activity_option;
    let response = await fetch(getById, {
        method: 'GET',
    });
    let responseJson = await response.json();
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

async function sendIdActivityOptions(params){
  id_activity_option = params;
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
     user = val.profile;
   });
    params.activityOptionId = id_activity_option;
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
    console.log('update: ', updateById);
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

export {getActivityOptionFromServer, getActivityFromServer, getProjectFromServer, getActivityProspecting, getActivityOptionById,
getProspecting, sendIdFarmer, sendIdActivityOptions, signOut, insertActivityToServer, insertProspectingToServer, deleteProspectingResult,
updateProspectingResult, getAccountInfo};
