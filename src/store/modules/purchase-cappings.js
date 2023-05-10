// initial state
const state = {
  all: []
}

// getters
const getters = {}

// actions
const actions = {
  getPurchaseCappings ({ commit }, params) {
    axios
      .get("/getPurchaseCappings/" + params.storeId)
      .then(response => (commit('setData', response.data)));
  },
  addPurchaseCapping ({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/addPurchaseCapping", params)
        .then(response => {resolve()})
        .catch ( error => (reject(error)));
    })
  },
  editPurchaseCapping ({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/editPurchaseCapping", params)
        .then(response => {resolve()})
        .catch ( error => (reject(error)));
    })
  },
  changeStatus ({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/changePurchaseCappingStatus", params)
        .then(response => {
          commit('setRowData', response.data)
          resolve(response.data)
        })
        .catch ( error => reject());
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
  },
  setRowData(state, data) {
    var index = _.findIndex(state.all, {purchase_capping_id: data.purchase_capping_id});
    state.all[index].isactive = data.isactive
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
