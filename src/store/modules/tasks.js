const state = {
  all: [],
  myTasks: [],
  assignedTasks: [],
  notResolvedTasks: []
}

const getters = {}

const actions = {
  getTasks ({ commit }) {
    axios
      .get("/tasks")
      .then(response => (commit('setAll', response.data)));
  },
  getMyTasks ({ commit }) {
    axios
      .get("/getMyTasks")
      .then(response => (commit('setMyTasks', response.data)));
  },
  getAssignedTasks ({ commit }) {
    axios
      .get("/getMyTasks?status=assigned")
      .then(response => (commit('setAssignedTasks', response.data)));
  },
  getNotResolvedTasks ({ commit }) {
    axios
      .get("/getMyNotResolvedTasks")
      .then(response => (commit('setNotResolvedTasks', response.data)));
  },
  addTask ({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/tasks", params)
        .then(response => {resolve(response)})
        .catch ( error => (reject(error)));
    })
  },
  editTask ({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .put("/tasks/"+params.taskId, params)
        .then(response => {resolve(response)})
        .catch ( error => (reject(error)));
    })
  },
  updateMyTask ({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/updateMyTask/"+params.taskId, params)
        .then(response => {resolve(response)})
        .catch ( error => (reject(error)));
    })
  },
  deleteTask ({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .delete("/tasks/"+params.taskId, params)
        .then(response => {resolve(response)})
        .catch ( error => (reject(error)));
    })
  },
}

const mutations = {
  setAll (state, data) {
    state.all = data
  },
  setMyTasks (state, data) {
    state.myTasks = data
  },
  setAssignedTasks (state, data) {
    state.assignedTasks = data
  },
  setNotResolvedTasks (state, data) {
    state.notResolvedTasks = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
