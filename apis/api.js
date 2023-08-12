const url = "https://comity.onrender.com";
import axios from "axios";
import localStorage from "../functions/localStorage";

const API = axios.create({
  baseURL: url,
  withCredentials: true,
});

//Contact

export const newContact = (formData) =>
  API.post("/contact/new/contact", formData);

export const newSupport = (formData) =>
  API.post("/contact/new/support", formData);

//Notice
export const createNotice = (formData) => API.post("/notice/create", formData);
