import axios from "axios";
import { baseUrl } from "./urls";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Modify the request config before sending
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Modify the response data before handling
    return response;
  },
  (error) => {
    // Handle response errors
    if (error.response.status === 401) {
      // Handle unauthorized error
      if (location != "/login") {
        location = "/login";
        const interval = setInterval(() => {
          clearInterval(interval);
        }, 3000);
      }

      // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
