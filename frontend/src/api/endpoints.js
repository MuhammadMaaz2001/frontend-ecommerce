const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ENDPOINTS = {
  PRODUCTS: `${BASE_URL}/products`,
  USERS: {
    LOGIN: `${BASE_URL}/users/login`,
    REGISTER: `${BASE_URL}/users/register`,
    PROFILE: `${BASE_URL}/users/profile`,
  },
  ORDERS: `${BASE_URL}/orders`,
};

export default ENDPOINTS;
