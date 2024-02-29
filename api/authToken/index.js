const axios = require("axios");

module.exports = async function (context, req) {
  try {
    var body = {
        UserName: "andrew.keller@chartis.io",
        UserPassword: "Welc0Me$1"
    };

    const response = await axios.post(
      "https://dev-anthonysylvan.creatio.com/ServiceModel/AuthService.svc/Login",
      body
    );

    context.res.json(response.data);
  } catch (error) {
    throw error;
  }
};
