const state = {
  all: []
}

const getters = {}

const actions = {
  getDeliveryTypes ({ commit }) {
    axios
      .get("/deliverytypes")
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
