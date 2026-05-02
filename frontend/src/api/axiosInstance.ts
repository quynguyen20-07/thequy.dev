import axios from 'axios';
import { API_ENDPOINTS } from '@app/commons/constant/api';

export const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || 'http://localhost:3000') + API_ENDPOINTS.BASE,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
