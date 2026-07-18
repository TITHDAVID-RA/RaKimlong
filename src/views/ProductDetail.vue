<script setup>
import { ref, computed, watch } from 'vue' 
import { useRoute, useRouter } from 'vue-router'
import productData from '../data/products.json'
// 🔥 Import using your exact file name "Related.vue"
import Related from '../components/Related.vue' 
import { useCart } from '../store/cart.js' // 👈 Import the shared cart manager

const { addToCart } = useCart()
const route = useRoute()
const router = useRouter()

// Find product matches safely based on the reactive URL parameter
const product = computed(() => {
  const routeId = Number(route.params.id)
  const found = productData.find(p => Number(p.id) === routeId)
  return found || productData[0] // Fallback safety catch
})

// Active image display tracking state
const mainImage = ref('')
const quantity = ref(1)
const selectedVariant = ref(0)

// Watch the product changes. When a user clicks a related item, 
// this forces the main image to update and resets the view perfectly!
watch(
  product, 
  (newProduct) => {
    if (newProduct) {
      mainImage.value = newProduct.image
      quantity.value = 1 
      selectedVariant.value = 0 
    }
  }, 
  { immediate: true }
)

function getImageUrl(path) {
  return new URL(path, import.meta.url).href
}

function selectThumbnail(img) {
  mainImage.value = img
}

function changeQuantity(amount) {
  if (quantity.value + amount >= 1) {
    quantity.value += amount
  }
}

function handlePurchase() {
  const selectedVariantLabel = product.value.variants?.[selectedVariant.value]?.label || 'Standard'
  
  // 🟢 Adds the selected quantity and variant to your global store array
  addToCart(product.value, quantity.value, selectedVariantLabel)
  
  // Optional: Alert or notification so the user knows it worked
}
</script>

<template>
  <div class="page-bg">
    <div class="detail-wrapper" v-if="product">
      
      <button class="back-btn" @click="router.push('/')">← ត្រលប់ទៅហាងវិញ (Back to Shop)</button>
      
      <div class="product-showcase">
        
        <div class="gallery-block">
          <div class="thumbnails-column">
            <div 
              v-for="(img, idx) in product.images" 
              :key="idx"
              :class="['thumb-box', { active: mainImage === img }]"
              @click="selectThumbnail(img)"
            >
              <img :src="getImageUrl(img)" alt="Thumbnail Preview" />
            </div>
          </div>
          
          <div class="main-preview-frame">
            <img :src="getImageUrl(mainImage || product.image)" :alt="product.title" class="hero-image" />
          </div>
        </div>

        <div class="meta-content-block">
          <div class="header-inline">
            <h1 class="khmer-title">{{ product.title }}</h1>
            <button class="wishlist-heart-btn" title="Save Product">♡</button>
          </div>
          <h2 class="english-sub">{{ product.subTitle }}</h2>
          
          <div class="price-tag">{{ product.price }}</div>
          
          <p class="short-promo-text">{{ product.shortDescription }}</p>
          
          <div class="bullet-summary-box">
            <h4 class="box-subtitle">អត្ថប្រយោជន៍៖</h4>
            <ul class="mini-benefits">
              <li v-for="(b, idx) in product.benefitsShort" :key="idx">{{ b }}</li>
            </ul>
          </div>

          <div class="variants-row">
  <button 
    v-for="(v, idx) in product.variants" 
    :key="idx"
    :class="['variant-chip', { active: selectedVariant === idx }]"
    @click="selectedVariant = idx"
  >
    {{ v.label }}
  </button>
</div>

<div class="action-panel-strip">
  <div class="stepper-box">
    <button @click="changeQuantity(-1)" class="step-btn">-</button>
    <input type="number" v-model.number="quantity" min="1" class="step-input" readonly />
    <button @click="changeQuantity(1)" class="step-btn">+</button>
  </div>
  
  <button class="checkout-submit-btn" @click="handlePurchase">
    Add to Cart (ថែមទៅក្នុងកន្ត្រក)
  </button>
</div>

        </div>
      </div>

      <!-- Deep Specifications Matrix -->
      <div class="deep-details-section">
        <p class="specs-weight-bar"><strong>{{ product.weightSpecs }}</strong></p>
        
        <p class="narrative-paragraph">{{ product.englishContext }}</p>

        <div class="grid-two-col">
          <div class="details-card-block">
            <h3 class="block-headline">គុណប្រយោជន៍៖*</h3>
            <ul class="dense-checked-list">
              <li v-for="(benefit, i) in product.detailedBenefits" :key="i">
                <span class="bullet-dot">•</span> {{ benefit }}
              </li>
            </ul>
          </div>

          <div class="details-card-block">
            <h3 class="block-headline">វិធីប្រើប្រាស់៖</h3>
            <ol class="ordered-step-list">
              <li v-for="(step, i) in product.usageInstructions" :key="i">
                <span class="step-number">{{ i + 1 }}.</span> {{ step }}
              </li>
            </ol>
          </div>
        </div>
      </div>

      <!-- 🔥 Horizontal Scroll Related Sales Slider Component Element Injection -->
      <Related 
        :currentProductId="product.id" 
        :category="product.category" 
      />

    </div>
  </div>
</template>

<style scoped>
.page-bg {
  background-color: #fdfbf7; /* Off-white warm background matching catalog template */
  width: 100%;
  padding: 40px 20px;
  box-sizing: border-box;
  font-family: 'Khmer OS Battambang', 'Khmer OS', system-ui, sans-serif;
}

