<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import productData from '../data/products.json'
import { useCart } from '../store/cart.js' // 🟢 1. Import the global cart manager

// Instantiate tools
const router = useRouter()
const { addToCart } = useCart() // 🟢 2. Destructure the add action

// State variables
const products = ref(productData)
const searchQuery = ref('')
const selectedTab = ref('All')
const tabs = ['All', 'Best Seller', 'Offers', 'Food and beverage']

// Filter computation
const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          product.subTitle.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    if (selectedTab.value === 'All') return matchesSearch
    if (selectedTab.value === 'Best Seller') return matchesSearch && product.isBestSeller
    return matchesSearch
  })
})

function getImageUrl(path) {
  return new URL(path, import.meta.url).href
}

// 🟢 3. Updated handler to process real global cart addition
function handleQuickAdd(product) {
  // Safe extraction of the first default variant label if it exists
  const defaultVariant = product.variants && product.variants.length > 0 
    ? product.variants[0].label 
    : 'Standard'

  // Push full object into global state array
  addToCart(product, 1, defaultVariant)
  
  console.log(`Successfully added 1x ${product.title} (${defaultVariant}) to cart.`)
}

// Core navigation function
function goToDetail(productId) {
  router.push({ name: 'ProductDetail', params: { id: productId } })
}
</script>

<template>
  <div class="store-container">
    
    <div class="search-box">
      <span class="search-icon">🔍</span>
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Search for products...." 
      />
    </div>

    <div class="tabs-container">
      <button 
        v-for="tab in tabs" 
        :key="tab"
        :class="['tab-btn', { active: selectedTab === tab }]"
        @click="selectedTab = tab"
      >
        {{ tab }}
      </button>
    </div>

    <div class="products-grid">
      <div 
        v-for="product in filteredProducts" 
        :key="product.id" 
        class="product-card clickable"
        @click="goToDetail(product.id)"
      >
        <div class="image-wrapper">
          <span v-if="product.isBestSeller" class="bestseller-badge">Best Seller</span>
          
          <img 
            :src="getImageUrl(product.image)" 
            :alt="product.title" 
            class="product-image-display" 
          />
        </div>

        <div class="product-info">
          <div class="info-top-row">
            <span class="category-tag">{{ product.category }}</span>
            <span class="stock-info">{{ product.packInfo }}</span>
          </div>
          
          <h3 class="product-title">{{ product.title }}</h3>
          <p class="product-subtitle">{{ product.subTitle }}</p>
          
          <div class="card-footer">
            <span class="product-price">{{ product.price }}</span>
            
            <!-- 🟢 4. Passes the entire product object to the updated function and keeps .stop to prevent card clicks -->
            <button class="add-btn" @click.stop="handleQuickAdd(product)">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<style scoped>
.clickable {
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.clickable:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}
/* Page Canvas Frame Base */
.store-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 30px 20px;
  background-color: #fcf9f6; /* Matching the image off-white background tint */
  min-height: 100vh;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif, 'Battdombong khmer', 'Kantumruuy Pro', 'Noto Sans Khmer', 'Hanuman', 'Moul', 'Siemreap', 'Koulen', 'Preahvihear', 'Battambang', 'Khmer OS System', 'Khmer OS Battambang', 'Khmer OS Bokor', 'Khmer OS Freehand', 'Khmer OS Muol Light', 'Khmer OS Siemreap', 'Khmer OS System Bold';
}

/* Search Bar styling */
.search-box {
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: 0 auto 20px auto;
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
}

.search-box input {
  width: 100%;
  padding: 12px 12px 12px 45px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
  background-color: #fff;
}

/* Category Selection Buttons Grid Layout */
.tabs-container {
  display: flex;
  gap: 10px;
  max-width: 900px;
  margin: 0 auto 30px auto;
}

.tab-btn {
  padding: 6px 16px;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  background-color: #fff;
  cursor: pointer;
  font-size: 0.9rem;
  color: #4a5568;
  font-weight: 500;
}

.tab-btn.active {
  background-color: #3b82f6; /* Bright blue color for active tabs matching original design */
  color: white;
  border-color: #3b82f6;
}

/* Responsive Responsive Matrix Grid Columns structure */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

/* Cards UI Box Container layout */
.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  border: 1px solid #f0f0f0;
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 240px;
  background-color: #edf2f7;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #a3e635 0%, #65a30d 100%); /* Green placeholder layout to mimic pouch design */
}

.image-icon {
  font-size: 3rem;
}

.product-image-display {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Keeps all tea pouch ratios crisp without distorting them */
}

.bestseller-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #ef4444;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 4px 10px;
  border-radius: 6px;
  z-index: 2;
}

/* Typographic Detail Grid elements */
.product-info {
  padding: 14px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.info-top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.category-tag {
  color: #166534;
  font-weight: 700;
  font-size: 0.8rem;
  border-left: 3px solid #166534;
  padding-left: 6px;
  font-family: 'Battambang', sans-serif;
}

.stock-info {
  color: #a0aec0;
  font-size: 0.75rem;
  font-family: 'Battambang', sans-serif;
}

.product-title {
  font-size: 1.15rem;
  color: #1a202c;
  margin: 0 0 4px 0;
  font-weight: 700;
  font-family: 'Battambang', sans-serif;
}

.product-subtitle {
  font-size: 0.8rem;
  color: #718096;
  margin: 0 0 16px 0;
  font-style: italic;
}

/* Footer structure for Price and + Button row alignment */
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.product-price {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1a202c;
  font-family: 'Battambang', sans-serif;
}

.add-btn {
  background-color: #16a34a;
  color: white;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.1s ease, background-color 0.2s ease;
}

.add-btn:hover {
  background-color: #15803d;
}

.add-btn:active {
  transform: scale(0.92);
}
</style>