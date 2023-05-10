const state = {
  closeShifts: [],
}

const getters = {}

const actions = {
  getCloseShifts ({ commit }, params) {
    axios
      .post("/getCloseShifts/"+ params.closingStoreId, params)
      .then(response => (commit('setCloseShifts', response.data)));
  },
  clear ({ commit }) {
    commit('setCloseShifts', [])
  }
}

const mutations = {
  setCloseShifts (state, data) {
    state.closeShifts = data
  } 
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
