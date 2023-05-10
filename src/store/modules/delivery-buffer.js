const state = {
  all: [],
  bySKU: []
}

const getters = {}

const actions = {
  getDeliveryBuffers({ commit }) {
    axios
      .get("/getDeliveryBuffers")
      .then(response => (commit('setData', response.data)));
  },
  getBySKU({ commit }, params) {
    axios
      .get("/getDeliveryBuffersBySKU/" + params.skuid)
      .then(response => (commit('setBySKU', response.data)));
  },
  clear({ commit }) {
    commit('setData', [])
  }
}

const mutations = {
  setData(state, data) {
    state.all = data
  },
  setBySKU(state, data) {
    state.bySKU = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
