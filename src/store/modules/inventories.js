const state = {
  all: [],
  detail: []
};

const getters = {};

const actions = {
  getInventories({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/getInventories", params)
        .then(response => {
          commit('setData', response.data)
          resolve()
        })
        .catch(error => (reject(error)));
    })
  },
  getInventoryDetail({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/getInventoryDetail", params)
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
  }
};

const mutations = {
  setData(state, data) {
    state.all = data;
  },
  setDetail(state, data) {
    state.detail = data
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
