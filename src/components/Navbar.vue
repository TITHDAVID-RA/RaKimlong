<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '../store/cart.js' // 🟢 1. Import the global cart manager

const router = useRouter()
const { cart } = useCart() // 🟢 2. Pull the reactive cart array

// 🟢 3. Compute total number of items in the cart
const totalItemsCount = computed(() => {
  return cart.value.reduce((total, item) => total + item.quantity, 0)
})

function goToCart() {
  router.push('/cart')
}
</script>

<template>
  <nav class="navbar">
    <div class="navbar__logo" @click="router.push('/')">
      <img src="/public/image/LOGO.jpg" alt="Logo" />
    </div>
    
    <div class="navbar_icon" @click="goToCart">
      <div class="cart-icon-wrapper">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          class="cart-icon"
        >
          <circle cx="8" cy="21" r="1"></circle>
          <circle cx="19" cy="21" r="1"></circle>
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
        </svg>
        
        <!-- 🟢 4. Dynamic Count Badge (Only renders if count is > 0) -->
        <span v-if="totalItemsCount > 0" class="cart-badge">
          {{ totalItemsCount }}
        </span>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  color: black;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  sticky: top;
  z-index: 1000;
  stroke: 1px solid #e5e7eb;
}

.navbar__logo {
  cursor: pointer;
}

.navbar__logo img {
  height: 60px;
  width: 70px;
  padding-left: 40px;
}

.navbar_icon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 40px; /* Moved padding here from icon to keep container alignment */
}

/* 🟢 5. Position Wrapper for Absolute Badge Placement */
.cart-icon-wrapper {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.cart-icon {
  width: 24px;
  height: 24px;
  color: #333; 
  transition: color 0.2s ease, transform 0.1s ease;
}

.cart-icon-wrapper:hover .cart-icon {
  color: #278e47; 
  transform: scale(1.05);
}

/* 🟢 6. Badge Styling Matrix */
.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #ef4444; /* Vibrant notification red */
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: bold;
  border-radius: 50%;
  min-width: 18px;
  height: 18px;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  animation: pop 0.2s ease-out;
}

@keyframes pop {
  0% { transform: scale(0.5); }
  100% { transform: scale(1); }
}
</style>