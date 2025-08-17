import axios from 'axios';

export const TOKEN_KEY = import.meta.env.VITE_AUTH_TOKEN_KEY || 'token';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // e.g., http://127.0.0.1:5001/api
});

api.interceptors.request.use((config) => {
  const t = localStorage.getItem(TOKEN_KEY);
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

export default api;
