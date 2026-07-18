import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductDetail from "../views/ProductDetail.vue"
import CartView from '../views/CartView.vue'
import StockView from '../views/StockView.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView // 🔥 Loads the complete landing page setup on default entry
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    props: true
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartView
  },
  {
  path: '/stock-status',
  name: 'StockStatus',
  component: StockView
}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router