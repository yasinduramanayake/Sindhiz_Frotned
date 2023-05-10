// initial state
const state = {
  prices:[],
  storePrices:[]
}

// getters
const getters = {}

// actions
const actions = {
   getPrices({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .get("/getStorePrices/"+params.productid)
        .then(response => {
          commit('setPrices', response.data)
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
  
  setPrices(state, data) {
    state.prices = data
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
