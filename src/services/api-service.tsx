import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
  headers : {
    'Content-Type': 'application/json'
  }
})

//TODO: SECURE ENDPOINT
export const getAuthToken = async () => {
  try {
    const response = await axiosInstance.get( `/api/authToken` );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getConsultants = async ( headers: any, zipCode: any ) => {
  try {
    const response = await axiosInstance.get( `/api/consultants?zip=${zipCode}&cookies=${headers.cookies}` );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const insertLeads = async ( headers: any, leadModel: any ) => {
  try {
    const response = await axiosInstance.post( `/api/lead-insert?bpmcsrf=${headers.bpmcsrf}&cookies=${headers.cookies}`, leadModel );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const selectSource = async ( headers: any, sourceModel: any ) => {
  try {
    const response = await axiosInstance.post( `/api/source-select?bpmcsrf=${headers.bpmcsrf}&cookies=${headers.cookies}`, sourceModel );
    return response.data;
  } catch (error) {
    throw error;
  }
};