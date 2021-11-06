const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const axios = require('axios');

// Request API and Give out JSON
 async function DoRequestAPIJSON(APILink,func) {
    let restatus
    const response = await fetch(APILink).then(response => {
      restatus = response.status
      if (response.status == 200 || response.status == 201 || response.status == 202) {
        return response.json()
  
      }
    })
    .then(data => {
  
      func(data,restatus)
    })
  }
  
 async function DoAxiosRequestAPIJSON(APILink,func) {
    let restatus
    await axios.get(APILink).then(response => {
      restatus = response.status
      if (response.status == 200 || response.status == 201 || response.status == 202) {
        return response
  
      }
    })
    .then(data => {
  
      func(data,restatus)
    })
  }
  
  // Request API and Give out all fetch result
async function DoRequestAPINormal(APILink,func) {
    const response = await fetch(APILink).then()
    .then(data => {
      func(data,data.status)
    })
  }

  module.exports = {
    RequestAPIJSON: DoRequestAPIJSON,
    AxiosRequestAPIJSON: DoAxiosRequestAPIJSON,
    RequestAPINormal: DoRequestAPINormal
  }