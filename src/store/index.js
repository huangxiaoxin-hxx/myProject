import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'

Vue.use(Vuex)

const store = {
  mutations: {
    clean(state) {
      // 递归模块清除state
      const clean = (_store, _state) => {
        const modules = Object.keys(_store.modules || {});
        const states = Object.keys(_state || {});
        states.map(stateName => {
          if (!modules.includes(stateName)) {
            _state[stateName] = null;
          }
        });

        modules.map(moduleName => {
          clean(_store.modules[moduleName], _state[moduleName]);
        });
      };
      clean(store, state);
    },
  },
  modules: {
    user
  }
}

const $store = new Vuex.Store(store)

export { $store }