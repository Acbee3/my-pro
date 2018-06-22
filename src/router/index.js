import Vue from 'vue'
import Router from 'vue-router'
// 导入登录组件
import Login from '@/components/login'

Vue.use(Router)

const router = new Router({
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

// 路由导航守卫的语法  router对象.beforeEach((to, from, next) => {})
router.beforeEach((to, from, next) => {
  // 如果访问的是登录页面则直接放行
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = sessionStorage.getItem('token')
  // 如果有 token 直接放行
  if (tokenStr) return next()
  // 否则跳转到登陆页
  next('/login')
})

export default router
