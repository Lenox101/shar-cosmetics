<template>
  <div class="shop-container">
    <h1>Our Products</h1>
    <div class="shop-content">
      <!-- Categories Sidebar -->
      <aside class="categories-sidebar">
        <h2>Categories</h2>
        <ul>
          <li
            v-for="category in categories"
            :key="category.id"
            @click="setActiveCategory(category.value)"
            :class="{ active: activeCategory === category.value }"
          >
            {{ category.name }}
          </li>
        </ul>
      </aside>

      <!-- Products Grid -->
      <div class="products-grid">
        <div v-if="loading" class="loading">
          Loading products...
        </div>
        <div v-else-if="error" class="error">
          {{ error }}
        </div>
        <div v-else-if="products.length === 0" class="no-products">
          No products available in this category.
        </div>
        <div
          v-else
          v-for="product in products"
          :key="product._id"
          class="product-card"
        >
          <img 
            :src="'http://localhost:5000' + product.images[0]" 
            :alt="product.name" 
            class="product-image"
            @error="handleImageError"
          />
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p class="description">{{ product.description }}</p>
            <p class="price">Kes {{ product.price }}</p>
            <button class="add-to-cart" @click="addToCart(product)">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  name: 'ShopPage',
  data() {
    return {
      categories: [
        { id: 1, name: 'All Products', value: null },
        { id: 2, name: 'Skincare', value: 'skincare' },
        { id: 3, name: 'Makeup', value: 'makeup' },
        { id: 4, name: 'Haircare', value: 'haircare' },
        { id: 5, name: 'Fragrances', value: 'fragrance' }
      ],
      products: [],
      activeCategory: null,
      loading: false,
      error: null
    }
  },
  setup() {
    const cartStore = useCartStore();
    return { cartStore };
  },
  methods: {
    async fetchProducts() {
      this.loading = true;
      this.error = null;
      try {
        const url = this.activeCategory
          ? `http://localhost:5000/shop/products/${this.activeCategory}`
          : 'http://localhost:5000/shop/products';
        
        const response = await axios.get(url);
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
        this.error = 'Failed to load products. Please try again later.';
      } finally {
        this.loading = false;
      }
    },
    async setActiveCategory(categoryValue) {
      this.activeCategory = this.activeCategory === categoryValue ? null : categoryValue;
      await this.fetchProducts();
    },
    handleImageError(e) {
      e.target.src = require('../assets/logo.jpeg'); // Create a placeholder image
    },
    addToCart(product) {
      this.cartStore.addToCart(product);
      toast.success(`${product.name} added to cart!`, {
        autoClose: 2000,
        position: 'bottom-right'
      });
    }
  },
  mounted() {
    this.fetchProducts();
  }
}
</script>

<style scoped>
.shop-container {
  padding: 2rem 5%;
  background: linear-gradient(135deg, #b94295, #2c3e50);
}

.shop-content {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
}

/* Categories Sidebar */
.categories-sidebar {
  width: 200px;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  border-radius: 12px;
  height: fit-content;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.categories-sidebar h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
  font-weight: 600;
}

.categories-sidebar ul {
  list-style: none;
  padding: 0;
}

.categories-sidebar li {
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s ease;
  margin-bottom: 0.5rem;
  color: #4a5568;
}

.categories-sidebar li:hover {
  background-color: rgba(66, 185, 131, 0.1);
}

.categories-sidebar li.active {
  background-color: #42b983;
  color: white;
}

/* Products Grid */
.products-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 4rem;
  padding: 2rem 0;
}

.product-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  max-width: 300px;
  min-height: 400px; /* Ensure consistent height */
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.product-info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
}

.product-name {
  color: #2c3e50;
  font-weight: 600;
}

.price {
  color: #42b983;
  font-size: 1.1rem;
  margin: 0.5rem 0;
}

.add-to-cart {
  width: 100%;
  padding: 0.8rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-to-cart:hover {
  background-color: #3aa876;
  transform: translateY(-2px);
}

.loading, .error, .no-products {
  grid-column: 1 / -1;
  text-align: center;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  border-radius: 8px;
}

.error {
  color: #dc3545;
}

.description {
  color: #666;
  font-size: 0.9rem;
  margin: 0.5rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 768px) {
  .shop-container {
    padding: 1rem;
  }

  .shop-content {
    flex-direction: column;
  }

  .categories-sidebar {
    width: 90%;
  }

  .categories-sidebar ul {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .categories-sidebar li {
    margin: 0;
  }

  /* Adjust the grid to display two columns on smaller devices */
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem; /* Reduce gap for smaller screens */
    padding: 2rem 0;
  }

  /* Reduce the size of the images on smaller devices */
  .product-image {
    height: 150px; /* Adjust this value as needed */
  }

  .product-card {
    min-height: 350px; /* Adjust height for smaller screens */
  }
}
</style>