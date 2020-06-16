import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex);

import auth from "./auth"
import steps from "./steps"

export default new Vuex.Store({
  modules: {
    auth,
    steps
  },
  state: {
    isLoading: false,
  },
  mutations: {
    startLoading(state) {
      state.isLoading = true
    },
    finishLoading(state) {
      state.isLoading = false
    }
  },
  actions: {
  },
  getters: {
    isLoading: state => state.isLoading
  }
});
