
export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
  images: string[];
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface RootState {
  cart: CartState;
  auth: AuthState;
}
