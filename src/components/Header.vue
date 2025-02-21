<template>
  <nav class="navbar">
    <router-link to="/" class="logo">
      <img src="../assets/logo.jpeg" alt="Shar Cosmetics Logo" class="logo-img" />
      <span class="logo-text">Shar Cosmetics</span>
    </router-link>

    <!-- Hamburger Menu for Mobile -->
    <button class="hamburger" @click="toggleMenu" :class="{ active: isMenuOpen }">
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    </button>

    <!-- Navigation Links -->
    <div class="nav-links" :class="{ active: isMenuOpen }">
      <router-link to="/shop">Shop</router-link>
      <a href="#about">About</a>
      <a href="#" @click.prevent="showContactPopup = true">Contact</a>
      <div class="user-menu" @click="toggleUserMenu" v-if="isLoggedIn">
        <span class="user-icon">👤</span>
        <div class="user-dropdown" v-show="showUserMenu">
          <router-link to="/my-orders" class="dropdown-item">
            <span class="item-icon">📦</span>
            My Orders
          </router-link>
          <a href="#" class="dropdown-item" @click="logout">
            <span class="item-icon">↪️</span>
            Logout
          </a>
        </div>
      </div>
      <router-link v-else to="/login" class="login-button">Login</router-link>
    </div>

    <!-- Cart Icon -->
    <div class="cart-icon" @click="toggleCart">
      🛒
      <span class="cart-count">{{ cartStore.totalItems }}</span>
      <div class="cart-preview" v-show="showCartPreview">
        <div v-if="cartStore.items.length === 0" class="empty-cart">
          Your cart is empty
        </div>
        <div v-else>
          <div v-for="item in cartStore.items" :key="item.product._id" class="cart-item">
            <img :src="'http://localhost:5000' + item.product.images[0]" 
                 class="cart-item-image" />
            <div class="cart-item-details">
              <h4>{{ item.product.name }}</h4>
              <p>Kes {{ item.product.price }} x {{ item.quantity }}</p>
            </div>
            <button @click="cartStore.removeFromCart(item.product._id)" class="remove-item">
              <svg viewBox="0 0 24 24" class="remove-icon">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>
          <div class="cart-total">
            Total: Kes {{ cartStore.cartTotal }}
          </div>
          <router-link to="/cart" class="view-cart-btn">View Cart</router-link>
        </div>
      </div>
    </div>
  </nav>

  <!-- Contact Popup -->
  <div v-if="showContactPopup" class="popup-overlay" @click="showContactPopup = false">
    <div class="contact-popup" @click.stop>
      <button class="close-button" @click="showContactPopup = false">&times;</button>
      <h2>Contact Us</h2>
      <div class="contact-info">
        <div class="contact-item">
          <span class="icon">📞</span>
          <div>
            <h3>Phone</h3>
            <p>+1 234 567 8900</p>
          </div>
        </div>
        <div class="contact-item">
          <span class="icon">✉️</span>
          <div>
            <h3>Email</h3>
            <p>info@sharcosmetics.com</p>
          </div>
        </div>
        <div class="contact-item">
          <span class="icon">📍</span>
          <div>
            <h3>Address</h3>
            <p>123 Beauty Street, NY 10001</p>
          </div>
        </div>
      </div>
      <div class="social-links">
        <a href="#" class="social-icon">
          <span class="social-emoji">📸</span>
        </a>
        <a href="#" class="social-icon">
          <span class="social-emoji">✈️</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '@/stores/cartStore';

export default {
  name: 'SiteHeader',
  setup() {
    const cartStore = useCartStore();
    return { cartStore };
  },
  data() {
    return {
      showContactPopup: false,
      isMenuOpen: false,
      showUserMenu: false,
      isLoggedIn: !!localStorage.getItem('userToken'), // Check if token exists
      showCartPreview: false
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu;
    },
    logout() {
      localStorage.removeItem('userToken');
      this.isLoggedIn = false;
      this.$router.push('/login');
    },
    toggleCart() {
      this.showCartPreview = !this.showCartPreview;
    }
  },
  mounted() {
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.user-menu')) {
        this.showUserMenu = false;
      }
      if (!e.target.closest('.cart-icon')) {
        this.showCartPreview = false;
      }
    });
    
    // Close cart when navigating
    this.$watch(
      () => this.$route.path,
      () => {
        this.showCartPreview = false;
      }
    );
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5%;
  background-color: #333;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  cursor: pointer;
}

