import customerTable from '@/components/customerTable.vue'
import hotelTableVue from '@/components/hotelTable.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/customers',
    name: 'home',
    component:customerTable
  },
  {
    path: '/hotels',
    name: 'about',
    component:hotelTableVue
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
