const axios = require("axios");

module.exports = async function (context, req) {
  try {
    var body = {
      userId: 24,
      title: "Test Title",
      body: "Lorem Ipsum A&S",
    };

    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      body
    );

    context.res.json(response.data);
  } catch (error) {
    throw error;
  }
};
