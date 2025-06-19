import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://3.39.233.161/",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/token/refresh")
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          "https://3.39.233.161/api/auth/token/refresh",
          {},
          {
            withCredentials: true,
          }
        );

        const newAccessToken = res.data.data.accessToken;

        sessionStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshErr) {
        console.error("토큰 재발급 실패", refreshErr);
        sessionStorage.removeItem("accessToken");
        window.location.href = "/login"; 
      }
    }

    return Promise.reject(error);
  }
);
export default axiosInstance;
