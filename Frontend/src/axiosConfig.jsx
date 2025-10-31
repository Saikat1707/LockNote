import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://lock-note-er1w.vercel.app/api", 
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
