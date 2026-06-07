import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";
import { modalReducer } from "../slices/modalSlice";

function createStore() {
  const state = configureStore({
    reducer: {
      cart: cartReducer,
      modal: modalReducer,
    },
  });
  return state;
}

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
