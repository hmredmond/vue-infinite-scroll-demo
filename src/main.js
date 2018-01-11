// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

const infiniteScroll = require('vue-infinite-scroll')

Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(infiniteScroll)
Vue.use(VueMaterial)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: {App}
})
