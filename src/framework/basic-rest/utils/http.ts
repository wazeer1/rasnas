import axios from "axios";
import { getToken } from "./get-token";

const http = axios.create({
  baseURL: 'https://api.rasnasboutique.com/api/v1/',
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Change request data/error here
http.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear(); // Clear local storage on 401 error
    }
    return Promise.reject(error);
  }
);

export default http;
