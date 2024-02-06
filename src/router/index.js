import { createRouter, createWebHistory } from 'vue-router'
import EmailList from '../views/EmailList.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: EmailList
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
