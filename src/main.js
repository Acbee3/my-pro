import Vue from 'vue'
import App from './App'
import router from './router'
// 导入全局样式
import './assets/css/global.css'
// 导入 字体图标的样式表
import './assets/fonts/iconfont.css'
// 导入ElementUI组件库
import ElementUI from 'element-ui'
// 导入axios组件
import axios from 'axios'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

// 为axios挂载token请求头，需要使用request拦截器实现
axios.interceptors.request.use(function(config) {
  // 手动为 axios 的请求，追加 Authorization 请求头
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

Vue.prototype.$http = axios
/* eslint-disable no-new */

Vue.use(ElementUI)
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
