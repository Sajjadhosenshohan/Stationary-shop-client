import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {  TOrderProduct } from '../../../types';

// ✅ Local Storage থেকে Cart Data পাওয়ার ফাংশন
const loadCartFromLocalStorage = (): TOrderProduct[] => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

// ✅ Initial State - Local Storage থেকে Data লোড করবো
interface CartState {
  items: TOrderProduct[];
}

const initialState: CartState = {
  items: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<TOrderProduct>) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );
      // console.log(loadCartFromLocalStorage(), "sob items")
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.items)); // ✅ Local Storage-এ Save
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items)); // ✅ Local Storage Update
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ _id: string; quantity: number }>
    ) => {
      const item = state.items.find((item) => item._id === action.payload._id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      localStorage.setItem("cart", JSON.stringify(state.items)); // ✅ Local Storage Update
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart"); // ✅ Local Storage Clear
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
