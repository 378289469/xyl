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
    component: () => import('../pages/CourseIntroduce/CourseIntroduce.vue')
  },
  {
    path: '/Study',
    name: 'Study',
    component: () => import('../pages/Study/Study.vue')
  },
  {
    path: '/PDF',
    name: 'PDF',
    component: () => import('../pages/PDF/PDF.vue')
  },
  {
    path: '/activity',
    name: 'Activity',
    component: () => import('../pages/Activity/Activity.vue')
  },
  {
    path: '/ActivityDetail',
    name: 'ActivityDetail',
    component: () => import('../pages/ActivityDetail/ActivityDetail.vue')
  },
  {
    path: '/Video',
    name: 'Video',
    component: () => import('../pages/Video/Video.vue')
  },
  {
    path: '/Communication',
    name: 'Communication',
    component: () => import('../pages/Communication/Communication.vue')
  },
  {
    path: '/CommunicationDetail',
    name: 'CommunicationDetail',
    component: () => import('../pages/CommunicationDetail/CommunicationDetail.vue')
  },
  {
    path: '/my',
    name: 'My',
    component: () => import('../pages/My/My.vue')
  },
  {
    path: '/MyMember',
    name: 'MyMember',
    component: () => import('../pages/MyMember/MyMember.vue')
  },
  {
    path: '/MySecurity',
    name: 'MySecurity',
    component: () => import('../pages/MySecurity/MySecurity.vue')
  },
  {
    path: '/UserLogin',
    name: 'UserLogin',
    component: () => import('../pages/UserLogin/UserLogin.vue')
  },
  {
    path: '/UserRegister',
    name: 'UserRegister',
    component: () => import('../pages/UserRegister/UserRegister.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
