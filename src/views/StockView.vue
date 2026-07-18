<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import productData from '../data/products.json'

const route = useRoute()
const router = useRouter()

// Get the store name from the URL footer click action
const selectedStore = computed(() => route.query.store || 'ម៉ាតមីនីម៉ាត')

// Mock function determining stock level per store location
function getStockStatus(productId, storeName) {
  const seed = (productId + storeName.length) % 3
  if (seed === 0) return { label: 'Out of Stock (អស់ស្តុក)', count: 0, class: 'out' }
  if (seed === 1) return { label: 'Low Stock (ជិតអស់ស្តុក)', count: 3, class: 'low' }
  return { label: 'In Stock (មានស្តុក)', count: 15, class: 'in' }
}

// Compute the complete inventory map matching your actual JSON product items
const storeInventory = computed(() => {
  return productData.map(product => {
    const status = getStockStatus(product.id, selectedStore.value)
    return {
      ...product,
      stockInfo: status
    }
  })
})

function getImageUrl(path) {
  return new URL(path, import.meta.url).href
}
</script>

<template>
  <div class="stock-page">
    <div class="stock-container">
      
      <!-- BACK NAVIGATION BUTTON -->
      <button class="back-btn" @click="router.push('/')">
        ← ត្រឡប់ទៅហាងវិញ (Back to Shop)
      </button>

      <!-- STORE HEADER INFO BANNER -->
      <div class="store-header-box">
        <div>
          <h1 class="store-title">ពិនិត្យស្តុកទំនិញ (Stock Availability)</h1>
          <p class="store-subtitle">ទីតាំងដៃគូសហការ៖ <strong>{{ selectedStore }}</strong></p>
        </div>
      </div>

      <!-- 🎴 VISUAL PRODUCT CARD GRID -->
      <div class="inventory-grid">
        <div v-for="item in storeInventory" :key="item.id" class="product-stock-card">
          
          <!-- Product Image Wrapper with Absolute Stock Status Tag -->
          <div class="image-wrapper">
            <img :src="getImageUrl(item.image)" :alt="item.title" class="product-img" />
            <span :class="['stock-floating-badge', item.stockInfo.class]">
              {{ item.stockInfo.label }}
            </span>
          </div>
          
          <!-- Product Content Area -->
          <div class="product-info-frame">
            <span class="category-tag">{{ item.category }}</span>
            <h3 class="product-title">{{ item.title }}</h3>
            <p class="product-subtitle">{{ item.subTitle }}</p>
            
            <div class="card-footer-strip">
              <span class="product-price">{{ item.price }}</span>
              <span class="qty-text" v-if="item.stockInfo.count > 0">
                Qty: {{ item.stockInfo.count }}
              </span>
              <span class="qty-text out" v-else>
                Empty
              </span>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.stock-page {
  background-color: #fdfbf7;
  min-height: 100vh;
  padding: 40px 20px;
  font-family: 'Khmer OS Battambang', 'Khmer OS', system-ui, sans-serif;
  text-align: left;
}

.stock-container {
  max-width: 1200px;
  margin: 0 auto;
}

.back-btn {
  background: transparent;
  border: none;
  color: #16a34a;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 25px;
  font-size: 1rem;
  transition: transform 0.2s ease;
}

.back-btn:hover {
  text-decoration: underline;
  transform: translateX(-3px);
}

.store-header-box {
  display: flex;
  align-items: center;
  gap: 20px;
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.02);
  margin-bottom: 40px;
  border-left: 5px solid #16a34a;
}

.store-icon { font-size: 2.5rem; }
.store-title { margin: 0 0 4px 0; font-size: 1.6rem; color: #111; }
.store-subtitle { margin: 0; color: #52525b; font-size: 1.1rem; }

/* 🎴 GRID ENGINE FOR CARDS */
.inventory-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 25px;
}

/* AUTHENTIC PRODUCT CARD DESIGN */
.product-stock-card {
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid #f4f4f5;
}

.product-stock-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
}

/* Image section setup */
.image-wrapper {
  position: relative;
  width: 100%;
  padding-top: 100%; /* Creates a perfect 1:1 Aspect Ratio square */
  background-color: #f4f4f5;
}

.product-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Floating stock tags */
.stock-floating-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Stock colors */
.stock-floating-badge.in { background-color: #dcfce7; color: #15803d; }
.stock-floating-badge.low { background-color: #fef9c3; color: #a16207; }
.stock-floating-badge.out { background-color: #fee2e2; color: #b91c1c; }

/* Text Content Area Frame */
.product-info-frame {
  padding: 18px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.category-tag {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #a1a1aa;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.product-title {
  margin: 6px 0 2px 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: #111;
  line-height: 1.3;
}

.product-subtitle {
  margin: 0 0 16px 0;
  font-size: 0.9rem;
  color: #71717a;
  flex-grow: 1; /* Pushes footer elements uniformly to the absolute bottom row */
}

/* Card footer row alignment */
.card-footer-strip {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f4f4f5;
  padding-top: 12px;
  margin-top: auto;
}

.product-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #111;
}

.qty-text {
  font-size: 0.85rem;
  font-weight: 700;
  color: #52525b;
}

.qty-text.out {
  color: #ef4444;
}
</style>