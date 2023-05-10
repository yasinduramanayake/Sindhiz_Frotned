// initial state
const state = {
  all: []
}

// getters
const getters = {}

// actions
const actions = {
  getAccountTypes ({ commit }) {
    axios
      .get("/account-types")
      .then(response => (commit('setAll', response.data)));
  },
}

// mutations
const mutations = {
  setAll (state, data) {
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
