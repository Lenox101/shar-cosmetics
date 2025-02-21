import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('cart')) || []
  }),
  actions: {
    addToCart(product, quantity = 1) {
      const existingItem = this.items.find(item => item.product._id === product._id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push({
          product,
          quantity,
          addedAt: new Date()
        });
      }
      
      this.persistCart();
    },
    removeFromCart(productId) {
      this.items = this.items.filter(item => item.product._id !== productId);
      this.persistCart();
    },
    clearCart() {
      this.items = [];
      this.persistCart();
    },
    persistCart() {
      localStorage.setItem('cart', JSON.stringify(this.items));
    }
  },
  getters: {
    totalItems: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    cartTotal: (state) => state.items.reduce((total, item) => 
      total + (item.product.price * item.quantity), 0)
  }
}); 