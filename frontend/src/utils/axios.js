import axios from "axios";
import Cookie from "js-cookie";

const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

Axios.interceptors.request.use((config) => {
  const token = Cookie.get("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default Axios;
