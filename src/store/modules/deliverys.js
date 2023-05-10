const state = {
  deliverys: [],
}

const getters = {}

const actions = {
  getDeliverys ({ commit }, params) {
    axios
      .post("/getDeliverys", params)
      .then(response => (commit('setDeliverys', response.data)));
  },
  clear ({ commit }) {
    commit('setDeliverys', [])
  }
}

const mutations = {
  setDeliverys (state, data) {
    state.deliverys = data
  } 
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}