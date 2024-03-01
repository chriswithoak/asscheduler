const axiosInstance = require('../config/axiosInstance');
const config = require('../config/config');

module.exports = async function (context, req) {
  try {
    var body = {
        UserName: config.USERNAME,
        UserPassword: config.PASSWORD
    };

    const response = await axiosInstance.post("/ServiceModel/AuthService.svc/Login", body);
    
    context.res.json(response.headers);
  } catch (error) {
    throw error;
  }
};
