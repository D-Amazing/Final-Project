// features/cartSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: JSON.parse(sessionStorage.getItem('cart') || '[]'),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      sessionStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(item => item.id !== action.payload);
      sessionStorage.setItem('cart', JSON.stringify(state.items));
    },
    clearCart(state) {
      state.items = [];
      sessionStorage.removeItem('cart');
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer; 