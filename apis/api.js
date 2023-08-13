const url = "https://comity.onrender.com";
import axios from "axios";
import localStorage from "../functions/localStorage";

const user = localStorage.getAuth();

const API = axios.create({
  baseURL: url,
  withCredentials: true,
});

API.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${user._j.token}`;
  return req;
});

//Contact

export const newContact = (formData) =>
  API.post("/contact/new/contact", formData);

export const newSupport = (formData) =>
  API.post("/contact/new/support", formData);

//Notice
export const createNotice = (formData) => API.post("/notice/create", formData);
export const getAllNotices = (comityId) =>
  API.get(`/notice/get-all/${comityId}`);
