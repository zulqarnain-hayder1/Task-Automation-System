import axios from 'axios';

const API_URL = '/api';

const api = {
  // Task endpoints
  getAllTasks: () => axios.get(`${API_URL}/tasks`),
  
  getTaskById: (id) => axios.get(`${API_URL}/tasks/${id}`),
  
  createTask: (taskData) => axios.post(`${API_URL}/tasks`, taskData),
  
  updateTask: (id, taskData) => axios.put(`${API_URL}/tasks/${id}`, taskData),
  
  deleteTask: (id) => axios.delete(`${API_URL}/tasks/${id}`),
  
  getUpcomingTasks: () => axios.get(`${API_URL}/tasks/upcoming`),
  
  getTaskStats: () => axios.get(`${API_URL}/tasks/stats/overview`),
  
  searchTasks: (params) => axios.get(`${API_URL}/tasks/search`, { params }),
  
  sendReminder: (id) => axios.post(`${API_URL}/tasks/${id}/remind`),
  
  // User endpoints
  getAllUsers: () => axios.get(`${API_URL}/users`),
  
  getUserById: (id) => axios.get(`${API_URL}/users/${id}`),
  
  createUser: (userData) => axios.post(`${API_URL}/users`, userData),
  
  updateUser: (id, userData) => axios.put(`${API_URL}/users/${id}`, userData),
  
  deleteUser: (id) => axios.delete(`${API_URL}/users/${id}`),
  
  getUsersByRole: (role) => axios.get(`${API_URL}/users/role/${role}`),
};

// Add request interceptor for logging
axios.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export default api;
