// initial state
const state = {
  all: []
}

// getters
const getters = {}

// actions
const actions = {
  getCompetitors ({ commit }) {
    axios
      .get("/competitors")
      .then(response => (commit('setAll', response.data)));
  },
  addCompetitor ({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/competitors", params)
        .then(response => {resolve(response)})
        .catch ( error => (reject(error)));
    })
  },
  editCompetitor ({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .put("/competitors/"+params.competitorId, params)
        .then(response => {resolve(response)})
        .catch ( error => (reject(error)));
    })
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
