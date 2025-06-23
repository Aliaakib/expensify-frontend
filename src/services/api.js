// src/services/api.js
import axios from "axios";

// Use environment variable from .env
// ✅ Correct baseURL for frontend
const API = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_APP_API_URL}/api`,
});

// Attach token to each request if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
