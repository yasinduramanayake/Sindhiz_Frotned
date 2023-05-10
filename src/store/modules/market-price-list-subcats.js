const state = {
  all: []
}

const getters = {}

const actions = {
  getPriceListSubcats({ commit }, params) {
    axios
      .get("/market-price-lists/" + params.listid + '/subcats')
      .then(response => (commit('setData', response.data)));
  },
  addPrice({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/market-price-lists/" + params.listid + '/subcats', params)
        .then(response => {
          commit('setPriceListSubcat', params)
          resolve()
        }).catch(error => (reject(error)));
    })
  },
  clear({ commit }) {
    commit('setData', [])
  }
}

const mutations = {
  setData(state, data) {
    state.all = data
  },
  setPriceListSubcat(state, data) {
    var index = _.findIndex(state.all, (item) => {
      return item.listid == data.listid && item.subcat == data.subcat
    });
    if (index >= 0) {
      state.all[index].packet_price = data.packetPrice
      state.all[index].carton_price = data.cartonPrice
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
