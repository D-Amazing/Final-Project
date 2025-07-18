// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
// Import the cart reducer from the cartSlice file
import cartReducer from '../features/cartSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store; 