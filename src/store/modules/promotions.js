// initial state
const state = {
  all: [],
  promoTypes: []
}

// getters
const getters = {}

// actions
const actions = {
  getPromotions ({ commit }) {
    axios
      .get("/listPromotions")
      .then(response => (commit('setData', response.data)));
  },
  getPromotionTypes ({ commit }) {
    axios
      .get("/getPromotionTypes")
      .then(response => (commit('setPromoTypes', response.data)));
  },
  getSalesRepPromotions ({ commit }) {
    axios
      .get("/listSalesRepPromotions")
      .then(response => (commit('setData', response.data)));
  },
  update ({ commit }, params) {
    commit('setRowData', params)
  },
  toggleDisable ({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/disablePromotion", params)
        .then(response => {
          commit('setToggleDisable', params.promoid)
          resolve()
        }).catch ( error => (reject()));
    })
  },
  clear ({ commit }) {
    commit('setData', [])
  }
}

// mutations
const mutations = {
  setData (state, data) {
    state.all = data
  },
  setPromoTypes(state, data){
    state.promoTypes = data
  },
  setRowData(state, data) {
    var index = _.findIndex(state.all, {promoid: data.promoid});
    state.all.splice(index, 1, data);
  },
  setToggleDisable(state, promoid) {
    var index = _.findIndex(state.all, {promoid: promoid});
    state.all[index].disabled = !state.all[index].disabled
  },
  setPayable(state, payload) {
    var index = _.findIndex(state.all, {promoid: payload.promoid});
    state.all[index].payable = payload.payable
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
