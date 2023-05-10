const state = {
    all: []
  }
  
  const getters = {}
  
  const actions = {
    getPayrolls ({ commit }) {
      axios
        .get("/payroll/getPayrolls")
        .then(response => (commit('setData', response.data)));
    },
    deletePayroll ({ commit }, params) {
      return new Promise((resolve, reject) => {
        axios
          .post("/payroll/deletePayroll", params)
          .then(response => {resolve(response)})
          .catch ( error => (reject(error)));
      })
    },
    clear ({ commit }) {
      commit('setData', [])
    }
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
  