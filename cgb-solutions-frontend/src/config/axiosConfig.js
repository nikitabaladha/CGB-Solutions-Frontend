import Axios from "axios";

const baseURL = "http://localhost:3001/api";

const axiosInstance = Axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
