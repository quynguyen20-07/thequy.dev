import { API_ENDPOINTS } from "@app/commons/constant/api";
import axios from "axios";

export const api = axios.create({
  baseURL:
    (import.meta.env.VITE_API_URL || "http://localhost:3000") +
    API_ENDPOINTS.BASE,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("admin_token");
      if (
        window.location.pathname.startsWith("/admin") &&
        window.location.pathname !== "/admin/login"
      ) {
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  },
);
