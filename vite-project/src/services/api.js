// vite-project/src/services/api.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication services
export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  adminLogin: async (credentials) => {
    const response = await api.post('/auth/admin/login', credentials);
    return response.data;
  }
};

// Club services
export const clubService = {
  getAllClubs: async () => {
    const response = await api.get('/clubs');
    return response.data;
  },
  createClub: async (clubData) => {
    const response = await api.post('/clubs', clubData);
    return response.data;
  },
  updateClub: async (id, clubData) => {
    const response = await api.put(`/clubs/${id}`, clubData);
    return response.data;
  },
  deleteClub: async (id) => {
    const response = await api.delete(`/clubs/${id}`);
    return response.data;
  }
};

export default api;