
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, CartItem } from './types';

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

interface AddToCartPayload {
  _id: string;
  name: string;
  price: number;
  images: string[];
}

interface UpdateQuantityPayload {
  id: string;
  quantity: number;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item._id === newItem._id);
      
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += newItem.price;
      } else {
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }
      
      state.totalQuantity += 1;
      state.totalAmount += newItem.price;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item._id === id);
      
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.totalPrice;
        state.items = state.items.filter(item => item._id !== id);
      }
    },
    updateQuantity: (state, action: PayloadAction<UpdateQuantityPayload>) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item._id === id);
      
      if (existingItem && quantity > 0) {
        const difference = quantity - existingItem.quantity;
        existingItem.quantity = quantity;
        existingItem.totalPrice = existingItem.price * quantity;
        state.totalQuantity += difference;
        state.totalAmount += difference * existingItem.price;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
