import Vue from 'vue'
import VueRouter from "vue-router";
import App from './App.vue'

Vue.config.productionTip = false

// Routes
import Login from "./pages/Login";

const routes = [
  { path: '/', redirect: '/login'},
  { path: '/login', component: Login}
];

const router = new VueRouter({
  routes
});

Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
