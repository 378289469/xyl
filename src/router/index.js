import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/CourseIntroduce',
    name: 'CourseIntroduce',
    component: () => import('../views/CourseIntroduce/CourseIntroduce.vue')
  },
  {
    path: '/Study',
    name: 'Study',
    component: () => import('../pages/Study/Study.vue')
  },
  {
    path: '/PDF',
    name: 'PDF',
    component: () => import('../views/PDF/PDF.vue')
  },
  {
    path: '/activity',
    name: 'Activity',
    component: () => import('../pages/Activity/Activity.vue')
  },
  {
    path: '/ActivityDetail',
    name: 'ActivityDetail',
    component: () => import('../views/ActivityDetail/ActivityDetail.vue')
  },
  {
    path: '/Video',
    name: 'Video',
    component: () => import('../views/Video/Video.vue')
  },
  {
    path: '/Communication',
    name: 'Communication',
    component: () => import('../pages/Communication/Communication.vue')
  },
  {
    path: '/CommunicationDetail',
    name: 'CommunicationDetail',
    component: () => import('../views/CommunicationDetail/CommunicationDetail.vue')
  },
  {
    path: '/my',
    name: 'My',
    component: () => import('../pages/My/My.vue')
  },
  {
    path: '/MyMember',
    name: 'MyMember',
    component: () => import('../views/MyMember/MyMember.vue')
  },
  {
    path: '/MySecurity',
    name: 'MySecurity',
    component: () => import('../views/MySecurity/MySecurity.vue')
  },
  {
    path: '/UserLogin',
    name: 'UserLogin',
    component: () => import('../views/UserLogin/UserLogin.vue')
  },
  {
    path: '/UserRegister',
    name: 'UserRegister',
    component: () => import('../views/UserRegister/UserRegister.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
