const axiosInstance = require('../config/axiosInstance');
const sourceSelectPayload = require('../utils/sourceSelectPayload');

module.exports = async function (context, req) {
  try {
    const body = sourceSelectPayload(req.body);
    const response = await axiosInstance.post("/0/DataService/json/SyncReply/SelectQuery", body, {
      headers: {
        'BPMCSRF': req.query.bpmcsrf,
        'Cookie': req.query.cookies
      }
    });

    context.res.json(response.data);
  } catch (error) {
    console.log(error.response);
    throw error;
  }
};
