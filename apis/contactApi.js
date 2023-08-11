const url = "https://comity.onrender.com";
import axios from "axios";
import localStorage from "../functions/localStorage";

const API = axios.create({
  baseURL: url,
  withCredentials: true,
});

export const newContact = (formData) =>
  API.post("/contact/new/contact", formData);
