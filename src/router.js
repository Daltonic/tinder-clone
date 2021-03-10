import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "Home" */ './views/Home.vue'),
    name: 'home',
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
    name: 'login'
  },
  {
    path: '/register',
    component: () => import(/* webpackChunkName: "register" */ './views/Register.vue'),
    name: 'register'
  },
  {
    path: '/forget',
    component: () => import(/* webpackChunkName: "forget" */ './views/Forget.vue'),
    name: 'forget'
  },
]

const router = new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes
})

export default router;