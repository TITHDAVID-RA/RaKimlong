<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import productData from '../data/products.json'

const props = defineProps({
  currentProductId: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  }
})

const router = useRouter()

// Filter out the current product and match others in the same category
const relatedItems = computed(() => {
  return productData.filter(item => 
    item.category === props.category && item.id !== props.currentProductId
  )
})

function getImageUrl(path) {
  return new URL(path, import.meta.url).href
}

// Navigate to the new detail page and force window to scroll back up to top
function viewProduct(id) {
  router.push({ name: 'ProductDetail', params: { id } }).then(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}

function quickAddToCart(id, event) {
  event.stopPropagation() // Stop detail page routing trigger
  console.log(`Quick Added item to cart: ${id}`)
}
</script>

<template>
  <div class="related-section" v-if="relatedItems.length > 0">
    <h3 class="section-title">ទំនិញផ្សេងៗ (Related Products)</h3>
    
    <div class="horizontal-scroll-track">
      <div 
        v-for="item in relatedItems" 
        :key="item.id" 
        class="product-card"
        @click="viewProduct(item.id)"
      >
        <div class="image-wrapper">
          <span v-if="item.isBestSeller" class="bestseller-badge">Best Seller</span>
          <img :src="getImageUrl(item.image)" :alt="item.title" class="product-img" />
        </div>

        <div class="product-info">
          <div class="meta-row">
            <span class="category-tag">តែសុខភាព</span>
            <span class="stock-status">{{ item.packInfo }}</span>
          </div>
          
          <h4 class="product-title">{{ item.title }}</h4>
          <p class="product-subtitle">{{ item.subTitle }}</p>
          
          <div class="card-footer">
            <span class="product-price">{{ item.price }}</span>
            <button class="add-cart-btn" @click="quickAddToCart(item.id, $event)">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.related-section {
  width: 100%;
  margin-top: 50px;
  font-family: 'Kantumruuy Pro', 'Khmer OS Battambang', system-ui, sans-serif;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 20px;
  padding-left: 5px;
}

/* --- 📜 SMOOTH HORIZONTAL SCROLL TRAIL SYSTEM --- */
.horizontal-scroll-track {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 10px 5px 25px 5px;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch; /* Fluid momentum scroll on mobile phones */
}

/* Elegant minimalist scrollbar design footprint */
.horizontal-scroll-track::-webkit-scrollbar {
  height: 8px;
}
.horizontal-scroll-track::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.04);
  border-radius: 10px;
}
.horizontal-scroll-track::-webkit-scrollbar-thumb {
  background: #278e47; /* Matching Brand green core primary focus line tint */
  border-radius: 10px;
}

/* Card Presentation Elements Engine (Matches image_ec7519.jpg styling structural tokens) */
.product-card {
  flex: 0 0 280px; /* Force preserve width parameters without squeezing inside scroll trail flex track */
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.08);
}

.image-wrapper {
  width: 100%;
  height: 260px;
  background-color: #f7f7f7;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.bestseller-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background-color: #ef4444;
  color: white;
  padding: 4px 10px;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 20px;
}

.product-info {
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.category-tag {
  color: #278e47;
  font-size: 0.85rem;
  font-weight: 700;
}

.stock-status {
  color: #71717a;
  font-size: 0.82rem;
}

.product-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #18181b;
  margin: 0 0 4px 0;
}

.product-subtitle {
  font-size: 0.9rem;
  color: #71717a;
  margin: 0 0 16px 0;
  font-style: italic;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.product-price {
  font-size: 1.3rem;
  font-weight: 700;
  color: #111;
}

.add-cart-btn {
  background-color: #278e47;
  color: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
}

.add-cart-btn:hover {
  background-color: #1e6f36;
  transform: scale(1.05);
}
</style>