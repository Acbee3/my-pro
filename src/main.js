import Vue from 'vue'
import App from './App'
import router from './router'
// 导入全局样式
import './assets/css/global.css'
// 导入 字体图标的样式表
import './assets/fonts/iconfont.css'
import ElementUI from 'element-ui'

Vue.config.productionTip = false

/* eslint-disable no-new */

Vue.use(ElementUI)
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
