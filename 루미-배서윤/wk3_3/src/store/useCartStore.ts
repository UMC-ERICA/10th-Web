import { create } from 'zustand';
import cartItems from '../constants/cartItems';
import type { CartItem } from '../constants/cartItems';

type CartStore = {
  cartItems: CartItem[];
  amount: number;
  total: number;
  isOpen: boolean;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  openModal: () => void;
  closeModal: () => void;
};

const getTotals = (items: CartItem[]) =>
  items.reduce(
    (acc, item) => {
      acc.amount += item.amount;
      acc.total += Number(item.price) * item.amount;
      return acc;
    },
    { amount: 0, total: 0 }
  );

const initialTotals = getTotals(cartItems);

export const useCartStore = create<CartStore>((set) => ({
  cartItems,
  amount: initialTotals.amount,
  total: initialTotals.total,
  isOpen: false,

  increase: (id) =>
    set((state) => {
      const items = state.cartItems.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      );
      return { cartItems: items, ...getTotals(items) };
    }),

  decrease: (id) =>
    set((state) => {
      const target = state.cartItems.find((i) => i.id === id);
      if (!target) return {};
      const items =
        target.amount === 1
          ? state.cartItems.filter((i) => i.id !== id)
          : state.cartItems.map((i) =>
              i.id === id ? { ...i, amount: i.amount - 1 } : i
            );
      return { cartItems: items, ...getTotals(items) };
    }),

  removeItem: (id) =>
    set((state) => {
      const items = state.cartItems.filter((i) => i.id !== id);
      return { cartItems: items, ...getTotals(items) };
    }),

  clearCart: () => set({ cartItems: [], amount: 0, total: 0 }),

  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
