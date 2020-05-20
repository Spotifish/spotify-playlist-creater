import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import "./static/sanitize.css"

import dao from "./dao";

new Vue({
  render: h => h(App),
  provide: function () {
    return {
      "dao" : dao
    }
  }
}).$mount('#app')
