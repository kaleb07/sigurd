import React, {Component} from 'react';

const apiActivity = 'http://localhost:3011/activity';
const apiActivityOption = 'http://localhost:3011/activity_option';
const apiProspecting = 'http://localhost:3011/prospecting';
var id = '';

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
    let responseJson = response.json();
    console.log('get by id : ', responseJson);
    return responseJson;
  } catch(error){
      console.log('Error is: ', error);
  }
}

export {getActivityOptionFromServer};
export {getActivityFromServer};
export {getActivityProspecting};
export {insertActivityToServer};
export {insertProspectingToServer};
