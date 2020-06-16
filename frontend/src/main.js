import Vue from 'vue'
import VueRouter from "vue-router";
import App from './App.vue'


Vue.config.productionTip = false
Vue.use(VueRouter)


// Store
import store from "./store"


// Routes
import Login from "./pages/Login";
import LoginCallback from "./pages/LoginCallback";
import Playlists from "./pages/steps/Playlists";
import WorkflowContainer from "./pages/StepContainer";
import Analysis from "./pages/steps/Analysis";

import {STEP_NAMES} from "./store/steps";

const routes = [
  {
    path: '/', component: WorkflowContainer, children: [
      {path: '', component: Playlists, name: STEP_NAMES[0]},
      {path: 'analysis', component: Analysis, name: STEP_NAMES[1]}
    ]
  },
  {path: '/login', component: Login, name: 'login'},
  {path: '/authCallback', component: LoginCallback, name: 'authCallback'}
];

const router = new VueRouter({
  mode: 'history',
  routes
});

// sync router to vuex store
import {sync} from "vuex-router-sync";
sync(store, router);

router.beforeEach((to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
  } else if (to.name === 'authCallback' || to.name === 'login') {
    next()
  } else {
    next('/login')
  }
});

// Vue
new Vue({
  store,
  render: h => h(App),
  router
}).$mount('#app')
