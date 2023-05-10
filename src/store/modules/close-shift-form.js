const state = {
  all: []
}

const getters = {}

const actions = {
  getCloseShiftForm ({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/getCloseShiftForm", params)
        .then(response => {
          commit('setData', response.data)
          resolve()
        })
        .catch ( error => (reject(error)));
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
