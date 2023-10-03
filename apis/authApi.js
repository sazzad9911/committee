
//const url="http://158.220.101.235/comity/api"
const url = "https://comity.onrender.com";
import axios from "axios"

import localStorage from "../functions/localStorage";

const userLogin = async (email, password) => {
  const response = await axios.post(`${url}/auth/login`, {
    phone: email,
    password: password,
  });

  if (response.data) {
    await localStorage.storeData("user", response.data);
    return response.data;
  }
  return response;
};
const checkUser = async () => {
  const res = await localStorage.getData("user");
  return res;
};
const logOut = async () => {
  const res = await localStorage.storeData("user", null);
  return res;
};
const vendorLogin = async (token, id) => {
  const result = await axios.get(`${url}/services/get/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (result) {
    const res = await localStorage.storeData("vendor", result.data);
    return result.data;
  }
  return false;
};
const checkVendor = async () => {
  const res = await localStorage.getData("vendor");
  return res;
};
const logoutVendor = async () => {
  const res = await localStorage.storeData("vendor", null);
  return res;
};
const setFavoriteCategories = async (token, category) => {
  const res = await axios.post(
    `${url}/auth/toggle-favourite-category`,
    {
      category: category,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res;
};
const getFavoriteCategories = async (token) => {
  const res = await axios.get(`${url}/auth/get-favourite-categories`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};
const sendOTP = async (number) => {
  const res = await axios.post(`${url}/auth/register/send-otp`, {
    phone: number,
  });
  return res;
};
const resetUser = async (number) => {
  const res = await axios.post(`${url}/auth/reset/send-otp`, {
    phone: number,
  });
  return res;
};
const checkResetUser = async (number, otp) => {
  const res = await axios.post(`${url}/auth/reset/verify-otp`, {
    phone: number,
    otp: otp,
  });
  return res;
};
const resetUserPassword = async (token, password) => {
  const res = await axios.post(`${url}/auth/reset`, {
    token: token,
    password: password,
  });
  return res;
};
const checkOTP = async (number, otp) => {
  const res = await axios.post(`${url}/auth/register/verify-otp`, {
    phone: number,
    otp: otp,
  });
  return res;
};
const registerUser = async (token, name, username, password, age, gender) => {
  const res = await axios.post(`${url}/auth/register`, {
    token: token,
    name: name,
    username: username,
    password: password,
    age: age,
    gender: gender,
  });
  return res;
};
const updateDeviceToken = async (token, deviceToken) => {
  const res = await axios.put(
    `${url}/auth/update-device-token`,
    {
      deviceToken: deviceToken,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res;
};
const removeDeviceToken = async (token, deviceToken) => {
  const res = await axios.put(
    `${url}/auth/remove-device-token`,
    {
      deviceToken: deviceToken,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res;
};
export const createComity = async (
  name,
  phone,
  division,
  district,
  thana,
  address,
  about,
  token
) => {
  const res = await axios.post(
    `${url}/comity/create`,
    {
      name: name,
      phone: phone,
      division: division,
      district: district,
      thana: thana,
      address: address,
      about: about,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res;
};
export {
  userLogin,
  checkUser,
  logOut,
  checkVendor,
  logoutVendor,
  vendorLogin,
  getFavoriteCategories,
  setFavoriteCategories,
  sendOTP,
  checkOTP,
  registerUser,
  resetUser,
  checkResetUser,
  resetUserPassword,
  updateDeviceToken,
  removeDeviceToken,
};
