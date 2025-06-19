import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://3.39.233.161/",
    baseURL: "http://localhost:8080/",

  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
