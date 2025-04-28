import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/addData',
      name: 'addData',
      component: () => import('../views/addData.vue'),
    },
    {
      path: '/editData:id',
      name: 'editData',
      props: true,
      component: () => import('../views/editData.vue'),
    },
    {
      path: '/viewData/:year/:month',
      name: 'viewData',
      props: true,
      component: () => import('../views/viewData.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/about.vue'),
    },
  ],
})

export default router
