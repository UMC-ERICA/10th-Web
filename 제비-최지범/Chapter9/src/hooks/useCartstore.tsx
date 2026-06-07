import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import type { CartItems } from "../types/cart";
import { immer } from "zustand/middleware/immer";
import cartItems from "../constants/cartItems";

interface CartActions {
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;

  actions: CartActions;
}

const applyTotals = (state: Pick<CartState, "cartItems" | "amount" | "total">) => {
  state.amount = state.cartItems.reduce((sum, item) => sum + item.amount, 0);
  state.total = state.cartItems.reduce(
    (sum, item) => sum + item.price * item.amount,
    0,
  );
};

export const useCartStore = create<CartState>()(
  immer((set) => ({
    cartItems: cartItems,
    amount: 0,
    total: 0,
    actions: {
      increase: (id: string): void => {
        set((state) => {
          const item = state.cartItems.find((cartItem) => cartItem.id === id);
          if (item) {
            item.amount += 1;
          }
          applyTotals(state);
        });
      },
      decrease: (id: string): void => {
        set((state) => {
          const item = state.cartItems.find((cartItem) => cartItem.id === id);
          if (item) {
            item.amount -= 1;
            if (item.amount <= 0) {
              state.cartItems = state.cartItems.filter(
                (cartItem) => cartItem.id !== id,
              );
            }
          }
          applyTotals(state);
        });
      },
      removeItem: (id: string): void => {
        set((state) => {
          state.cartItems = state.cartItems.filter(
            (cartItem) => cartItem.id !== id,
          );
          applyTotals(state);
        });
      },
      clearCart: (): void => {
        set((state) => {
          state.cartItems = [];
          applyTotals(state);
        });
      },
      calculateTotals: (): void => {
        set((state) => {
          applyTotals(state);
        });
      },
    },
  })),
);

export const useCartInfo = () =>
  useCartStore(
    useShallow((state) => ({
      cartItems: state.cartItems,
      amount: state.amount,
      total: state.total,
    })),
  );

export const useCartActions = () => useCartStore((state) => state.actions);
