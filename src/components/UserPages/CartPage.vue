<template>
  <div class="cart-page">
    <h1>Your Cart</h1>
    <div v-if="cartStore.items.length === 0" class="empty-cart">
      <p>Your cart is empty</p>
      <router-link to="/shop" class="shop-link">Continue Shopping</router-link>
    </div>
    <div v-else>
      <div class="cart-items">
        <div v-for="item in cartStore.items" :key="item.product._id" class="cart-item">
          <img :src="'http://localhost:5000' + item.product.images[0]" 
               class="cart-item-image" />
          <div class="cart-item-info">
            <h3>{{ item.product.name }}</h3>
            <p class="price">Kes {{ item.product.price }}</p>
            <div class="quantity-controls">
              <button @click="updateQuantity(item.product._id, item.quantity - 1)">-</button>
              <input type="number" v-model.number="item.quantity" min="1" />
              <button @click="updateQuantity(item.product._id, item.quantity + 1)">+</button>
            </div>
          </div>
          <button @click="cartStore.removeFromCart(item.product._id)" class="remove-item">
            Remove
          </button>
        </div>
      </div>
      <div class="cart-summary">
        <h3>Order Summary</h3>
        <div class="summary-row">
          <span>Total Items:</span>
          <span>{{ cartStore.totalItems }}</span>
        </div>
        <div class="summary-row total">
          <span>Total:</span>
          <span>Kes {{ cartStore.cartTotal }}</span>
        </div>
        <div class="checkout-form">
          <h3>Checkout Details</h3>
          <div class="form-group">
            <label>Phone Number:</label>
            <input 
              v-model="phoneNumber" 
              type="tel" 
              placeholder="Enter your Contact phone number"
              required
            />
          </div>
          <div class="form-group">
            <label>Email:</label>
            <input 
              v-model="email" 
              type="email" 
              placeholder="Enter your email"
              required
            />
          </div>
          <button 
            @click="makeOrder" 
            class="checkout-btn"
            :disabled="loading || !phoneNumber || !email"
          >
            {{ loading ? 'Processing...' : 'Confirm Order' }}
          </button>
          <p v-if="error" class="error-message">{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '@/stores/cartStore';
import axios from '@/axiosConfig';

export default {
  name: 'CartPage',
  setup() {
    const cartStore = useCartStore();
    return { cartStore };
  },
  data() {
    return {
      phoneNumber: '',
      email: '',
      loading: false,
      error: null
    };
  },
  methods: {
    updateQuantity(productId, newQuantity) {
      if (newQuantity < 1) return;
      const item = this.cartStore.items.find(item => item.product._id === productId);
      if (item) {
        item.quantity = newQuantity;
        this.cartStore.persistCart();
      }
    },
    async makeOrder() {
      this.loading = true;
      this.error = null;
      
      try {
        const orderData = {
          phoneNumber: this.phoneNumber,
          email: this.email,
          products: this.cartStore.items.map(item => ({
            productId: item.product._id,
            quantity: item.quantity
          })),
          totalAmount: this.cartStore.cartTotal
        };

        const response = await axios.post('/orders', orderData);
        
        this.cartStore.clearCart();
        this.$router.push({
          name: 'MyOrders',
          params: { newOrder: response.data.order._id }
        });

      } catch (error) {
        this.error = 'Failed to place order. Please try again.';
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.cart-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}
.shop-link{
   text-decoration: none;
   color: black;
   background-color: #42b983;
   padding: 0.5rem 1rem;
   border-radius: 4px;
   font-weight: 500;
   margin-top: 1rem;
}
.cart-item {
  display: flex;
  gap: 2rem;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  align-items: center;
}

.cart-item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.quantity-controls {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.quantity-controls button {
  padding: 0.25rem 0.5rem;
  border: 1px solid #ddd;
  background: #f5f5f5;
  cursor: pointer;
}

.quantity-controls input {
  width: 50px;
  padding: 0.25rem;
  text-align: center;
}

.cart-summary {
  margin-top: 2rem;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 8px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
}

.checkout-form {
  margin-top: 2rem;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input,
.form-group select {
  width: 90%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.checkout-btn {
  width: 100%;
  padding: 1rem;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
}

.checkout-btn:hover {
  background: #3aa876;
}

.error-message {
  color: #dc3545;
  margin-top: 1rem;
}

.remove-item {
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  margin-left: auto;
}

.remove-item:hover {
  background: #c82333;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(220, 53, 69, 0.2);
}

/* Add to existing media query */
@media (max-width: 768px) {
  .remove-item {
    width: 100%;
    margin-top: 0.5rem;
  }
}
</style> 