// initial state
const state = {
  all: [],
  bulkPromotionList: []
}

// getters
const getters = {}

// actions
const actions = {
  getBulkPromotionList({ commit }) {
    axios
      .get("/bulk-promotions/getBulkPromotion")
      .then(response => (commit('setAll', response.data)));
  },
  changeStatus({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/bulk-promotions/disabledBulkPromotion", params)
        .then(response => {
          commit('setRowData', params.bulkPromoId)
          resolve()
        })
        .catch(error => reject());
    })
  },
  getBulkPromotionEditList({ commit }, params) {
    axios
      .get("/bulk-promotions/getBulkPromotionEditList/" + params)
      .then(response => (commit('setBulkPromotionList', response.data)));
  },
  toggleDisableBulkEdit({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/disablePromotion", params)
        .then(response => {
          commit('setToggleDisable', params.promoid)
          resolve()
        }).catch(error => (reject()));
    })
  },

}

// mutations
const mutations = {
  setAll(state, data) {
    state.all = data
  },
  setRowData(state, bulkpromoid) {
    var index = _.findIndex(state.all, { bulkpromoid: bulkpromoid });
    state.all[index].disabled = !state.all[index].disabled
  },
  setBulkPromotionList(state, data) {
    state.bulkPromotionList = data
  },
  setToggleDisable(state, promoid) {
    var index = _.findIndex(state.bulkPromotionList, { promoid: promoid });
    state.bulkPromotionList[index].disabled = !state.bulkPromotionList[index].disabled
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
