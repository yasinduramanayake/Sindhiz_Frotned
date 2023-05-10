// initial state
const state = {
  all: []
}

// getters
const getters = {}

// actions
const actions = {
  getTaxes ({ commit }) {
    axios
      .get("/getTaxes")
      .then(response => (commit('setData', response.data)));
  },
  
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
