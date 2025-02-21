<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Luxury Skincare, Naturally Crafted</h1>
        <p>Discover our eco-friendly, cruelty-free beauty products</p>
        <router-link to="/shop" class="cta-button">Shop</router-link>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="featured-products" id="shop">
      <div class="blurred-heading">
        <h2>Featured Products</h2>
      </div>
      <div v-if="loading" class="loading">
        Loading featured products...
      </div>
      <div v-else-if="error" class="error">
        {{ error }}
      </div>
      <div v-else class="product-grid">
        <div class="product-card" v-for="product in featuredProducts" :key="product._id">
          <img 
            :src="'http://localhost:5000' + product.images[0]" 
            :alt="product.name" 
            class="product-image"
            @error="handleImageError" 
          />
          <div class="product-details">
            <h3>{{ product.name }}</h3>
            <p class="category">{{ formatCategory(product.category) }}</p>
            <p class="price">Kes {{ product.price }}</p>
            <router-link :to="'/shop'" class="shop-button">Shop Now</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="about" id="about">
  <div class="about-content">
    <h2>Our Story</h2>
    <p>
      At Shar Cosmetics, we believe in the power of natural beauty. Our products are crafted with care, using only the finest ingredients nature has to offer. We are passionate about creating skincare, makeup, and haircare solutions that not only enhance your natural beauty but also nourish and protect your skin and hair. Every product is thoughtfully formulated to deliver results you can see and feel, without compromising on safety or sustainability.
    </p>

    <h3>Our Philosophy</h3>
    <p>
      We believe that beauty should be simple, pure, and accessible to everyone. That's why we are committed to using clean, ethically sourced ingredients that are free from harmful chemicals, parabens, and synthetic fragrances. Our mission is to empower you to feel confident in your own skin while promoting a healthier, more sustainable approach to beauty.
    </p>

    <h3>Why Choose Shar Cosmetics?</h3>
    <ul>
      <li>
        <strong>Natural Ingredients:</strong> We harness the power of nature, using plant-based extracts, essential oils, and organic compounds to create products that are gentle yet effective.
      </li>
      <li>
        <strong>Cruelty-Free:</strong> We are proud to be a cruelty-free brand. None of our products are tested on animals, and we are committed to ethical practices at every step of our production process.
      </li>
      <li>
        <strong>Sustainability:</strong> From eco-friendly packaging to responsibly sourced ingredients, we strive to minimize our environmental footprint and contribute to a greener planet.
      </li>
      <li>
        <strong>Transparency:</strong> We believe in honesty and transparency. Every ingredient in our products is clearly listed, so you know exactly what you're putting on your skin.
      </li>
      <li>
        <strong>Results-Driven:</strong> Our formulations are backed by science and designed to deliver visible results. Whether it's glowing skin, luscious hair, or flawless makeup, we've got you covered.
      </li>
    </ul>

    <h3>Our Promise to You</h3>
    <p>
      At Shar Cosmetics, your well-being is at the heart of everything we do. We are dedicated to creating products that are not only effective but also safe for you and the environment. When you choose Shar Cosmetics, you're choosing a brand that cares about you, your beauty, and the world we share.
    </p>
  </div>
</section>

    <!-- Contact Section -->
    <section class="newsletter">
      <div class="newsletter-content">
        <h2>Send Us a Message</h2>
        <p>We'd love to hear from you! Drop us a message and we'll get back to you.</p>
        <div class="contact-form">
          <input type="text" placeholder="Your Name" class="contact-input" />
          <input type="email" placeholder="Your Email" class="contact-input" />
          <textarea placeholder="Your Message" class="contact-input message" rows="4"></textarea>
          <button class="send-button">Send Message</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomePage',
  data() {
    return {
      featuredProducts: [],
      loading: false,
      error: null
    }
  },
  methods: {
    async fetchFeaturedProducts() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get('http://localhost:5000/featured-products');
        this.featuredProducts = response.data;
      } catch (error) {
        console.error('Error fetching featured products:', error);
        this.error = 'Failed to load featured products';
      } finally {
        this.loading = false;
      }
    },
    handleImageError(e) {
      e.target.src = require('../assets/logo.jpeg');
    },
    formatCategory(category) {
      return category.charAt(0).toUpperCase() + category.slice(1);
    }
  },
  mounted() {
    this.fetchFeaturedProducts();
  }
}
</script>

