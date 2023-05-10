// initial state
const state = {
  all: [],
  active: [],
  global: [],
  stocktake: [],
  disableOrder: [],
  minStockSuppliers: []
}

// getters
const getters = {}

// actions
const actions = {
  getActiveSuppliers ({ commit }) {
    axios
      .get("/getSuppliers")
      .then(response => (commit('setActive', response.data)));
  },

  getMinStockQtySuppliers({ commit }) {
    axios
      .get("/getMinStockQtySuppliers")
      .then(response => (commit('setMinStockSuppliers', response.data)));
  },
  getGlobalSuppliers ({ commit }) {
    axios
      .get("/getGlobalSuppliers")
      .then(response => (commit('setGlobal', response.data)));
  },
  getAllSuppliers ({ commit }) {
    axios
      .get("/getAllSuppliers")
      .then(response => (commit('setAll', response.data)));
  },
  getStockTakeSuppliers ({ commit }) {
    axios
      .get("/getStockTakeSuppliers")
      .then(response => (commit('setStockTake', response.data)));
  },
  getDisableOrderSuppliers ({ commit }) {
    axios
      .get("/getDisableOrderSuppliers")
      .then(response => (commit('setDisableOrder', response.data)));
  },
  addSupplier ({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/addSupplier", params)
        .then(response => {resolve(response)})
        .catch ( error => (reject(error)));
    })
  },
  editSupplier ({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/editSupplier", params)
        .then(response => {resolve(response)})
        .catch ( error => (reject(error)));
    })
  },
}

// mutations
const mutations = {
  setAll (state, data) {
    state.all = data
  },
  setActive (state, data) {
    state.active = data
  },
  setGlobal (state, data) {
    state.global = data
  },
  setStockTake (state, data) {
    state.stocktake = data
  },
  setDisableOrder (state, data) {
    state.disableOrder = data
  },
  setMinStockSuppliers(state, data) {
    state.minStockSuppliers = data
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
