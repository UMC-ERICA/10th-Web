import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../constants/cartItems";
import type { CartItems } from "../types/cart";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;
}

const initialState: CartState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increase: (state, action: PayloadAction<{ id: string }>): void => {
      const itemId = action.payload.id;
      const item = state.cartItems.find(
        (cartItem): boolean => cartItem.id === itemId,
      );
      if (item) {
        item.amount += 1;
      }
    },
    decrease: (state, action: PayloadAction<{ id: string }>): void => {
      const itemId = action.payload.id;
      const item = state.cartItems.find(
        (cartItem): boolean => cartItem.id === itemId,
      );
      if (item) {
        if (item.amount <= 1) {
          item.amount = 0;
          return;
        }
        item.amount -= 1;
      }
    },
    removeItem: (state, action: PayloadAction<{ id: string }>): void => {
      const itemId = action.payload.id;
      state.cartItems = state.cartItems.filter(
        (cartItem): boolean => cartItem.id !== itemId,
      );
    },

    clearCart: (state): void => {
      state.cartItems = [];
    },

    calculateTotals: (state): void => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.price * item.amount;
      });
      state.amount = amount;
      state.total = total;
    },
  },
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } =
  cartSlice.actions;

const cartReducer = cartSlice.reducer;

export default cartReducer;
