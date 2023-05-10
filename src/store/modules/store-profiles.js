const state = {
  all: []
}

const getters = {}

const actions = {
  getStoreProfiles ({ commit }) {
    axios
      .get("/storeProfiles")
      .then(response => (commit('setData', response.data)));
  },
  updateStoreProfile ({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .put("/updateStoreProfiles", params)
        .then(response => {resolve()})
        .catch ( error => (reject()));
    })
  },
  clear ({ commit }) {
    commit('setData', [])
  }
}

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
