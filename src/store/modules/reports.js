const state = {
  closecash: [],
  banking: [],
  transactions: [],
  productByBarcode: [],
  productBySubcat: [],
  productByCategory: [],
  purchaseSaleBySubcat: [],
  invoiceAmounts: [],
  storeWage: []
}

const getters = {}

const actions = {
  getCloseCash ({ commit }, params) {
    axios
      .post("/getCloseCashReport", params)
      .then(response => (commit('setCloseCash', response.data)));
  },
  getBanking ({ commit }, params) {
    axios
      .post("/reports/bankingreport", params)
      .then(response => (commit('setBanking', response.data)));
  },
  getTransactions ({ commit }, params) {
    axios
      .post("/reports/transaction", params)
      .then(response => (commit('setTransactions', response.data)));
  },
  getProductByBarcode ({ commit }, params) {
    axios
      .post("/getSalesByProductReport", params)
      .then(response => (commit('setProductByBarcode', response.data)));
  },
  getProductBySubcat ({ commit }, params) {
    axios
      .post("/reports/productBySubcat", params)
      .then(response => (commit('setProductBySubcat', response.data)));
  },
  getProductByCategory ({ commit }, params) {
    axios
      .post("/reports/productByCategory", params)
      .then(response => (commit('setProductByCategory', response.data)));
  },
  getPurchaseSaleBySubcat ({ commit }, params) {
    axios
      .post("/reports/purchaseSaleBySubcat", params)
      .then(response => (commit('setPurchaseSaleBySubcat', response.data)));
  },
  getInvoiceAmounts ({ commit }, params) {
    axios
      .post("/getInvoiceAmounts", params)
      .then(response => (commit('setInvoiceAmounts', response.data)));
  },
  getStoreWage ({ commit }, params) {
    axios
      .post("/getStoreWage", params)
      .then(response => (commit('setStoreWage', response.data)));
  },
  clear ({ commit }) {
    commit('setCloseCash', [])
    commit('setBanking', [])
    commit('setTransactions', [])
    commit('setProductByBarcode', [])
    commit('setProductBySubcat', [])
    commit('setProductByCategory', [])
    commit('setPurchaseSaleBySubcat', [])
    commit('setInvoiceAmounts', [])
    commit('setStoreWage', [])
  }
}

const mutations = {
  setCloseCash (state, data) {
    state.closecash = data
  },
  setBanking (state, data) {
    state.banking = data
  },
  setTransactions (state, data) {
    state.transactions = data
  },
  setProductByBarcode (state, data) {
    state.productByBarcode = data
  },
  setProductBySubcat (state, data) {
    state.productBySubcat = data
  },
  setProductByCategory (state, data) {
    state.productByCategory = data
  },
  setPurchaseSaleBySubcat (state, data) {
    state.purchaseSaleBySubcat = data
  },
  setInvoiceAmounts (state, data) {
    state.invoiceAmounts = data
  },
  setStoreWage (state, data) {
    state.storeWage = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
