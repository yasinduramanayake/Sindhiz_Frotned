// initial state
const state = {
  all: [],
  active: [],
  unassigned: [],
  rule:[]
}

// getters
const getters = {}

// actions
const actions = {
  getRulesDistributors ({ commit }) {
    axios
      .get("/getRulesDistributors")
      .then(response => (commit('setRule', response.data)));
  },
  getDistributors ({ commit }) {
    axios
      .get("/getDistributors")
      .then(response => (commit('setActive', response.data)));
  },
  getAllDistributors ({ commit }) {
    axios
      .get("/getAllDistributors")
      .then(response => (commit('setAll', response.data)));
  },
  getUnAssignedDistributors ({ commit }) {
    axios
      .get("/getUnAssignedDistributors")
      .then(response => (commit('setUnassigned', response.data)));
  },
  addDistributor ({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/addDistributor", params)
        .then(response => {resolve(response)})
        .catch ( error => (reject(error)));
    })
  },
  editDistributor ({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/updateDistributor", params)
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
  setRule (state, data) {
    state.rule = data
  },
  setActive (state, data) {
    state.active = data
  },
  setUnassigned (state, data) {
    state.unassigned = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
