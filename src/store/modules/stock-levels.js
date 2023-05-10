// initial state
const state = {
  all: []
}

// getters
const getters = {}

// actions
const actions = {
  getStockLevels ({ commit }, params) {
      return new Promise((resolve, reject) => {
      axios
        .post("/stocklevels", params)
        .then(response => {
          commit('setData', response.data)
          resolve()
        })
        .catch ( error => (reject(error)));
    })
  },
  resetStockLevel ({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/stocklevels/reset", params)
        .then(response => {resolve()})
        .catch ( error => (reject()));
    })
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