<style scoped>
.home {
  width: 100%;
  font-family: 'Arial', sans-serif;
  background-color: #f5f5f5;
}

/* Hero Section */
.hero {
  height: 90vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
              url('../assets/hero.jpeg') center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  animation: fadeIn 1.5s ease-in-out;
}

.hero-content {
  max-width: 800px;
  padding: 2rem;
}

.hero h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  animation: slideIn 1s ease-in-out;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  animation: slideIn 1.2s ease-in-out;
}

.cta-button {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: #555;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;
}

.cta-button:hover {
  background-color: #777;
}

/* Featured Products */
.featured-products {
  padding: 4rem 5%;
  text-align: center;
  background-image: url('../assets/home-3.jpeg');
}

.blurred-heading {
  display: inline-block; /* Ensure the blur effect wraps around the text */
  padding: 0 10px; /* 0 for top/bottom, 10px for left/right */
  background: rgba(255, 255, 255, 0.3); /* Semi-transparent white background */
  backdrop-filter: blur(5px); /* Apply blur effect */
  border-radius: 8px; /* Optional: Rounded corners */
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  margin: 1rem auto;
  max-width: 300px;
}

.error {
  color: #dc3545;
}

.category {
  color: #666;
  font-size: 0.9rem;
  margin: 0.5rem 0;
}

.product-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;
  max-width: 350px;
  margin: 0 auto;
}

.product-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-details {
  padding: 1.5rem;
  text-align: center;
}

.product-details h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #333;
}

.price {
  font-size: 1.1rem;
  font-weight: bold;
  color: #42b983;
  margin: 0.5rem 0;
}

.shop-button {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

.shop-button:hover {
  background-color: #3aa876;
}

/* About Section */
.about {
  padding: 2rem;
  background: linear-gradient(135deg, #b94295, #2c3e50);
  text-align: center;
}

.about-content {
  max-width: 800px;
  margin: 0 auto;
}

.about h2 {
  font-size: 2rem;
  color: #42b983;
  margin-bottom: 1.5rem;
}

.about h3 {
  font-size: 1.5rem;
  color: #ffffff;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.about p {
  font-size: 1rem;
  line-height: 1.6;
  color: #ffffff;
  margin-bottom: 1.5rem;
}

.about ul {
  text-align: left;
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
}

.about li {
  margin-bottom: 0.75rem;
  color: #ffffff;
}

.about strong {
  color: #ffffff;
}

/* Contact Section */
.newsletter {
  padding: 4rem 5%;
  background-image: url('../assets/home-2.jpeg');
  background-size: cover;
  background-position: center;
  text-align: center;
  position: relative;
  color: white;
}

.newsletter::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
}

.newsletter-content {
  position: relative;
  z-index: 1;
}

.newsletter h2 {
  margin-bottom: 1rem;
  font-size: 2.5rem;
}

.newsletter p {
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 2rem auto;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.contact-input {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.message {
  resize: vertical;
  min-height: 100px;
}

.send-button {
  padding: 1rem 2rem;
  background-color: #555;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-weight: 500;
}

.send-button:hover {
  background-color: #777;
  transform: translateY(-2px);
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2.5rem;
  }

  .contact-form {
    width: 90%;
    padding: 1.5rem;
  }
  /* Adjust the grid to display two columns on smaller devices */
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  /* Reduce the size of the images on smaller devices */
  .product-image {
    height: 150px; /* Adjust this value as needed */
  }
}
</style>