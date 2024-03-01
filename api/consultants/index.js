const axiosInstance = require('../config/axiosInstance');

module.exports = async function (context, req) {
  try {
    const response = await axiosInstance.get("/0/rest/UsrCustomConfigurationService/GetContactIdByName?Name=" + req.query.zip,{
      headers: {'Cookie': req.query.cookies}
    });
    
    context.res.json(response.data);
  } catch (error) {
    throw error;
  }
};
