import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
  headers : {
    'Content-Type': 'application/json'
  }
})

export const getAuthToken = async () => {
  try {
    const response = await axiosInstance.get( `/api/authToken` );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getConsultants = async ( headerCookies: any, zipCode: any ) => {
  try {
    const response = await axiosInstance.get( `/api/consultants?zip=${zipCode}&cookies=${headerCookies}` );
    return response.data;
  } catch (error) {
    throw error;
  }
};