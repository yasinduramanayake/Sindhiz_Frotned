// initial state
const state = {
  all: []
}

// getters
const getters = {}

// actions
const actions = {
  getInvoices ({ commit }, params) {
    axios
      .get("/getInvoices/" + params.storeId)
      .then(response => (commit('setData', response.data)));
  },
  getStoresInvoices ({ commit }, params) {
    axios
      .post("/getStoresInvoices", params)
      .then(response => (commit('setData', response.data)));
  },
  addInvoice ({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/addInvoice", params)
        .then(response => {resolve(response)})
        .catch ( error => (reject(error)));
    })
  },
  changeStatus ({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/invoice/changeStatus", params)
        .then(response => {
          commit('setRowData', response.data)
          resolve(response.data)
        })
        .catch ( error => reject());
    })
  },
  removeInvoice ({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/invoice/remove", params)
        .then(response => {
          commit('removeInvoice', params)
          resolve()
        })
        .catch ( error => reject())
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
    var index = _.findIndex(state.all, {invoiceid: data.invoiceid});
    state.all[index].pending = data.pending
    state.all[index].isPending = data.isPending
  },
  removeInvoice(state, data) {
    var index = _.findIndex(state.all, {invoiceid: data.invoiceid});
    state.all.splice(index, 1);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
