<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section brand">
        <img src="../assets/logo.jpeg" alt="Shar Cosmetics Logo" class="footer-logo">
        <h3>Shar Cosmetics</h3>
        <p>Luxury skincare, naturally crafted for you.</p>
        <div class="social-links">
          <a href="#" class="social-icon">
            <span class="social-emoji">📷</span>
          </a>
          <a href="#" class="social-icon">
            <span class="social-emoji">👥</span>
          </a>
          <a href="#" class="social-icon">
            <span class="social-emoji">🐦</span>
          </a>
        </div>
      </div>

      <div v-if="!isAuthPage" class="footer-section links">
        <h4>Quick Links</h4>
        <ul>
          <li><router-link to="/shop">Shop</router-link></li>
          <li><a href="#about">About Us</a></li>
        </ul>
      </div>

      <div class="footer-section contact">
        <h4>Contact Us</h4>
        <ul>
          <li>
            <span class="icon">📞</span>
            <span>+254 795 282154</span>
          </li>
          <li>
            <span class="icon">✉️</span>
            <span>info@sharcosmetics.com</span>
          </li>
          <li>
            <span class="icon">📍</span>
            <span>Nairobi, Kenya</span>
          </li>
        </ul>
      </div>

      <div class="footer-section newsletter">
        <h4>Stay Updated</h4>
        <p>Join our mailing list for updates and exclusive offers!</p>
        <div class="newsletter-form">
          <input type="email" placeholder="Your email address">
          <button type="submit">Join</button>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div v-if="!isAuthPage" class="footer-info">
        <router-link to="/privacy">Privacy</router-link>
        <router-link to="/termsofservice">Terms of Service</router-link>
        <a href="#">Delivery Info</a>
      </div>
      <p>&copy; {{ currentYear }} Shar Cosmetics. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'SiteFooter',
  data() {
    return {
      currentYear: new Date().getFullYear()
    }
  },
  computed: {
    isAuthPage() {
      const authRoutes = ['Login', 'Signup'];
      return authRoutes.includes(this.$route.name);
    }
  }
};
</script>

<style scoped>
.footer {
  background-color: #1a1a1a;
  color: #fff;
  padding: 4rem 5% 1rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.brand {
  text-align: left;
}

.footer-logo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-bottom: 1rem;
}

.footer-section h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #fff;
}

.footer-section h4 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #fff;
}

.footer-section p {
  color: #999;
  line-height: 1.6;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.social-icon {
  width: 40px;
  height: 40px;
  background-color: #333;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-emoji {
  font-size: 1.2rem;
}

.social-icon:hover {
  background-color: #42b983;
  transform: translateY(-3px);
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 1rem;
}

.footer-section ul li a {
  color: #999;
  text-decoration: none;
  transition: color 0.3s ease;
  display: inline-block;
}

.footer-section ul li a:hover {
  color: #42b983;
  transform: translateX(5px);
}

.contact ul li {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #999;
}

.icon {
  font-size: 1.2rem;
  color: #42b983;
  min-width: 24px;
  text-align: center;
}

.newsletter-form {
  display: flex;
  gap: 0.5rem;
}

.newsletter-form input {
  flex: 1;
  padding: 0.8rem;
  border: 1px solid #333;
  border-radius: 4px;
  background-color: #333;
  color: #fff;
}

.newsletter-form button {
  padding: 0.8rem 1.5rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.newsletter-form button:hover {
  background-color: #3aa876;
}

.footer-bottom {
  border-top: 1px solid #333;
  padding-top: 2rem;
  text-align: center;
}

.footer-info {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1rem;
}

.footer-info a {
  color: #999;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-info a:hover {
  color: #42b983;
}

.footer-bottom p {
  color: #666;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-section {
    text-align: center;
  }

  .brand {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .footer-logo {
    margin: 0 auto;
    display: block;
  }

  .social-links {
    justify-content: center;
  }

  .footer-info {
    flex-direction: column;
    gap: 1rem;
  }

  .newsletter-form {
    flex-direction: column;
  }
}
</style>