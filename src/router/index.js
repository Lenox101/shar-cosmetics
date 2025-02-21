import { createRouter, createWebHistory } from "vue-router";

// Import your components from the components directory
import Homepage from "@/components/Home.vue";
import Login from "@/components/AuthPages/Login.vue";
import Signup from "@/components/AuthPages/Signup.vue";
import ShopPage from "@/components/Shop.vue";
import Privacy from "@/components/PreliminaryPages/Privacy.vue";
import Terms from "@/components/PreliminaryPages/Terms.vue";
import MyOrders from "@/components/UserPages/MyOrders.vue";

// Define your routes
const routes = [
  {
    path: "/",
    name: "Home",
    component: Homepage,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/shop",
    name: "Shop",
    component: ShopPage,
  },
  {
    path: "/privacy",
    name: "Privacy",
    component: Privacy
  },
  {
    path: "/termsofservice",
    name: "TermsPage",
    component: Terms
  },
  {
    path: '/my-orders',
    name: 'MyOrders',
    component: MyOrders,
    meta: { requiresAuth: true }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/components/UserPages/CartPage.vue'),
    meta: { requiresAuth: true }
  }
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('userToken');
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;