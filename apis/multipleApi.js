const url = "http://158.220.101.235/comity/api";
import axios from "axios";
import localStorage from "../functions/localStorage";
import { io } from "socket.io-client";

export const post = async (route, data, token) =>
  axios.post(`${url}${route}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const get = async (route, token) =>
  axios.get(`${url}${route}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const put = async (route, data, token) =>
  axios.put(`${url}${route}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const deletes = async (route, token) =>
  axios.delete(`${url}${route}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const socket = io("http://158.220.101.235", {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 989538344345623,
});
