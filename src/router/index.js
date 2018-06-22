import Vue from 'vue'
import Router from 'vue-router'
// 导入登录组件
import Login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  }
  ]
})
