const state = {
  all: [],
  global: [],
  productRanking: [],
  manageproductsubcat: []
}

const getters = {
  getBySubcat: (state) => (subcat) => {
    return state.all.find(subCategory => subCategory.subcat === subcat)
  }
}

const actions = {
  getSubCategories ({ commit }) {
    axios
      .get("/getSubCategories")
      .then(response => (commit('setData', response.data)));
  },
  getAllSubCategories ({ commit }) {
    axios
      .get("/getAllSubCategories")
      .then(response => (commit('setGlobal', response.data)));
  },
  getProductRankingSubCategories ({ commit }) {
    axios
      .get("/getProductRankingSubcats")
      .then(response => (commit('setProductRanking', response.data)));
  },
  getManageProductSubcats ({ commit }) {
    axios
      .get("/getManageProductSubcats")
      .then(response => (commit('setManageproductsubcat', response.data)));
  },
  clear ({ commit }) {
    commit('setData', [])
  }
}

const mutations = {
  setData (state, data) {
    state.all = data
  },
  setGlobal (state, data) {
    state.global = data
  },
  setProductRanking (state, data) {
    state.productRanking = data
  },
  setManageproductsubcat(state, data){
    state.manageproductsubcat = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
