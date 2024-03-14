const axios = require('axios');
const config = require('./config');

module.exports = axios.create({
    baseURL: config.USPS_API_BASE_URL,
    withCredentials: true
})