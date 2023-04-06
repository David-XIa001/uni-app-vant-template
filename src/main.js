import Vue from 'vue'
import App from './App'
import store from './store'
import './styles/index.scss'
import './static/icon/iconfont.css'
import MescrollBody from '@/components/mescroll-uni/mescroll-body.vue'
import MescrollUni from '@/components/mescroll-uni/mescroll-uni.vue'
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
uni.hideTabBar()
app.$mount()
