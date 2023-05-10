const state = {
  all: []
}

const getters = {}

const actions = {
  getTranslines ({ commit }, transid) {
    axios
      .get("/getTransline/"+transid)
      .then(response => (commit('setData', response.data)));
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
