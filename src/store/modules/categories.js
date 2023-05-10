// initial state
const state = {
  all: [],
  active: [],
  user: [],
  subcategories: [],
  globalProductCat: [],
}

// getters
const getters = {}

// actions
const actions = {
  getGlobalProductAddCategories ({ commit }) {
    axios
      .get("/getGlobalProductAddCategories")
      .then(response => (commit('setGlobalProductCat', response.data)));
  },
  getActiveCategories ({ commit }) {
    axios
      .get("/getCategories")
      .then(response => (commit('setActive', response.data)));
  },
  getAllCategories ({ commit }) {
    axios
      .get("/getAllCategories")
      .then(response => (commit('setAll', response.data)));
  },
  getAllSubCategories ({ commit }) {
    axios
      .get("/getAllSubCategories")
      .then(response => (commit('setSubCategories', response.data)));
  },
  getUserCategories ({ commit }) {
    axios
      .get("/getUserCategories")
      .then(response => (commit('setUser', response.data)));
  },
  addCategory ({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/addCategory", params)
        .then(response => {resolve(response)})
        .catch ( error => (reject(error)));
    })
  },
  editCategory ({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/editCategory", params)
        .then(response => {resolve(response)})
        .catch ( error => (reject(error)));
    })
  },
  addSubCategory ({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/addSubtCategory", params)
        .then(response => {resolve(response)})
        .catch ( error => (reject(error)));
    })
  },
  editSubCategory ({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/ediSubtCategory", params)
        .then(response => {resolve(response)})
        .catch ( error => (reject(error)));
    })
  },

  clear ({ commit }) {
    commit('setAll', [])
    commit('setActive', []),
    commit('setUser', [])
  }
}

// mutations
const mutations = {
  setAll (state, data) {
    state.all = data
  },
  setActive(state, data) {
    state.active = data
  },
  setUser(state, data) {
    state.user = data
  },
  setSubCategories(state, data) {
    state.subcategories = data
  },
  setGlobalProductCat(state, data) {
    state.globalProductCat = data
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
