
const home = {
  namespaced: true,
  state: { 
    roomList: [],
  },
  mutations: { 
    setRoomList(state, roomList) {
      state.roomList = roomList
    },
  },
  actions: {},
  getters: {}
}

export default home