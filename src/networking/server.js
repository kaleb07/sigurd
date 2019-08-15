import React, {Component} from 'react';

const apiActivity = 'http://localhost:3011/activity';
const apiActivityOption = 'http://localhost:3011/activity_option';
const apiProspecting = 'http://localhost:3011/prospecting';
const apiAccount = 'https://api.tanihub.net/v1/auth/signin';
var id = '';
var id_farmer='';

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
    console.log('Bisa nih');
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
    console.log('prosp : ', responseJson);
    return responseJson;
  } catch(error){
      console.log('Error is: ', error);
  }
}

async function sendIdFarmer(params){
  id_farmer = params;
  console.log('send id prospecting: ', id_farmer);
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
    let responseJson = await response.json();
    id = responseJson.id;
    console.log('from server ', id)
    return responseJson;
  } catch(error){
    console.log('Error is: ', error);
  }
}

async function insertProspectingToServer(params){
  try{
    params.activityId = id
    console.log('params', params);
    let response = await fetch(apiProspecting, {
        method: 'POST',
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(params)
    });
    let responseJson = await response.json();
    console.log('respon: ', responseJson);
    return responseJson;
  } catch(error){
    console.log('Error is: ', error);
  }
}

async function getActivityProspecting(){
  try{
    let getById = apiActivity + '/' + id;
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
    console.log('deleteById: ', deleteById);
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
    console.log('update URL: ', updateById);
    console.log('update By Id: ', responseJson);
    return responseJson;
  } catch(error){
    console.log('Error is: ', error);
  }
}

export {getActivityOptionFromServer};
export {getActivityFromServer};
export {getActivityProspecting};
export {getProspecting};
export {sendIdFarmer};
export {insertActivityToServer};
export {insertProspectingToServer};
export {deleteProspectingResult};
export {updateProspectingResult};
export {getAccountInfo};
