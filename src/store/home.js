
const home = {
  namespaced: true,
  state: { 
    roomList: [],
    shopInfo: {}
  },
  mutations: { 
    setRoomList(state, roomList) {
      state.roomList = roomList
    },
    setShopInfo(state, shopInfo) {
      state.shopInfo = shopInfo
    }
  },
  actions: {},
  getters: {}
}

export default home