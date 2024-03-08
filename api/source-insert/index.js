const axiosInstance = require('../config/axiosInstance');
const sourceInsertPayload = require('../utils/sourceInsertPayload');

module.exports = async function (context, req) {
  try {
    const body = sourceInsertPayload(req.body);
    console.log(JSON.stringify(body));

    const response = await axiosInstance.post("/0/DataService/json/SyncReply/InsertQuery", body, {
      headers: {
        'BPMCSRF': req.query.bpmcsrf,
        'Cookie': req.query.cookies
      }
    });

    context.res.json(response.data);
  } catch (error) {
    console.log(error.response.data);
    throw error;
  }
};
