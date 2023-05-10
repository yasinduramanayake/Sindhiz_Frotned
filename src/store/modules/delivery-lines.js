// initial state
const state = {
  all: []
}

// getters
const getters = {}

// actions
const actions = {
  getDeliveryLines ({ commit }, deliveryid) {
    axios
      .get("/getDeliveryline/"+deliveryid)
      .then(response => (commit('setData', response.data)));
  },
  getInvoiceDeliveryLines ({ commit }, params) {
    axios
      .post("/getInvoiceDeliveryLines", params)
      .then(response => (commit('setData', response.data)));
  },
  clear ({ commit }) {
    commit('setData', [])
  }
}

// mutations
const mutations = {
  setData (state, data) {
    state.all = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
