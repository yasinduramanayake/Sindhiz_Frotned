// initial state
const state = {
  all: []
}

// getters
const getters = {}

// actions
const actions = {
  getByPromotion ({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/viewPromoSale", params)
        .then(response => {
          resolve(response)
          commit('setData', response.data)
        })
        .catch ( error => (reject(error)));
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
