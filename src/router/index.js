import Vue from 'vue'
// 导入路由组件
import Router from 'vue-router'
// 导入登录组件
import Login from '@/components/login'
// 导入后台首页组件
import Home from '@/components/home'
// 导入欢迎组件
import Welcome from '@/components/welcome'
// 导入用户管理组件
import Users from '@/components/user/users'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome', // 只要进入了 home 页面，就立即重定向到 welcome 欢迎页
    children: [{
      path: '/welcome',
      component: Welcome
    }, {
      path: '/users',
      component: Users
    }]
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
