const state = {
    all: []
  }
  
  const getters = {}
  
  const actions = {
    getStoreAccounts ({ commit }, params) {
      axios
        .get("/storeAccounts/"+params.storeId)
        .then(response => (commit('setData', response.data)));
    },
    clear ({ commit }) {
      commit('setData', [])
    },
    updateStoreAccount ({ commit }, params) {
        return new Promise((resolve, reject) => {
          axios
            .post("/storeAccounts", params)
            .then(response => {resolve()})
            .catch ( error => (reject()));
        })
      },
  }
  
  const mutations = {
    setData (state, data) {
      state.all = data
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }
  