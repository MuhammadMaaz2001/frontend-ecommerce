
import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

console.log('API Base URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  console.log('Making API request to:', config.baseURL + config.url);
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('API Response successful:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API Error:', error.message);
    console.error('API Error Details:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

// Types
interface User {
  _id: string;
  name: string;
  email: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  category: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface ReviewData {
  rating: number;
  comment: string;
}

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  product: string;
}

interface OrderData {
  orderItems: OrderItem[];
  totalPrice: number;
}

// Auth API
export const authAPI = {
  register: (userData: RegisterData): Promise<AxiosResponse<{ user: User; token: string }>> => {
    const formData = new FormData();
    Object.keys(userData).forEach(key => {
      formData.append(key, userData[key as keyof RegisterData]);
    });
    return api.post('/users/register', formData);
  },
  
  login: (credentials: LoginCredentials): Promise<AxiosResponse<{ user: User; token: string }>> => {
    const formData = new FormData();
    Object.keys(credentials).forEach(key => {
      formData.append(key, credentials[key as keyof LoginCredentials]);
    });
    return api.post('/users/login', formData);
  },
  
  getProfile: (): Promise<AxiosResponse<User>> => api.get('/users/profile'),
};

// Products API
export const productsAPI = {
  getAll: (): Promise<AxiosResponse<Product[]>> => {
    console.log('Fetching all products...');
    return api.get('/products');
  },
  getById: (id: string): Promise<AxiosResponse<Product>> => api.get(`/products/${id}`),
  create: (productData: any): Promise<AxiosResponse<Product>> => {
    const formData = new FormData();
    Object.keys(productData).forEach(key => {
      if (key === 'images') {
        Array.from(productData[key]).forEach((file: any) => {
          formData.append('images', file);
        });
      } else {
        formData.append(key, productData[key]);
      }
    });
    return api.post('/products', formData);
  },
  addReview: (productId: string, reviewData: ReviewData): Promise<AxiosResponse<any>> => {
    const formData = new FormData();
    Object.keys(reviewData).forEach(key => {
      formData.append(key, reviewData[key as keyof ReviewData].toString());
    });
    return api.post(`/products/${productId}/reviews`, formData);
  },
  getReviews: (productId: string): Promise<AxiosResponse<any[]>> => api.get(`/products/${productId}/reviews`),
};

// Orders API
export const ordersAPI = {
  create: (orderData: OrderData): Promise<AxiosResponse<any>> => {
    const formData = new FormData();
    formData.append('orderItems', JSON.stringify(orderData.orderItems));
    formData.append('totalPrice', orderData.totalPrice.toString());
    return api.post('/orders', formData);
  },
  getMyOrders: (): Promise<AxiosResponse<any[]>> => api.get('/orders/my'),
  getById: (id: string): Promise<AxiosResponse<any>> => api.get(`/orders/${id}`),
};

export default api;
