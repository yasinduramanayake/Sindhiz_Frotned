// initial state
const state = {
  all: []
}

// getters
const getters = {}

// actions
const actions = {
  getOrderDeliveryDays ({ commit },params) {
    axios
      .get("/getOrderDeliveryDays/"+params.storeId)
      .then(response => (commit('setData', response.data)));
  },
  addDay ({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/addOrderDeliveryDay", params)
        .then(response => {resolve(response)})
        .catch ( error => (reject(error)));
    })
  },
  editDay ({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/editOrderDeliveryDay", params)
        .then(response => {resolve(response)})
        .catch ( error => (reject(error)));
    })
  },
  clear ({ commit }) {
    commit('setData', [])
  }
}

// mutations
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
