<template>
  <div class="signup-page">
    <div class="signup-container">
      <h2>Sign Up</h2>
      <form @submit.prevent="handleSignup">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            v-model="name"
            placeholder="Enter your name"
            required
          />
        </div>
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
          <label for="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            v-model="phoneNumber"
            placeholder="Enter your phone number"
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
          <small class="password-hint">
            Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.
          </small>
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            placeholder="Confirm your password"
            required
          />
        </div>
        <button type="submit" class="signup-button">Sign Up</button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p class="login-link">
        Already have an account? <router-link to="/login">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SignupPage',
  data() {
    return {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      errorMessage: "",
    };
  },
  methods: {
    handleSignup() {
      // Basic validation
      if (!this.name || !this.email || !this.password || !this.confirmPassword) {
        this.errorMessage = "Please fill in all fields.";
        return;
      }

      if (this.password !== this.confirmPassword) {
        this.errorMessage = "Passwords do not match.";
        return;
      }

      if (this.name.length < 3) {
        this.errorMessage = "Name must be at least 3 characters long.";
        return;
      }

      if (!this.email.includes('@') || !this.email.includes('.')) {
        this.errorMessage = "Please enter a valid email address.";
        return;
      }

      // Password validation
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
      if (!passwordRegex.test(this.password)) {
        this.errorMessage = "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.";
        return;
      }

      // Proceed with signup
      axios.post('http://localhost:5000/register', { name: this.name, email: this.email, password: this.password, phoneNumber: this.phoneNumber })
        .then(response => {
          alert(response.data.message);
          this.$router.push('/login'); // Redirect to login page
        })
        .catch(error => {
          this.errorMessage = error.response?.data?.message || "Signup failed. Please try again.";
        });
    },
  },
};
</script>

<style scoped>
.signup-page {
  min-height: 70vh;
  padding-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('../../assets/signup.jpeg');
  background-size: cover;
  background-position: center;
  position: relative;
}

.signup-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

.signup-container {
  max-width: 400px;
  padding-top: 50px;
  width: 90%;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.7);
  text-align: center;
  color: white;
  position: relative;
  backdrop-filter: blur(10px);
  margin: 0;
}

h2, label {
  color: white;
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
  background-color: rgba(255, 255, 255, 0.9);
}

.password-hint {
  display: block;
  margin-top: 5px;
  font-size: 0.8em;
  color: #ccc;
}

.signup-button {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.signup-button:hover {
  background-color: #218838;
}

.error-message {
  color: #ff6b6b;
  margin-top: 10px;
}

.login-link {
  margin-top: 15px;
  color: white;
}

.login-link a {
  color: #28a745;
  text-decoration: none;
  font-weight: bold;
}

.login-link a:hover {
  text-decoration: none;
  color: #218838;
}
</style>