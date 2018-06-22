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

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

Vue.config.productionTip = false

Vue.prototype.$http = axios
/* eslint-disable no-new */

Vue.use(ElementUI)
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
