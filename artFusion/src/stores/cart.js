// src/store/cart.js
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [],
  }),
  actions: {
    addToCart(product) {
      this.cartItems.push(product);
    },
    removeFromCart(product) {
      const index = this.cartItems.indexOf(product);
      if (index > -1) {
        this.cartItems.splice(index, 1);
      }
    },
    clearCart() {
      this.cartItems = [];
    },
  },
});
