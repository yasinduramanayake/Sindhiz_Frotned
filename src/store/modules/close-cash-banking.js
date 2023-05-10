// initial state
const state = {
  all: []
}

// getters
const getters = {}

// actions
const actions = {
  getByStore ({ commit }, params) {
    axios
      .get("/getCloseCashBankng/" + params.storeId)
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
