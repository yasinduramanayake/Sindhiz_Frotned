const state = {
    all: [],
    myKnowledgeBases: [],
  }
  
  const getters = {}
  
  const actions = {
    getKnowledgeBases ({ commit }) {
      axios
        .get("/knowledgeBases")
        .then(response => (commit('setAll', response.data)));
    },
    getMyKnowledgeBases ({ commit }) {
      axios
        .get("/getMyKnowledgeBases")
        .then(response => (commit('setMyKnowledgeBases', response.data)));
    },
    addKnowledgeBase ({ commit }, params) {
      return new Promise((resolve, reject) => {
        axios
          .post("/knowledgeBases", params)
          .then(response => {resolve(response)})
          .catch ( error => (reject(error)));
      })
    },
    editKnowledgeBase ({ commit }, params) {
      return new Promise((resolve, reject) => {
        axios
          .put("/knowledgeBases/"+params.taskId, params)
          .then(response => {resolve(response)})
          .catch ( error => (reject(error)));
      })
    },
    updateMyKnowledgeBase ({ commit }, params) {
      return new Promise((resolve, reject) => {
        axios
          .post("/updateMyKnowledgeBase/"+params.taskId, params)
          .then(response => {resolve(response)})
          .catch ( error => (reject(error)));
      })
    },
    deleteKnowledgeBase ({ commit }, params) {
      return new Promise((resolve, reject) => {
        axios
          .delete("/knowledgeBases/"+params.id, params)
          .then(response => {resolve(response)})
          .catch ( error => (reject(error)));
      })
    },
  }
  
  const mutations = {
    setAll (state, data) {
      state.all = data
    },
    setMyKnowledgeBases (state, data) {
      state.myKnowledgeBases = data
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }
  