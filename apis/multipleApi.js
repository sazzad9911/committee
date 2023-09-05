const url = "http://158.220.101.235/comity/api";
import axios from "axios";
import localStorage from "../functions/localStorage";

const API = axios.create({
  baseURL: url,
  withCredentials: true,
});
export const post=async(route,data,token)=>API.post(`${url}${route}`,data,{headers:{Authorization:`Bearer ${token}`}})
export const get=async(route,token)=>API.get(`${url}${route}`,{headers:{Authorization:`Bearer ${token}`}})
export const put=async(route,data,token)=>API.put(`${url}${route}`,data,{headers:{Authorization:`Bearer ${token}`}})
export const deletes=async(route,token)=>API.delete(`${url}${route}`,{headers:{Authorization:`Bearer ${token}`}})
