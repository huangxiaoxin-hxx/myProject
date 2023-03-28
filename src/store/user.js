import { getUserInfo } from '@/serve/api'

const user = {
  namespaced: true,
  state: { 
    userInfo: null,
    token: null
  },
  mutations: { 
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
      console.log(state.userInfo)
    },
    setToken(state, token) {
      state.token = token
    }
  },
  actions: { 
    async fetchUserInfo({commit}) {
      const data = await getUserInfo()
      commit('setUserInfo', data)
    }
  },
  getters: {  }
}

export default user