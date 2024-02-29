import axios from "axios";
import config from "../config/config";

// export default axios.create({
//     baseURL: consts.LOCAL_BASE_URL,
//     responseType: "json",
//     headers: {
//         "auth_token": consts.AUTH_TOKEN,
//     }
// })

const apiService = axios.create({
  baseURL: config.API_BASE_URL,
});

export const getAuthToken = async () => {
  try {
    var body = {
      UserName: config.USERNAME,
      UserPassword: config.PASSWORD,
    };

    const response = await apiService.post( "/ServiceModel/AuthService.svc/Login", body );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDummyData = async () => {
  try {
    var body = {
      userId: 24,
      title: "Test Title",
      body: "Lorem Ipsum A&S",
    };

    const response = await apiService.post( "https://jsonplaceholder.typicode.com/posts", body );
    return response.data;
  } catch (error) {
    throw error;
  }
};
