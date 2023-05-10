const state = {
  all: [],
  pendingTrainings: [],
  trainingReports: []
};

const getters = {};

const actions = {
  getTrainings({ commit }, params) {
    axios
      .get("/getTrainings", {params})
      .then(response => commit("setData", response.data));
  },
  addTraining({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/saveTraining", params)
        .then(response => {
          resolve();
        })
        .catch(error => reject());
    });
  },
  updateTraining({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/updateTraining/" + params.id, params)
        .then(response => {
          resolve();
        })
        .catch(error => reject());
    });
  },
  deleteTraining({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .delete("/trainings/" + params.id, params)
        .then(response => {
          resolve(response);
        })
        .catch(error => reject(error));
    });
  },
  getTrainingReport({ commit }, transid) {
    axios
      .get("/getTrainingReport/" + transid)
      .then(response => commit("setTrainingReports", response.data));
  },
  update({ commit }, params) {
    commit("setRowData", params);
  },
  clear({ commit }) {
    commit("setData", []);
    commit("setPendingTrainings", []);
  },
  getPendingTrainings({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("/getPendingTrainings")
        .then(response => {
          commit("setPendingTrainings", response.data);
          resolve(response.data);
        })
        .catch(error => reject());
    });
  }
};

const mutations = {
  setData(state, data) {
    state.all = data;
  },
  setRowData(state, data) {
    var index = _.findIndex(state.all, { promoid: data.promoid });
    state.all.splice(index, 1, data);
  },
  setPendingTrainings(state, data) {
    state.pendingTrainings = data;
  },
  setTrainingReports(state, data) {
    state.trainingReports = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
