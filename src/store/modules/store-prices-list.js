// initial state
const state = {
  all:[],
}

// getters
const getters = {}

// actions
const actions = {
   getStorePrices({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .get("/listStorePrices/"+params.storeId)
        .then(response => {
          commit('setData', response.data)
          resolve(response.data)
        })
        .catch ( error => (reject()))
    })
  },
  
  clear ({ commit }) {
    commit('setData', [])
  }
}

// mutations
const mutations = {
  
  setData(state, data) {
    state.all = data
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
