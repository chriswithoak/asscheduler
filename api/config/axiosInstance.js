const axios = require('axios');
const config = require('./config');

module.exports = axios.create({
    baseURL: config.API_BASE_URL,
    withCredentials: true,
    headers : {
      'Content-Type': 'application/json'
    }
})