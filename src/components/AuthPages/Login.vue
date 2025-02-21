<template>
  <div class="login-page">
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" class="login-button">Login</button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p class="signup-link">
        Don't have an account? <router-link to="/signup">Sign up</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from '@/axiosConfig'; // Use the configured Axios instance

export default {
  name: 'LoginPage',
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      // Basic validation
      if (!this.email || !this.password) {
        this.errorMessage = "Please fill in all fields.";
        return;
      }

      this.errorMessage = ""; // Clear previous error message

      try {
        const response = await axios.post('/login', {
          email: this.email,
          password: this.password,
        });

        localStorage.setItem('userToken', response.data.token);
        alert('Login successful!');
        this.$router.push('/'); // Redirect to dashboard
      } catch (error) {
        this.errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      }
    },
  },
};
</script>

<style scoped>
.login-page {
  min-height: 70vh;
  padding-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('../../assets/login.jpeg');
  background-size: cover;
  background-position: center;
  position: relative;
}

.login-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

.login-container {
  max-width: 400px;
  width: 90%;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.7);
  text-align: center;
  color: white;
  position: relative;
  backdrop-filter: blur(10px);
}

/* Update text colors for better visibility */
h2, label {
  color: white;
}

h2 {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 95%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.signup-link {
  margin-top: 15px;
}

.signup-link a {
  color: #007bff;
  text-decoration: none;
}

.signup-link a:hover {
  text-decoration: none;
}
</style>