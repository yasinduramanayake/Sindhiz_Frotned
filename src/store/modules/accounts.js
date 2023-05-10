// initial state
const state = {
  all: [],
  payables: [],
  receivables: [],
  fields: [],
  operators: [],
  logicoperators: [],
  accountRules:[]

}

// getters
const getters = {}

// actions
const actions = {
  getFields ({ commit }) {
    axios
      .get("/accounts/fields")
      .then(response => (commit('setFields', response.data)));
  },
  getOperators ({ commit }) {
    axios
      .get("/accounts/operators")
      .then(response => (commit('setOperators', response.data)));
  },
  getLogicOperators ({ commit }) {
    axios
      .get("/accounts/logicoperators")
      .then(response => (commit('setLogicOperators', response.data)));
  },
  getAccountRules ({ commit }) {
    axios
      .get("/accounts/getAccountRules")
      .then(response => (commit('setAccountRules', response.data)));
  },
  getAccounts ({ commit }) {
    axios
      .get("/accounts")
      .then(response => (commit('setAll', response.data)));
  },
  deleteAccountRule ({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/accounts/deleteAccountRule", params)
        .then(response => {resolve(response)})
        .catch ( error => (reject(error)));
    })
  },
  getAccountRuleInstance ({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/accounts/getAccountRuleInstance", params)
        .then(response => {resolve(response)})
        .catch ( error => (reject(error)));
    })
  },
  addAccount ({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/accounts", params)
        .then(response => {resolve(response)})
        .catch ( error => (reject(error)));
    })
  },
  editAccount ({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .put("/accounts/"+params.accountId, params)
        .then(response => {resolve(response)})
        .catch ( error => (reject(error)));
    })
  },
}

// mutations
const mutations = {
  setFields(state,data){
    state.fields = data
  },
  setOperators(state,data){
    state.operators = data
  },
  setLogicOperators(state,data){
    state.logicoperators = data
  },
  setAccountRules(state,data){
    state.accountRules = data
  },
  setAll (state, data) {
    state.all = data
    state.payables = []
    state.receivables = []
    _.forEach(state.all, (account) => {
      if (account.account_type.is_payable == 1) {
        state.payables.push(account)
      } else {
        state.receivables.push(account)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
