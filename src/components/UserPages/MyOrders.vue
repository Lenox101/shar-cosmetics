<template>
  <div class="my-orders">
    <div class="header-container">
      <h1>My Orders</h1>
      <div class="header-decoration"></div>
    </div>
    <div class="orders-container">
      <div v-if="loading" class="loading">
        Loading orders...
      </div>
      <div v-else-if="error" class="error">
        {{ error }}
      </div>
      <div v-else-if="orders.length === 0" class="no-orders">
        <div class="empty-state">
          <span class="empty-icon">📦</span>
          <h2>No Orders Yet</h2>
          <p>Your order history will appear here</p>
          <router-link to="/shop" class="shop-button">Start Shopping</router-link>
        </div>
      </div>
      <div v-else class="orders-list">
        <div v-for="order in orders" :key="order._id" class="order-card">
          <div class="order-header">
            <div class="order-meta">
              <p class="order-date">{{ formatDate(order.createdAt) }}</p>
              <div class="status-container">
                <span :class="['status-badge', `status-${order.status}`]">
                  Delivery Status:
                  {{ order.status }}
                </span>
                <span :class="['payment-status', `payment-${order.paymentStatus}`]">
                  Payment Status:
                  {{ order.paymentStatus }}
                </span>
              </div>
            </div>
            <div class="order-total">
              <span>Total:</span>
              <span class="amount">Kes {{ order.totalAmount }}</span>
            </div>
          </div>
          <div class="order-details">
            <div class="order-products">
              <div v-for="item in order.products" :key="item.product._id" class="product-item">
                <div class="product-image-container">
                  <img 
                    :src="'http://localhost:5000' + item.product.images[0]" 
                    class="product-image"
                  />
                </div>
                <div class="product-info">
                  <h4>{{ item.product.name }}</h4>
                  <div class="product-meta">
                    <p>Qty: {{ item.quantity }}</p>
                    <p>Kes {{ item.priceAtPurchase }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/axiosConfig';

export default {
  name: 'MyOrders',
  data() {
    return {
      orders: [],
      loading: false,
      error: null
    };
  },
  methods: {
    async fetchOrders() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get('/my-orders');
        this.orders = response.data;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Handled by axios interceptor
          return;
        }
        console.error('Error fetching orders:', error);
        this.error = 'Failed to load orders. Please try again later.';
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
  },
  mounted() {
    this.fetchOrders();
  }
};
</script>

<style scoped>
.my-orders {
  max-width: 100%;
  margin: 0;
  padding: 2rem 12rem;
  background: linear-gradient(135deg, #b94295, #2c3e50);
  min-height: 100vh;
}

.header-container {
  position: relative;
  margin-bottom: 3rem;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  color: white;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
}

.header-decoration {
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background: white;
  border-radius: 2px;
}

.no-orders {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.empty-state {
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
}

.empty-icon {
  font-size: 4rem;
  display: block;
  margin-bottom: 1.5rem;
}

.shop-button {
  background: white;
  color: #FF69B4; /* Hot pink */
  border: none;
}

.shop-button:hover {
  background: #FF69B4;
  color: white;
}

.orders-list {
  display: grid;
  gap: 1.5rem;
}

.order-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5rem;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.order-meta {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.order-date {
  color: #666;
  font-size: 0.9rem;
}

.status-container {
  display: flex;
  gap: 0.5rem;
}

.status-badge, .payment-status {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: capitalize;
}

.order-total {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
}

.amount {
  font-weight: 600;
  color: #2c3e50;
}

.product-item {
  display: flex;
  gap: 1.5rem;
  padding: 1rem 0;
  align-items: center;
}

.product-image-container {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info h4 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.product-meta {
  display: flex;
  gap: 1rem;
  color: #666;
  font-size: 0.9rem;
}

/* Status colors */
.status-pending { background: #fff3e0; color: #e65100; }
.status-processing { background: #e3f2fd; color: #1565c0; }
.status-completed { background: #e8f5e9; color: #2e7d32; }
.status-cancelled { background: #ffebee; color: #c62828; }

.payment-pending { background: #fff3e0; color: #e65100; }
.payment-completed { background: #e8f5e9; color: #2e7d32; }
.payment-failed { background: #ffebee; color: #c62828; }

.loading, .error {
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
}

.error {
  color: #dc3545;
}

@media (max-width: 768px) {
  .my-orders {
    padding: 2rem 1rem;
  }

  h1 {
    font-size: 2rem;
  }

  .order-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .product-item {
    flex-direction: column;
    text-align: center;
  }

  .product-image-container {
    width: 120px;
    height: 120px;
  }
}
</style> 