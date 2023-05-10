const state = {
  all: [],
  active: []
}

const getters = {}

const actions = {
  getPriceLists({ commit }) {
    axios
      .get("/market-price-lists")
      .then(response => (commit('setData', response.data)));
  },
  getActivePriceLists({ commit }) {
    axios
      .get("/market-price-lists/active")
      .then(response => (commit('setActiveData', response.data)));
  },
  addPriceList({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/market-price-lists", params)
        .then(response => {
          resolve()
        }).catch(error => (reject()));
    })
  },
  editPriceList({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .put("/market-price-lists/" + params.listid, params)
        .then(response => {
          resolve()
        }).catch(error => (reject()));
    })
  },
  toggleActive({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .put("/market-price-lists/" + params.listid + '/active', params)
        .then(response => {
          commit('setToggleActive', params.listid)
          resolve()
        }).catch(error => (reject()));
    })
  },
  clear({commit}) {
    commit('setData', [])
  }
}

const mutations = {
  setData(state, data) {
    state.all = data
  },
  setActiveData(state, data) {
    state.active = data
  },
  setToggleActive(state, listid) {
    var index = _.findIndex(state.all, {
      listid: listid
    });
    state.all[index].isactive = !state.all[index].isactive
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
