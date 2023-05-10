const state = {
  rosterList: [],
  rosterData:[],
  staffs:[],
  storeDayHours:[],
}

const getters = {}

const actions = {
  getStoreDayHours ({ commit }, params){
    return new Promise((resolve, reject) => {
      axios
        .post("/getStoreDayHours", params)
        .then(response => {
          commit('setStoreDayHours', response.data)
          resolve()
        })
        .catch ( error => (reject(error)));
    })
  },
  getRosterList ({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .get("/getRosterList", params)
        .then(response => {
          commit('setRosterList', response.data)
          resolve()
        })
        .catch ( error => (reject(error)));
    })
  },
  getRosterData({ commit }, rosterid) {
     return new Promise((resolve, reject) => {
      axios
        .get("/getRosterData?rosterId="+rosterid)
        .then(response => {
          commit('setRosterData', response.data)
          resolve(response.data)
        })
        .catch ( error => (reject(error)));
    })
  },
  getStaffs({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("/getStaff")
        .then(response => {
          commit('setStaffs', response.data)
          resolve(response.data)
        })
        .catch ( error => (reject(error)));
    })
  },
  clear ({ commit }) {
    commit('setRosterList', [])
     commit('setRosterData', [])
    commit('setStaffs', [])
  }
}

const mutations = {
  setRosterList (state, data) {
    state.rosterList = data
  },
  setRosterData (state, data) {
    state.rosterData = data
  },
  setStaffs (state, data) {
    state.staffs = data
  },
  setStoreDayHours(state, data){
      state.storeDayHours = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
