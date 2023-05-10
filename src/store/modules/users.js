// initial state
const state = {
  all: [],
  user: {
    name: "",
    email: "",
    address: "",
    company: "",
    country: ""
  }
}
import Vue from 'vue'

// getters
const getters = {}

// actions
const actions = {
  getUsers ({ commit }) {
    axios
      .get("/users")
      .then(response => (commit('setUsers', response.data.data)));
  },
  getUser({ commit }, params) {
    axios
      .get("/users/"+params.id)
      .then(response => (commit('setUser', response.data.data)));
  },
  saveUser({ commit }, params) {
    axios
      .put("/users/"+params.id, params)
      .then(response => (commit('saveUserSuccess', response.data.data)));
  }
}

// mutations
const mutations = {
  setUsers (state, users) {
    state.all = users
  },
  setUser (state, user) {
    state.user = user
  },
  saveUserSuccess() {
    Vue.router.push({name: 'Customers'})
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
