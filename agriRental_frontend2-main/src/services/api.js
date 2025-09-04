import axios from 'axios';

// Dynamic API base URL for different environments
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://agrirent-backend-tpv9.onrender.com' // Your backend URL
  : 'http://localhost:8000';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method.toUpperCase()} ${API_BASE_URL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Auth Service
export const authService = {
  login: async (email, password) => {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  },
  
  register: async (userData) => {
    const response = await api.post('/api/auth/register', userData);
    return response.data;
  }
};

// Equipment Service
export const equipmentService = {
  getAll: async (params = {}) => {
    const response = await api.get('/api/equipment', { params });
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/api/equipment/${id}`);
    return response.data;
  },
  
  create: async (equipmentData) => {
    const response = await api.post('/api/equipment', equipmentData);
    return response.data;
  },
  
  update: async (id, equipmentData) => {
    const response = await api.put(`/api/equipment/${id}`, equipmentData);
    return response.data;
  },
  
  delete: async (id, ownerId) => {
    const response = await api.delete(`/api/equipment/${id}`, {
      data: { owner: ownerId }
    });
    return response.data;
  },
  
  getCategories: async () => {
    const response = await api.get('/api/equipment/categories');
    return response.data;
  },
  
  getLocations: async () => {
    const response = await api.get('/api/equipment/locations');
    return response.data;
  },

  getUnavailableDates: async (equipmentId) => {
    const response = await api.get(`/api/equipment/${equipmentId}/unavailable-dates`);
    return response.data;
  }
};

// Booking Service
export const bookingService = {
  getAll: async (params = {}) => {
    const response = await api.get('/api/bookings2', { params });
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/api/bookings2/${id}`);
    return response.data;
  },
  
  create: async (bookingData) => {
    const response = await api.post('/api/bookings2', bookingData);
    return response.data;
  },
  
  createPaymentHold: async (bookingData) => {
    const response = await api.post('/api/bookings2/payment-hold', bookingData);
    return response.data;
  },
  
  confirmPayment: async (bookingId, paymentData) => {
    const response = await api.put(`/api/bookings2/${bookingId}/confirm-payment`, paymentData);
    return response.data;
  },
  
  failPayment: async (bookingId) => {
    const response = await api.put(`/api/bookings2/${bookingId}/fail-payment`);
    return response.data;
  },
  
  cancelPayment: async (bookingId) => {
    const response = await api.put(`/api/bookings2/${bookingId}/cancel-payment`);
    return response.data;
  },
  
  accept: async (bookingId, ownerId) => {
    const response = await api.put(`/api/bookings2/${bookingId}/accept`, { ownerId });
    return response.data;
  },
  
  reject: async (bookingId, ownerId) => {
    const response = await api.put(`/api/bookings2/${bookingId}/reject`, { ownerId });
    return response.data;
  },
  
  complete: async (bookingId, ownerId) => {
    const response = await api.put(`/api/bookings2/${bookingId}/complete`, { ownerId });
    return response.data;
  },
  
  checkAvailability: async (equipmentId, params) => {
    const response = await api.get(`/api/bookings2/availability/${equipmentId}`, { params });
    return response.data;
  },
  
  cancelSpecificDates: async (bookingId, datesToCancel, userId) => {
    const response = await api.put(`/api/bookings2/${bookingId}/cancel-dates`, {
      datesToCancel,
      userId
    });
    return response.data;
  }
};

// User Service
export const userService = {
  getAll: async (params = {}) => {
    const response = await api.get('/api/users', { params });
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/api/users/${id}`);
    return response.data;
  },
  
  update: async (id, userData) => {
    const response = await api.put(`/api/users/${id}`, userData);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/api/users/${id}`);
    return response.data;
  }
};

// Export the axios instance for direct use if needed
export { api };