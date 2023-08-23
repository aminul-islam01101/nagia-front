import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

//Signup
const signup = async (userData, type) => {
  const response = await axios.post(
    `${API_URL}/${type}/account/signup`,
    userData
  );

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//Login
const login = async (userData, type, user) => {
  let headers = {
    headers: { "Content-Type": "application/json", Authorization: "null" },
  };
  const response = await axios.post(
    `${API_URL}/${type}/account/login`,
    userData,
    headers
  );

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  // return response.data;
};

//Login
const forgotpassword = async (userData) => {
  const response = await axios.post(
    `${API_URL}/user/account/forgot-password`,
    userData
  );



  return response.data;
};

//Logout user
const logout = async (user) => {
  const accessToken = user.data.accessToken;
  const response = await axios.get(`${API_URL}/user/account/logout`, {
    headers: { 'Authorization': accessToken },
  });
  if (response.data) {
    localStorage.removeItem("user");
  }

  return response.data;
};

const authService = {
  signup,
  login,
  forgotpassword,
  logout,
};

export default authService;

//Login