.detail-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  text-align: left;
}

.back-btn {
  background: none;
  border: none;
  color: #278e47;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 25px;
  font-size: 1rem;
}

/* Upper Showcase Segment Layout */
.product-showcase {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 40px;
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
}

/* --- 📸 INTERACTIVE GALLERY ENGINE --- */
.gallery-block {
  display: flex;
  gap: 16px;
}

.thumbnails-column {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.thumb-box {
  width: 80px;
  height: 80px;
  border: 1px solid #dcdad4;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  background: #fff;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.thumb-box:hover {
  transform: scale(1.03);
}

.thumb-box.active {
  border: 2.5px solid #7c4aeb; /* Bold purple border frame matching active showcase token from user file */
}

.thumb-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.main-preview-frame {
  flex: 1;
  border: 2px solid #7c4aeb; /* Outer purple frame from image layout */
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  height: 520px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Metadata Block Text Styles */
.meta-content-block {
  display: flex;
  flex-direction: column;
  padding-left: 10px;
}

.header-inline {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.khmer-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #111;
  margin: 0;
}

.wishlist-heart-btn {
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: #666;
}

.english-sub {
  font-size: 1.3rem;
  color: #4b5563;
  margin: 5px 0 15px 0;
}

.price-tag {
  font-size: 2.6rem;
  font-weight: bold;
  color: #3b82f6; /* Blue pricing color mapping image layout */
  margin-bottom: 20px;
}

.short-promo-text {
  font-size: 1rem;
  line-height: 1.7;
  color: #374151;
  margin-bottom: 20px;
}

.bullet-summary-box {
  margin-bottom: 25px;
}
.box-subtitle { margin: 0 0 8px 0; font-size: 1.1rem; color: #111; }
.mini-benefits { list-style: none; padding: 0; margin: 0; }
.mini-benefits li { font-size: 1rem; margin-bottom: 8px; color: #4b5563; position: relative; padding-left: 15px; }
.mini-benefits li::before { content: "•"; position: absolute; left: 0; color: #111; }

/* Variant Pills Selector (Matches image_298154.jpg colors) */
.variants-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
}

/* 🟢 Default State: All Green */
.variant-chip {
  padding: 10px 16px;
  border-radius: 6px;
  background-color: #22c55e; /* Vibrant Green */
  color: #ffffff;            /* White text for contrast */
  border: 1px solid #16a34a;  /* Darker green border */
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.variant-chip:hover {
  background-color: #16a34a; /* Slight dark green shift on hover */
}

/* 🟡 Selected State: Switches to Yellow */
.variant-chip.active {
  background-color: #facc15; /* Bright Yellow */
  color: #111111;            /* Dark text for visibility */
  border: 2px solid #111111;  /* Distinct dark border outline */
  transform: scale(1.02);
}

/* User Interactive Controls Panel */
.action-panel-strip {
  display: flex;
  gap: 16px;
  margin-top: auto;
}

.stepper-box {
  display: flex;
  border: 1px solid #111;
  border-radius: 6px;
  background: #fff;
}

.step-btn {
  width: 45px;
  border: none;
  background: none;
  font-size: 1.4rem;
  cursor: pointer;
}

.step-input {
  width: 50px;
  border: none;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
}

.checkout-submit-btn {
  flex: 1;
  background-color: #22c55e; /* Vibrant action layout green button */
  color: #fff;
  border: 1px solid #15803d;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
}

/* --- 💛 TRUST INFO STRIP (Matches image_1b8701.png) --- */
.trust-features-bar {
  background-color: #f7e61c; /* Solid layout yellow */
  border: 2px solid #a855f7; /* Purple perimeter border line matching user file */
  border-radius: 8px;
  padding: 20px 40px;
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1;
}

.feature-icon {
  font-size: 1.8rem;
  color: #111;
}

.feature-text {
  font-size: 1.1rem;
  font-weight: 700;
  color: #000000;
  line-height: 1.4;
}

/* Base Specifications and Long Descriptions Matrix Layout */
.deep-details-section {
  background: #ffffff;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.02);
}

.specs-weight-bar {
  font-size: 1.1rem;
  line-height: 1.8;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 20px;
  margin-bottom: 25px;
  color: #1f2937;
}

.narrative-paragraph {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #1f2937;
  margin-bottom: 40px;
}

.grid-two-col {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 50px;
}

.block-headline {
  font-size: 1.4rem;
  font-weight: 700;
  color: #111;
  margin: 0 0 25px 0;
}

.dense-checked-list, .ordered-step-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dense-checked-list li, .ordered-step-list li {
  font-size: 1.05rem;
  line-height: 1.8;
  margin-bottom: 15px;
  display: flex;
  align-items: flex-start;
  color: #374151;
}

.bullet-dot, .step-number {
  color: #111;
  font-weight: bold;
  margin-right: 12px;
}

/* Fluid Scalability Rule Hooks */
@media (max-width: 992px) {
  .product-showcase { grid-template-columns: 1fr; }
  .grid-two-col { grid-template-columns: 1fr; gap: 40px; }
  .trust-features-bar { flex-direction: column; align-items: flex-start; padding: 25px; }
  .main-preview-frame { height: 400px; }
}

@media (max-width: 640px) {
  .gallery-block { flex-direction: column-reverse; }
  .thumbnails-column { flex-direction: row; justify-content: center; }
  .action-panel-strip { flex-direction: column; }
}
</style>