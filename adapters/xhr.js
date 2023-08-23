import Axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

//CREATE AXIOS INSTANCE
function returnAxiosInstance(accessToken) {
  return Axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
    validateStatus(status) {
      return status < 500; // Resolve only if the status code is less than 500
    },
  });
}

//GET REQUEST
export function get(url, requestData) {
  const axios = returnAxiosInstance();
  if (requestData) {
    return axios.get(url, { params: requestData });
  }
  return axios.get(url);
}

//POST REQUEST
export function post(url, requestData, accessToken) {
  const axios = returnAxiosInstance(accessToken);
  const res = axios.post(url, requestData).then((res) => {
    localStorage.setItem("user", JSON.stringify(res.data));
    return res;
  });
  return res;
}

//PATCH REQUEST
export function patch(url, requestData) {
  const axios = returnAxiosInstance();
  return axios.patch(url, requestData);
}
