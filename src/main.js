// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// -- 引入UI控件
import Vant from 'vant'
import 'vant/lib/index.css'
import './libs/rem'
Vue.use(Vant)
// -- 引入自定义图标
import './assets/icons/iconfont.css'
import { getRequest, postRequest } from './libs/request'
Vue.config.productionTip = false
Vue.prototype.getRequest = getRequest
Vue.prototype.postRequest = postRequest
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
