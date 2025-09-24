import axios from "axios";

const api = axios.create({
  baseURL: "https://api.redseam.redberryinternship.ge/api",
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  console.log(config.headers);
  return config;
});

export default api;
