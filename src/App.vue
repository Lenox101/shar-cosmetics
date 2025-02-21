<template>
  <div id="app">
    <!-- Conditionally render SiteHeader based on the route -->
    <SiteHeader v-if="showHeader" />
    <router-view />
    <SiteFooter />
  </div>
</template>

<script>
import SiteHeader from './components/Header.vue';
import SiteFooter from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    SiteHeader,
    SiteFooter,
  },
  computed: {
    // Compute whether to show the header based on the current route
    showHeader() {
      // List of routes where the header should NOT be shown
      const hideHeaderRoutes = ['Login', 'Signup'];
      return !hideHeaderRoutes.includes(this.$route.name);
    },
  },
};
</script>

<style>
#app {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

h1, h2, h3, h4 {
  font-family: 'Playfair Display', serif;
}

.router-view {
  flex: 1;
  padding: 20px;
}
</style>