import axios from "axios";

const axiosInstance = axios.create();

// Intercept all responses
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem("token");
      window.location.href = "/login"; // or a cleaner logout logic
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
