const state = {
  all: [],
  active: []
};

const getters = {};

const actions = {
  getAllCompanies({ commit }) {
    axios
      .get("/getAllCompanies")
      .then(response => commit("setData", response.data));
  },
  getCompanies({ commit }) {
    axios
      .get("/getCompanies")
      .then(response => commit("setActive", response.data));
  },
  addCompany({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/addCompany", params)
        .then(response => {
          resolve(response);
        })
        .catch(error => reject(error));
    });
  },
  editCompany({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/editCompany", params)
        .then(response => {
          resolve(response);
        })
        .catch(error => reject(error));
    });
  },
  clear({ commit }) {
    commit("setData", []);
    commit("setActive", []);
  }
};

const mutations = {
  setData(state, data) {
    state.all = data;
  },
  setActive(state, data) {
    state.active = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
