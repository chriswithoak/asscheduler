const axiosUSPSInstance = require('../config/axiosUSPSInstance');
const addressVerifyXml = require('../utils/addressVerifyXml');

module.exports = async function (context, req) {
  try {
    const xmlParam = addressVerifyXml(req.body);
    const response = await axiosUSPSInstance.get("/ShippingAPI.dll?API=Verify&XML=" + xmlParam);
    
    context.res.json(response.data);
  } catch (error) {
    throw error;
  }
};
