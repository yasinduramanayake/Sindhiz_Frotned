const state = {
  all: [],
  active: []
}

const getters = {}

const actions = {
  getRoles ({ commit }) {
    axios
      .get("/getRoles")
      .then(response => (commit('setData', response.data)));
  },
  getActiveRoles ({ commit }) {
    axios
      .get("/getActiveRoles")
      .then(response => (commit('setActive', response.data)));
  },
  addRole ({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/createRole", params)
        .then(response => {resolve()})
        .catch ( error => (reject()));
    })
  },
  updateRole ({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .put("/updateRole/"+params.id, params)
        .then(response => {resolve()})
        .catch ( error => (reject()));
    })
  },
  clear ({ commit }) {
    commit('setData', [])
  }
}

const mutations = {
  setData (state, data) {
    state.all = data
  },
  setActive (state, data) {
    state.active = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
