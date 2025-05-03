import {create} from 'zustand';

export const useCartStore = create((set) => ({
  cart: [],
  addToCart: (product, addons, totalPrice) => set((state) => ({
    cart: [...state.cart, { ...product, addons, totalPrice }]
  })),
  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter((item) => item.id !== productId)
  })),
  clearCart: () => set(() => ({
    cart: []
  })),
}));
