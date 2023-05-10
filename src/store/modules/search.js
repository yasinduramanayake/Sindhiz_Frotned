// initial state
const state = {
  productBySearch: []
}

// getters
const getters = {}

// actions
const actions = {
  getProductBySearch ({ commit }, params) {
    axios
      .post("/search", params)
      .then(response => (commit('setProductBySearch', response.data)));
  },
  getInhouseProductBySearch({ commit }, params)
  {
    return new Promise((resolve, reject) => {
    axios
      .post("/search", params, {
          headers: {
            'Content-Type': 'application/json',
          }
        })
      .then(response => {resolve(response)})
      .catch ( error => (reject(error)));
  })
},
  clear ({ commit }) {
    commit('setProductBySearch', [])
  }
}

// mutations
const mutations = {
  setProductBySearch (state, data) {
    state.productBySearch = data
  },
  /*
  setRowData(state, data) {
    var index = _.findIndex(state.all, {productid: data.productid});
    state.all.splice(index, 1, data);
  },*/
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
