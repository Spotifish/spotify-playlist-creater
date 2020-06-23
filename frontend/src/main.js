import Vue from 'vue'
import VueRouter from "vue-router";
import App from './App.vue'


Vue.config.productionTip = false
Vue.use(VueRouter)

import Ripple from "vue-ripple-directive";
Vue.directive('ripple', Ripple);


import VShowSlide from "v-show-slide";
Vue.use(VShowSlide);


import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

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

  // check if from step was valid, else redirect back
  let index = STEP_NAMES.findIndex(val => val === to.name);
  // if to is a step and not the first step, check validity
  if (index > 0) {
    console.log(`Checking step ${STEP_NAMES[index]}...`)
    // check if previous step was valid
    const previousStepName = STEP_NAMES[index - 1];

    const prevStepValid = store.getters.isStepValid(previousStepName);
    console.log(`Step ${previousStepName} is ${prevStepValid} valid!`);

    if (!prevStepValid) {
      console.log(`Redirecting to step ${previousStepName}...`)
      return next({name: previousStepName});
    }
  }

  // redirect to login page if not already in the process of logging in
  if (!store.getters.isAuthenticated && !(to.name === 'authCallback' || to.name === 'login')) {
    return next('/login')
  }

  next()
});

// Vue
new Vue({
  store,
  render: h => h(App),
  router
}).$mount('#app')
