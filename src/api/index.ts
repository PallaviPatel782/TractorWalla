import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import { useAuthStore } from '@store/useAuthStore';
import { useSnackbarStore } from '@store/useSnackbarStore';

// ==============================
// 🔧 CONFIG
// ==============================
const BASE_URL = 'https://tractorwalla-backend.onrender.com/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ==============================
// 🔄 REFRESH TOKEN LOGIC
// ==============================
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// ==============================
// 🚀 REQUEST INTERCEPTOR
// ==============================
api.interceptors.request.use(
  async config => {
    const state = await NetInfo.fetch();

    if (!state.isConnected || !state.isInternetReachable) {
      useSnackbarStore.getState().showSnackbar({
        type: 'warning',
        title: 'No Internet Connection',
        description: 'Please connect to the internet to continue.',
      });
      return Promise.reject({ message: 'No internet connection' });
    }

    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (__DEV__) {
      console.log(`🚀 [${config.method?.toUpperCase()}] ${config.url}`, config.data || '');
    }

    return config;
  },
  error => Promise.reject(error),
);

// ==============================
// 🚨 RESPONSE INTERCEPTOR
// ==============================
api.interceptors.response.use(
  response => {
    if (__DEV__) {
      console.log(`✅ [${response.status}] ${response.config.url}`, response.data);
    }
    return response.data;
  },
  async error => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized - Token Expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = useAuthStore.getState().refreshToken;

      if (!refreshToken) {
        useAuthStore.getState().logout();
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${BASE_URL}/auth/customer/refresh`, {
          refreshToken,
        });

        const { accessToken } = response.data;
        useAuthStore.getState().setToken(accessToken);

        processQueue(null, accessToken);
        isRefreshing = false;

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError: any) {
        processQueue(refreshError, null);
        isRefreshing = false;
        useAuthStore.getState().logout();
        
        useSnackbarStore.getState().showSnackbar({
          type: 'error',
          title: 'Session Expired',
          description: 'Please login again.',
        });

        return Promise.reject(refreshError);
      }
    }

    if (__DEV__) {
      console.log(`❌ [ERROR] ${error.config?.url}`, error.response?.data || error.message);
    }

    return Promise.reject(error.response?.data || error.message || error);
  },
);

// ==============================
// 🌍 GENERIC API METHODS
// ==============================
export const apiService = {
  get: <T = any>(url: string, config?: any): Promise<T> => api.get(url, config),
  post: <T = any>(url: string, data?: any, config?: any): Promise<T> => api.post(url, data, config),
  put: <T = any>(url: string, data?: any, config?: any): Promise<T> => api.put(url, data, config),
  patch: <T = any>(url: string, data?: any, config?: any): Promise<T> => api.patch(url, data, config),
  delete: <T = any>(url: string, config?: any): Promise<T> => api.delete(url, config),
};

export default api;