.logo-img {
  height: 40px;
  width: auto;
  border-radius: 50%;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-links a {
  text-decoration: none;
  color: #fff;
  font-weight: 500;
  font-size: 1rem;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #ccc;
}

/* Hamburger Menu */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.hamburger-line {
  width: 30px;
  height: 3px;
  background-color: #fff;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.hamburger.active .hamburger-line:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.hamburger.active .hamburger-line:nth-child(2) {
  opacity: 0;
}

.hamburger.active .hamburger-line:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

/* Mobile Styles */
@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .nav-links {
    position: fixed;
    top: 70px;
    right: 0;
    left: 0;
    background-color: #333;
    flex-direction: column;
    width: 100%;
    align-items: center;
    gap: 1.5rem;
    padding: 1.5rem;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    height: calc(40vh - 20px); /* Full viewport height minus header */
    z-index: 999;
  }

  .nav-links.active {
    transform: translateX(0);
  }

  .nav-links a {
    width: 100%;
    text-align: center;
    padding: 0.75rem;
    font-size: 1.1rem;
  }

  .login-button {
    width: 100%;
    max-width: 200px;
    text-align: center;
    padding: 1rem;
    margin: 0.5rem 0;
    font-size: 1.1rem;
  }

  .user-menu {
    width: 100%;
    text-align: center;
    position: static; /* Reset positioning */
  }

  .user-icon {
    font-size: 2.75rem;
  }

  .user-dropdown {
    position: static; /* Remove absolute positioning */
    width: 100%;
    margin-top: 0.5rem;
    box-shadow: none;
    background-color: #444;
  }

  .dropdown-item {
    padding: 1rem;
    font-size: 1.1rem;
  }

  .item-icon {
    font-size: 1.4rem;
    margin-right: 0.75rem;
  }
}

/* Popup Styles */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
  backdrop-filter: blur(5px);
}

.contact-popup {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  position: relative;
  animation: slideIn 0.3s ease-out;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

.contact-popup h2 {
  font-size: 1.75rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.contact-item .icon {
  font-size: 1.5rem;
  color: #42b983;
  min-width: 40px;
  height: 40px;
  background: #f5f5f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-item h3 {
  font-size: 1.1rem;
  color: #333;
  margin: 0;
}

.contact-item p {
  font-size: 0.95rem;
  color: #666;
  margin: 0.2rem 0 0;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
  border-top: 1px solid #eee;
  padding-top: 1.5rem;
}

.social-icon {
  width: 45px;
  height: 45px;
  background-color: #f5f5f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-icon:hover {
  background-color: #42b983;
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(66, 185, 131, 0.2);
}

.social-emoji {
  font-size: 1.4rem;
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .contact-popup {
    width: 65%;
    padding: 1.5rem;
  }
}

.user-menu {
  position: relative;
  cursor: pointer;
  padding: 0.5rem;
  color: black;
}

.user-icon {
  font-size: 1.5rem;
  color: white;
}

.user-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: black;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 180px;
  padding: 0;
  z-index: 1000;
  animation: dropdownFade 0.2s ease;
  overflow: hidden;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: #fff;
  text-decoration: none;
  font-size: 0.95rem;
  transition: background-color 0.2s ease;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #444;
}

.dropdown-item:last-child {
  border-bottom: none;
}

.dropdown-item:hover {
  background-color: #333;
  width: 100%;
}

.item-icon {
  margin-right: 0.75rem;
  font-size: 1.2rem;
}

.login-button {
  background-color: #42b983;
  color: white;
  padding: 12px 20px;
  border-radius: 6px;
  text-decoration: none;
  transition: background-color 0.3s ease, transform 0.2s ease;
  font-size: 1rem;
  font-weight: 500;
}

.login-button:hover {
  background-color: #3aa876;
  transform: translateY(-2px);
}

@keyframes dropdownFade {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Add cart styles */
.cart-icon {
  position: relative;
  cursor: pointer;
  margin-left: 1rem;
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #42b983;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.8rem;
}
.cart-preview {
  position: absolute;
  right: 0;
  top: 100%;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  z-index: 1000;
}

.cart-item {
  display: flex;
  gap: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.cart-item-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}

.remove-item {
  background: transparent;
  border: none;
  width: 24px;
  height: 24px;
  padding: 4px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-item:hover {
  background: rgba(255, 0, 0, 0.1);
}

.remove-icon {
  width: 16px;
  height: 16px;
  fill: #ff4757;
  transition: transform 0.2s ease;
}

.remove-item:hover .remove-icon {
  transform: rotate(90deg);
}

.view-cart-btn {
  display: block;
  text-align: center;
  background: #42b983;
  color: white;
  padding: 0.5rem;
  border-radius: 4px;
  margin-top: 1rem;
  text-decoration: none;
}

.cart-total {
  font-weight: bold;
  margin: 1rem 0;
  text-align: right;
}
</style>