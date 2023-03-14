import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '@/components/register.vue'
import User from '@/components/user.vue'
import Plan from '@/components/plan.vue'
import OTP from '@/components/otp.vue'
import Calculator from '@/components/calculator.vue'
import Info from '@/components/info.vue'
import View from '@/components/view.vue'
import Forgot from '@/components/forgotPassword.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/authentication',
    name: 'register',
    component: Register
  },
  {
    path: '/otp',
    name: 'otp',
    component: OTP
  },
  {
    path: '/forgotPassword',
    name: 'forgotPassword',
    component: Forgot
  },
  {
    path: '/plan',
    name: 'plan',
    component: Plan
  },
  {
    path: '/user',
    name: 'user',
    component: User
  },
  {
    path: '/calculator',
    name: 'calculator',
    component: Calculator
  },
  {
    path: '/info',
    name: 'info',
    component: Info
  },
  {
    path: '/view',
    name: 'view',
    component: View
  },
  {
    path: '/',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
