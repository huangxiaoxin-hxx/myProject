import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'

Vue.use(Vuex)

const store = {
  modules: {
    user
  }
}

const $store = new Vuex.Store(store)

export { $store }