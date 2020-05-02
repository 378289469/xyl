import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/study',
    name: 'Study',
    component: () => import('../views/Study/Study.vue')
  },
  {
    path: '/activity',
    name: 'Activity',
    component: () => import('../views/Activity/Activity.vue')
  },
  {
    path: '/communication',
    name: 'Communication',
    component: () => import('../views/Communication/Communication.vue')
  },
  {
    path: '/my',
    name: 'My',
    component: () => import('../views/My/My.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
