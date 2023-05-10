const state = {
  all: [],
  detail: [],
  inhouseall: [],
  inhousedetail: [],
}

const getters = {}

const actions = {
  getInhouseStockTakes({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/getInhouseStockTake", params)
        .then(response => {
          commit('setIhouseData', response.data)
          resolve()
        })
        .catch(error => (reject(error)));
    })
  },
  getInhouseStockTakeDetail({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/getInhouseStockTakeDetail", params)
        .then(response => {
          commit('setInhouseDetail', response.data)
          resolve()
        })
        .catch(error => (reject(error)));
    })
  },
  getStockTakes({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/getStockTakes", params)
        .then(response => {
          commit('setData', response.data)
          resolve()
        })
        .catch(error => (reject(error)));
    })
  },
  getStockTakeDetail({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/getStockTakeDetail", params)
        .then(response => {
          commit('setDetail', response.data)
          resolve()
        })
        .catch(error => (reject(error)));
    })
  },
  clear({ commit }) {
    commit('setData', [])
  },
  clearDetail({ commit }) {
    commit('setDetail', [])
  },
  clearInhouse({ commit }) {
    commit('setIhouseData', [])
  },
  clearInhouseDetail({ commit }) {
    commit('setInhouseDetail', [])
  }
}

const mutations = {
  setData(state, data) {
    state.all = data
  },
  setIhouseData(state, data) {
    state.inhouseall = data
  },
  setDetail(state, data) {
    state.detail = data
  },
  setInhouseDetail(state, data) {
    state.inhousedetail = data
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
