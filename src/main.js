import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import './assets/css/theme/index.css';
import 'nprogress/nprogress.css'
import axios from 'axios'
// 引入global.css
import './assets/css/global.css'
// 引入typo.css
import './assets/css/typo.css'
import './assets/css/normalize.css'
import './assets/css/elcss.css'






Vue.use(ElementUI)


Vue.config.productionTip = false
axios.defaults.timeout = 5000


axios.defaults.baseURL = process.env.VUE_APP_BASE_API

// axios请求拦截
axios.interceptors.request.use(config => {
  // 为请求头对象，添加Token验证的Authorization字段
  config.headers.token = window.sessionStorage.getItem('token')
  return config
})

Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
