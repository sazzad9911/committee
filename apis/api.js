const url = "http://158.220.101.235/comity/api";
import axios from "axios";
import localStorage from "../functions/localStorage";

const user = localStorage.getAuth();

const API = axios.create({
  baseURL: url,
  withCredentials: true,
});

API.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${user?._j?.token}`;
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
export const deleteNotice = (noticeId) =>
  API.delete(`/notice/delete/${noticeId}`);
export const updateNotice = (noticeId, formData) =>
  API.put(`/notice/update/${noticeId}`, formData);

//Comity
export const getRecentComities = () => API.get("/comity/get-recent");
export const updateComity = (formData) => API.put("/comity/update", formData);
export const getPopularComities = () => API.get("/comity/get-popular");
export const searchComities = (q) => API.get(`/comity/search?q=${q}`);
export const getComityById = (comityId) => API.get(`/comity/get/${comityId}`);

//Auth
export const updateProfile = (formData) =>
  API.post(`/auth/profile/update`, formData);
export const sendRecoverOtp = (formData) =>
  API.post(`/auth/reset/send-otp`, formData);
export const getProfile = () => API.get(`/auth/profile/get`);

//Chat
export const getUserConversations = () =>
  API.get("/chat/conversation/get-by-user");
export const getComityConversations = (comityId) =>
  API.get(`/chat/conversation/get/${comityId}`);
export const getMessages = (conversationId) =>
  API.get(`/chat/message/get/${conversationId}`);
export const sendMessage = (formData) =>
  API.post(`/chat/message/new`, formData);

//Subs
export const getPaidCollectionsByUser = () =>
  API.get("/subs/get-paid-collections-by-user");
export const getUnpaidCollectionsByUser = () =>
  API.get("/subs/get-unpaid-collections-by-user");
